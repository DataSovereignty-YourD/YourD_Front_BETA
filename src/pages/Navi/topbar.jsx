import { Icon } from "@iconify/react";
import axios from "axios";
import {   useEffect,  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useLocation, useNavigate } from "react-router-dom";
import { Account, AccountStore } from "../../redux/AccountReducer";
import {  ReadDBAsset } from "../../redux/ConeAssetsReducer";

const TopBar = () => {
  document.body.style = `overflow-y: scroll;`;
  const storedaccount = useSelector(Account);
  const [account,setAccount] = useState("EJi18qM7Q9mp5rPQeA7yGE7JzgRLemNKgeXPZv9tjhjS");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const getProvider = () => {
    if ("phantom" in window) {
      const provider = window.phantom.solana;
      if (provider?.isPhantom) {
        return provider;
      }
    }else {
      window.open("https://phantom.app/", "_blank");
    }
    return undefined;
  };
  
  useEffect(() => {}, [account]);

  
  useEffect(() => {
  const provider = getProvider();

  provider.on("accountChanged", (publicKey) => {
    if (publicKey) {
      // Set new public key and continue as usual
      setAccount(publicKey.toBase58());
      dispatch(AccountStore(publicKey.toBase58()));
    }
  });
}, [account]);
  
  const MenuButton = () => {
    return (
      <div className="menu" onClick={() => navigate('/MakeProof')}>
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

  async function getdbAsset(acc) {
    const account = JSON.stringify(acc);
    const Asset = await axios.post("http://13.125.226.19/getasset", account)
    dispatch(ReadDBAsset(Asset.data));
  }



  function ConnectWallet() {
    const Connect = async () => {
      const provider = getProvider();
      if (provider.isConnected) {
        provider.disconnect();
        setAccount("");
        console.log("disconnect");
        dispatch(AccountStore(""));
      } else {
        try {
          const Connection = await provider.connect();
          const acc = Connection.publicKey.toString();
          console.log(acc);
          setAccount(acc);
          dispatch(AccountStore(acc));
          getdbAsset(acc);
        } catch (error) {
          console.log("Error Connecting");
        }
        console.log("wallet");
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
        <MenuButton/>
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
        <div onClick={async() => {
          if(account !== "") {
            const AdsInfo = await axios.post("http://13.125.226.19/loadAdsInfo", account);
            if(AdsInfo.data.length === 0) navigate("/AdsUploadModal", {state: {background: location}});
            else alert("Only one advertisement can be registered.");
        } else  alert("Connect Wallet");
        }}>
          <AddAds/>
        </div>
        {ConnectWallet()}
      </section>
    </div>
  );
};

export default TopBar;

