import { Icon } from "@iconify/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StepDetail } from "./addAdsStep";

export const AddAdsModalTop = () => {
    return (
      <div className="ModalTop">
        <div className="ModalTitle">Title</div>
        <Link to="/" className="CloseButton">
          <Icon icon="mingcute:close-fill" color="white" width="30" />
        </Link>
      </div>
    );
}

const DetailBody = () => {
    return (
        <section className="DetailBody">
            <section className="DetailInput">
                <div className="DetailBodyTitle">Detail</div>
                <div className="AdsDetailTitleBox">Title
                <input type="text" className="DetailTitleTextBox"/>
                </div>
                <div className="AdsDetailDescriptionBox">Description
                <input type="text" className="DetailDescriptionTextBox"/>
                </div>
            </section>
            <DetailAdsView/>
        </section>
    )
}

export const DetailAdsView = () => {
    return (
        <>
            <section className="AdsViewSection">
                <div className="AdsViewBox">Video</div>
            </section>
            <BackNextButton/>
        </>
    )
}

const BackNextButton = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const Back = () => {
      return <div className="ModalSmallButton" onClick={() =>navigate(-1)}>Back</div>;
    };
    const Next = () => {
      return <Link to="/VideoInfo" state={{ background: location }} className="ModalSmallButton" >Next</Link>;
    };
    
    return (
        <div className="ButtonPosition">
            <Back />
            <Next/>
        </div>
    )
}

const Detail = () => {
    document.body.style = `overflow-y: hidden;`;
    return (
        <div className="Container">
          <div className="Background">
            <div className="Modal">
              <AddAdsModalTop />
              <div className="AddAds_Modal_body">
                <StepDetail />
                <DetailBody />
              </div>
            </div>
          </div>
        </div>
    );
}

export default Detail;