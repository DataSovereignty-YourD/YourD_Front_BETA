import { Icon } from "@iconify/react";
import { ReactComponent as UploadIcon } from "../../../assets/UploadIcon.svg";
import {Link,useLocation, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fileTitleStore, fileUpload } from "../../../redux/AdsUploadReducer";
import { Account, AdsCidStore } from "../../../redux/AccountReducer";
import axios from "axios";
// import { useStorageUpload } from "@thirdweb-dev/react";

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

export const Loading =() => {
  return(
    <div className="loading"/>
  )
}

export const AdsUpload = () => {
  document.body.style = `overflow-y: hidden;`;
  // const { mutateAsync: upload } = useStorageUpload();
  const account = useSelector(Account);
  const navigate = useNavigate();
  const location = useLocation();
  const dragRef = useRef();
  const dispatch = useDispatch();
  // add state to keep track of whether the file is being dragged over the upload area
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDragEnter =  useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
  },[]);

  const handleDragOver= useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(true);
  },[]);

  const handleDragLeave =  useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
  },[]);

  const handleDrop =  useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    dispatch(fileUpload(file));
  },[]);

  const initDragEvents = useCallback(() => {
    // 앞서 말했던 4개의 이벤트에 Listener를 등록합니다. (마운트 될때)
    if (dragRef.current !== null) {
      dragRef.current.addEventListener("dragenter",handleDragEnter);
      dragRef.current.addEventListener("dragleave", handleDragLeave);
      dragRef.current.addEventListener("dragover", handleDragOver);
      dragRef.current.addEventListener("drop", handleDrop);
    };
    return () => {
      // 앞서 말했던 4개의 이벤트에 Listener를 삭제합니다. (언마운트 될때)
      if(dragRef.current !== null) {
      dragRef.current.removeEventListener("dragenter",handleDragEnter);
      dragRef.current.removeEventListener("dragleave", handleDragLeave);
      dragRef.current.removeEventListener("dragover", handleDragOver);
      dragRef.current.removeEventListener("drop", handleDrop);
    }};
  }, [handleDragEnter, handleDragLeave, handleDragOver, handleDrop]);

  useEffect(() => {
    initDragEvents();
  }, [initDragEvents]);

 
  const inputfile = async (e) => {
    setLoading(true);
    let file = e.target.files[0];
    const Title = file.name.split(".")[0];
    dispatch(fileTitleStore(Title));
    const formData = new FormData();
    formData.append("file",file);
    const metadata = JSON.stringify({
      name: account,
      Title: Title,
      keyvalues: {
        exampleKey: 'exampleValue'
      }
    })
    formData.append("pinataMetadata", metadata);
    const options = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', options);

    //preview image url저장
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64 = reader.result.toString();
      dispatch(fileUpload(base64));
    }

    // Authorization: `${process.env.REACT_APP_PINATA_API_JWT}`,
    if (file) {
      try{
        const result = await axios.post("http://localhost:3001/adsfile",formData);
        console.log(result);
        navigate("/Detail", { state: { background: location } });

            // dispatch(AdsCidStore(result.data.IpfsHash));
      } catch (error) {
        console.log(error);
        navigate(-1);
      }
    }
  }
  
  return (
    <div className="Container">
      <div className="Background">
        <div className="Modal">
          <Top />
          {loading?<Loading/>:
          (<label className="File_Upload_body" ref={dragRef}>
            <input
              type="file"
              id="fileUpload"
              style={{ display: "none" }}
              onChange={inputfile}
            />
            <label htmlFor="fileUpload" className={isDragging ? "Circle-dragging" : "Circle"}>
              <UploadIcon className="UploadIcon" />
            </label>
            <div className="File_Upload_Text">Drag & Drop a File Here</div>
          </label>)}
        </div>
      </div>
    </div>
  );
};

export default AdsUpload;