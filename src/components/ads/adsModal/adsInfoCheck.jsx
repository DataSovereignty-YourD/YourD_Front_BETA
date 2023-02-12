import { AddAdsModalTop } from "./detail";
import { useNavigate,useLocation, Link } from "react-router-dom";
const BackNextButton = () => {
    const navigate = useNavigate();
    const location = useLocation();
  // const dispatch = useDispatch();
    const Back = () => {
      return (
        <div
          className="ModalSmallButton"
          onClick={() => navigate(-1)}>
          Back
        </div>
      );
    };
    const Upload = () => {
      return (
        <Link
          to="/"
          state={{ background: location }}
          className="ModalSmallButton">
          Upload
        </Link>
      );
    };

    return (
        <div className="ButtonPosition">
          <Back />
          <Upload />
        </div>
      );
    };

const Check = () => {
    return (
        <div className="Container">
      <div className="Background">
        <div className="Modal">
            <AddAdsModalTop/>
            <BackNextButton/>
        </div>
        </div>
        </div>
    )

}

export default Check;