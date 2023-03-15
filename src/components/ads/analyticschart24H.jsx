import img1 from "../../assets/adsmanager1.png";

const Analyticschart24H = () => {
    return (
        <section className="Ads_Analytics">
            <div className="Analytics_title">Ads Management (Last 24H)</div>
            <div className="chart">
                <img src={img1} style={{height: "35vh"}}/>
            </div>
        </section>
    )
}

export default Analyticschart24H;