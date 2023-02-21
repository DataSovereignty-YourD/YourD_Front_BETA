import { Icon } from "@iconify/react";
// import { ModalClose } from "../../../redux/ModalReducer";
// import { useDispatch } from "react-redux";
import { ReactComponent as UploadIcon } from "../../../assets/UploadIcon.svg";
import {Link,useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fileUpload, fileInfo } from "../../../redux/AdsUploadReducer";
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
  const navigate = useNavigate();
  const location = useLocation();
  const dragRef = useRef();
  const dispatch = useDispatch();
  // add state to keep track of whether the file is being dragged over the upload area
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    dispatch(fileUpload(file));
    console.log(file.name);
    navigate("/Detail", { state: { background: location } });
  };

  const initDragEvents = useCallback(() => {
    // 앞서 말했던 4개의 이벤트에 Listener를 등록합니다. (마운트 될때)
    
    if (dragRef.current !== null) {
      dragRef.current.addEventListener("dragleave", handleDragLeave);
      dragRef.current.addEventListener("dragover", handleDragOver);
      dragRef.current.addEventListener("drop", handleDrop);
    }
  }, [ handleDragLeave, handleDragOver, handleDrop]);

  const resetDragEvents = useCallback(() => {
    // 앞서 말했던 4개의 이벤트에 Listener를 삭제합니다. (언마운트 될때)
    
    if (dragRef.current !== null) {
      dragRef.current.removeEventListener("dragleave", handleDragLeave);
      dragRef.current.removeEventListener("dragover", handleDragOver);
      dragRef.current.removeEventListener("drop", handleDrop);
    }
  }, [ handleDragLeave, handleDragOver, handleDrop]);

  useEffect(() => {
    initDragEvents();

    return () => resetDragEvents();
  }, [initDragEvents, resetDragEvents]);

  return (
    <div className="Container">
      <div className="Background">
        <div className="Modal">
          <Top />
          <div className="File_Upload_body">
            <input
              type="file"
              
              id="fileUpload"
              style={{ display: "none" }}
            />
            <div ref={dragRef} className={isDragging ? "Circle-dragging" : "Circle"}>
              <UploadIcon className="UploadIcon" />
            </div>
            <div className="File_Upload_Text">Drag & Drop a File Here</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdsUpload;