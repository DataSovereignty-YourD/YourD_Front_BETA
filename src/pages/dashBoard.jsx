import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Analyticschart24H from "../components/ads/analyticschart24H";
import Analyticschart7D from "../components/ads/analyticschart7D";
import Overview from "../components/ads/overview";
import ConeMap from "../components/cone/coneMap";
import { Account } from "../redux/AccountReducer";

const DashBoard = () => {
    const account = useSelector(Account);
    const [currentAccount, setCurrentAccount] = useState(account);
    useEffect(()=> {
        console.log("DashBoard Rerender");
    },[currentAccount])
    return (
        <section className="main">
            <section className="AnalyticsPart">
                <Overview/>
                <Analyticschart24H/>
                <Analyticschart7D/>
            </section>
            <section className="ConePart">
                <div className="Cone_title">Cone</div>
                {account === ""? <div>Connect Wallet</div>: <ConeMap Account={account}/>}
            </section>
        </section>
    )
}

export default DashBoard;