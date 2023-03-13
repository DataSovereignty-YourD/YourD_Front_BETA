import axios from "axios";
const ServerURL = "http://localhost:8000"
export function GetAsset(account) {
    console.log(account)
    let result = null;
    axios.post(`${ServerURL}/getasset`, {Account: account})
        .then((res) => {
            result = res.data;
            console.log(result);
            return result
        })
}