import { Icon } from "@iconify/react";
import axios from "axios";
import {   useEffect,  useState } from "react";
import { useSelector } from "react-redux";
import {  useLocation, useNavigate } from "react-router-dom";
import ConnectWallet from "../../components/account/ConnectWallet";
// import { GetBalance } from "../../functions/Account/TokenBalance";
import { Account } from "../../redux/AccountReducer";
const ServerURL="http://localhost:8000";
// "https://www.yourdserver.store/"
// import * as solanaWeb3 from "@solana/web3.js";

const TopBar = () => {
  document.body.style = `overflow-y: scroll;`;
  const storedaccount = useSelector(Account);
  const [account,setAccount] = useState(storedaccount);
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    console.log("TopBar Rerender");
  }, [account,storedaccount]);
  

  const MenuButton = () => {
    return (
      <div className="menu">
        <Icon
          className="menu_Icon"
          icon="material-symbols:menu"
          color="white"
          width="28"
        />
      </div>
    );
  };

  const ConeShopModal = () => {
    return (
      <div className="Button">
        <Icon icon="mdi:traffic-cone" width="26" />
      </div>
    );
  };

  const AddAds = () => {
    return (
      <div className="Button">
        <Icon icon="ri:advertisement-line" width="26" />
      </div>
    );
  };

  const Balance = () => {
    // GetBalance()
    return (
      <div className="BalanceSection">
        100 CAT
      </div>
    )
  }

  async function LoadAdsInfo() {
    console.log(storedaccount);
    if(account !== "" && account !== undefined) {
      const AdsInfo = await axios.post(`${ServerURL}/loadadsinfo`, {Account: account});
      if(AdsInfo.data === "None") navigate("/AdsUploadModal", {state: {background: location}});
      else alert("Only one advertisement can be registered.");
  } else  alert("Connect Wallet");
  }
  
  return (
    <div className="TopBar">
      <section className="leftSection">
        <MenuButton/>
        <div className="Logo">D-AD</div>
      </section>
      <section className="Button_sction">
        <div onClick={() => {
          if(account !== undefined && account !== "") {
            navigate("/ConeShopModal", {state: {background: location}});
          } else  alert("Connect Wallet");
        }}>
          <ConeShopModal />
        </div>
        <div onClick={() => LoadAdsInfo()}>
          <AddAds/>
        </div>
        <Balance/>
        <ConnectWallet StoredAccount={account} SetState={setAccount}/>
      </section>
    </div>
  );
};

export default TopBar;

