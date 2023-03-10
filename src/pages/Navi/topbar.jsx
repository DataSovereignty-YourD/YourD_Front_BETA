import { Icon } from "@iconify/react";
import axios from "axios";
import {   useEffect,  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useLocation, useNavigate } from "react-router-dom";
import ConnectWallet from "../../components/account/ConnectWallet";
import {  getProvider } from "../../functions/Account/ConnectAccount";
import { Account, AccountStore } from "../../redux/AccountReducer";
const ServerURL="http://localhost:8000/";
const DevURL="https://www.yourdserver.store/"


const TopBar = () => {
  document.body.style = `overflow-y: scroll;`;
  const storedaccount = useSelector(Account);
  const [account,setAccount] = useState(storedaccount);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  useEffect(() => {
    console.log(storedaccount);
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

  async function LoadAdsInfo() {
    console.log(storedaccount);
    if(account !== "" && account !== undefined) {
      const AdsInfo = await axios.post("http://localhost:8000/loadadsinfo", {Account: account});
      // const AdsInfo = await axios.post("https://www.yourdserver.store/loadAdsInfo", account);
      console.log(AdsInfo);
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
        <ConnectWallet StoredAccount={account} SetState={setAccount}/>
      </section>
    </div>
  );
};

export default TopBar;

