import {  useState } from "react";
import {useDispatch } from "react-redux";
import { Connect } from "../../functions/Account/ConnectAccount";
import { ReadDBAsset } from "../../redux/ConeAssetsReducer";
import { AccountStore } from "../../redux/AccountReducer";
import axios from "axios"
import qs from "qs"
const ServerURL= "http://localhost:8000"

export default function ConnectWallet({StoredAccount, SetState}) {
    const [Account, setAccount] = useState(StoredAccount);
    const dispatch = useDispatch();

    const getAccount = async () => {
        await Connect().then((res) => {
          console.log(res);
          dispatch(AccountStore(res));
          setAccount(res);
          SetState(res);
          if(res === "") return;
          const data = qs.stringify({
            'Account': res
          });
          const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: `${ServerURL}/getasset`,
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: data
          }
          axios(config)
            .then((Asset) => {
              console.log("Asset: ",Asset);
              dispatch(ReadDBAsset(Asset.data));
            }).catch(function(error) {
              console.log(error);
            })
        });
    }

    
    return (
      <button onClick={()=>getAccount()} className="ConnectWallet">
        <span className="material-icons" style={{marginRight: "10px"}}> account_balance_wallet </span>
        {Account ? <div>{Account.toString().slice(0,6)+"..."+Account.toString().slice(-6)}</div> : <div>Connect Wallet</div>}
      </button>
    );
  }

  