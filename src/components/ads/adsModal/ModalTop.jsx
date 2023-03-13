import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fileTitle, ModalCloseAction } from "../../../redux/AdsUploadReducer";
import { ExampleConeReset, TempConeReset } from "../../../redux/ConeAssetsReducer";
import { Icon } from "@iconify/react";

export default function AddAdsModalTop() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const title = useSelector(fileTitle);
    const ModalClose =()=> {
      dispatch(TempConeReset());
      dispatch(ModalCloseAction());
      dispatch(ExampleConeReset());
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