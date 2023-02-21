import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { fileInfo, detailinfo, infoValue } from "../../../redux/AdsUploadReducer";
import { StepDetail } from "./addAdsStep";

export const AddAdsModalTop = () => {
  const adsfile = useSelector(fileInfo);
    const fullTitle = [adsfile.name];
    const title = fullTitle.toString().split(".");

    return (
      <div className="ModalTop">
        <div className="ModalTitle">{title[0]}</div>
        <Link to="/" className="CloseButton">
          <Icon icon="mingcute:close-fill" color="white" width="30" />
        </Link>
      </div>
    );
}

const DetailBody = () => {
  const [TitleValue,SetTitleValue] = useState("");
  const [DescriptionValue,SetDescriptionValue] = useState("");
  const info = useSelector(infoValue);
  const Title = info[0].title;
  const Description = info[0].description;
  const dispatch = useDispatch();
  
  useEffect(() => {
    SetTitleValue(Title);
    SetDescriptionValue(Description);
  },[]);

  const Titlehandlechange = (e) => {
    SetTitleValue(e.target.value);
    dispatch(detailinfo({title: e.target.value, description: DescriptionValue}));
  }
  const Descriptionhandlechange = (e) => {
    SetDescriptionValue(e.target.value);
    dispatch(detailinfo({title: TitleValue,description: e.target.value}))
  }

  return (
      <section className="DetailBody">
          <section className="DetailInput">
              <div className="DetailBodyTitle">Detail</div>
              <div className="AdsDetailTitleBox">Title
              <input type="text" name="title" value={TitleValue} onChange={Titlehandlechange} className="DetailTitleTextBox"/>
              </div>
              <div className="AdsDetailDescriptionBox">Description
              <input type="text" name="description" value={DescriptionValue} onChange={Descriptionhandlechange} className="DetailDescriptionTextBox"/>
              </div>
          </section>
          <DetailAdsView/>
      </section>
  )
}

export const DetailAdsView = () => {
    
    // const image = () => {
    //   setContents
    // }
    return (
        <>
            <section className="AdsViewSection">
                <div className="AdsViewBox">Video</div>
                <div></div>
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