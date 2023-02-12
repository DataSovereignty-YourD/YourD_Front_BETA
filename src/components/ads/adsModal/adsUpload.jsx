import { Icon } from "@iconify/react";
// import { ModalClose } from "../../../redux/ModalReducer";
// import { useDispatch } from "react-redux";
import { ReactComponent as UploadIcon } from "../../../assets/UploadIcon.svg";
import {Link,useLocation } from 'react-router-dom';
// import Detail from "./detail";
// import VideoInfo from "./videoInfo";
export const Top = () => {

  return (
    <div className="ModalTop">
      <div className="ModalTitle">Ads Upload</div>
      <Link to="/" className="CloseButton" >
        <Icon icon="mingcute:close-fill" color="white" width="30" />
      </Link>
    </div>
  );
}

export const AdsUpload = () => {
  document.body.style = `overflow-y: hidden;`;
  // const dispatch = useDispatch();
  // onclick={() => ModalClose()}  state변경 함수 호출
  
  const location = useLocation();
  // const navigate = useNavigate();
  return (
    <div className="Container">
      <div className="Background">
        <div className="Modal">
          <Top />
          <div className="File_Upload_body">
            <Link to="/Detail" state={{ background: location }} className="Circle">
                <UploadIcon className="UploadIcon" />
            </Link>
          </div>
          <div className="File_Upload_Text">Drag & Drop a File Here</div>
        </div>
      </div>
    </div>
  );

};

export default AdsUpload;