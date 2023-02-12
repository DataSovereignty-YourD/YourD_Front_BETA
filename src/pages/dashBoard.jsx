import Analyticschart24H from "../components/ads/analyticschart24H";
import Analyticschart7D from "../components/ads/analyticschart7D";
import Overview from "../components/ads/overview";
import ConeMap from "../components/cone/coneMap";


const DashBoard = () => {
    return (
        <section className="main">
            <section className="AnalyticsPart">
                <Overview/>
                <Analyticschart24H/>
                <Analyticschart7D/>
            </section>
            <section className="ConePart">
                <div className="Cone_title">Cone</div>
                <ConeMap/>
            </section>
        </section>
    )
}

export default DashBoard;