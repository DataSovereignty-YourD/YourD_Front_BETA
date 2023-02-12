import { Fragment } from "react";
import DashBoard from "./dashBoard";
import Sidebar from "./Navi/sidebar";
import TopBar from "./Navi/topbar";

const Main = () => {
    return (
        <Fragment>
            <Sidebar/>
            <TopBar/>
            <DashBoard/>
        </Fragment>
    )
}

export default Main;