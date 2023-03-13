import axios from "axios"
const ServerURL="http://localhost:8000";

export default async function CheckDBAccount(account){
    axios
      .post(`${ServerURL}/account/check`, { Account: account })
      .then((accRes) => {
        console.log("accRes",accRes.data);
        if (accRes.data === "Checked") return account;
        else if(accRes.data === "Not Exist") axios.post(`${ServerURL}/account/create`, {Account: account});
      });
    // const Asset = await axios.get(`$ServerURL}account/check`, account);
  }