import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { fileInfo, detailinfo, infoValue, ModalCloseAction, fileTitle } from "../../../redux/AdsUploadReducer";
import { TempConeReset } from "../../../redux/ConeAssetsReducer";
import { StepCircle } from "./addAdsStep";

export const AddAdsModalTop = () => {
  
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const title = useSelector(fileTitle);
    const ModalClose =()=> {
      dispatch(TempConeReset());
      dispatch(ModalCloseAction());
      navigate("/");
    }

    return (
      <div className="ModalTop">
        <div className="ModalTitle">{title}</div>
        <div onClick={ModalClose} className="CloseButton">
          <Icon icon="mingcute:close-fill" color="white" width="30" />
        </div>
      </div>
    );
}

const DetailBody = () => {
  const [TitleValue,SetTitleValue] = useState("");
  const [DescriptionValue,SetDescriptionValue] = useState("");
  const dispatch = useDispatch();
  const info = useSelector(infoValue);
  const Title = info[0].title;
  const Description = info[0].description;
  
  useEffect(() => {
    SetTitleValue(Title);
    SetDescriptionValue(Description);
  },[Title,Description]);

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
  const navigate = useNavigate();
  const location = useLocation();
  const adsfile = useSelector(fileInfo);
  
  // useEffect(()=> {
  //   if (adsfile.toString().length === 0) {
  //     navigate("/AdsUploadModal", { state: { background: location } });
  //   }
  // },)


  function Base64Image(adsfile) {
    return <img src={adsfile} alt="image" style={{width: "250px", height:"auto", borderRadius: "12px"}}/>
  }

  return (
      <section className="AdsViewSection">
        <div className="AdsViewBox">
          <div className="Preview-text">Preview</div>
          <div className="Preview">{(adsfile)? Base64Image(adsfile): <div>error</div>}</div>
        </div>
      </section>
  );
};

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
        <div className="Container">1
          <div className="Background">
            <div className="Modal">
              <AddAdsModalTop />
              <StepCircle />
              <div className="AddAds_Modal_body">
                <DetailBody />
                <BackNextButton />
              </div>
            </div>
          </div>
        </div>
    );
}

export default Detail;