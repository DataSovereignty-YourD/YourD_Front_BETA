import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Account, AccountStore } from "../../redux/AccountReducer";
import CheckAccount from "./checkAccount";




const TopBar = () => {
  document.body.style = `overflow-y: scroll;`;
  let storedaccount = useSelector(Account);
  const [account,setAccount] = useState(storedaccount);
  const navigate = useNavigate();
  const location = useLocation();
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
  useEffect(()=> {

  },)

  function ConnectWallet() {
    const dispatch = useDispatch();
    
    const Connect = async () => {
      if(window.ethereum) {
        try {
          const acc = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          dispatch(AccountStore(acc));
          setAccount(acc);
        } catch (error){
          console.log("Error Connecting");
        }
      } else {
        alert("MetaMask not detected");
      }
    }
    return (
      <button onClick={()=>Connect()} className="ConnectWallet">
        <span className="material-icons" style={{marginRight: "10px"}}> account_balance_wallet </span>
        {account ? <div>{account.toString().slice(0,6)+"..."+account.toString().slice(-6)}</div> : <div>Connect Wallet</div>}
      </button>
    );
  }

  return (
    <div className="TopBar">
      <section className="leftSection">
        <MenuButton />
        <div className="Logo">D-AD</div>
      </section>
      <section className="Button_sction">
        <div onClick={() => {
          if(account !== "") {
            navigate("/ConeShopModal", {state: {background: location}});
          } else  alert("Connect Wallet");
        }}>
          <ConeShopModal />
        </div>
        <div onClick={() => {
          if(account !== "") {
            navigate("/AdsUploadModal", {state: {background: location}});
        } else  alert("Connect Wallet");
        }}>
          <AddAds />
        </div>
        {ConnectWallet()}
      </section>
    </div>
  );
};

export default TopBar;
