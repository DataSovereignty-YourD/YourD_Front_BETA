import InitMap from "../../../map";
import { AddAdsModalTop } from "./detail";
import { useNavigate,useLocation,Link } from "react-router-dom";
import { StepSetCone } from "./addAdsStep";
import { ConeAssetsValue } from "../../../redux/ConeAssetsReducer";
import { useDispatch, useSelector} from "react-redux";
import { Fragment } from "react";
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
  const Next = () => {
    return (
      <Link
        to="/Check"
        state={{ background: location }}
        className="ModalSmallButton">
        Next
      </Link>
    );
  };

  return (
    <div className="ButtonPosition">
      <Back />
      <Next />
    </div>
  );
};

const ConeBalance = () => {
  const ConeAsset = useSelector(ConeAssetsValue);
  console.log(ConeAsset);
  return(
    <section className="BalanceSection">
      {ConeAsset.map((asset)=> {
        if(asset.Count > 0) {
          return (
              <div className="BalanceBox" style={{backgroundColor: asset.color}}>
                {asset.Distance}: {asset.Count}
              </div>
              
            
          )
        }
      })}
    </section>
  )  
}

const SetCone = () => {
    document.body.style = `overflow-y: hidden;`;
  return (
    <div className="Container">
      <div className="Background">
        <div className="Modal">
          <AddAdsModalTop />
          <div className="SetConeBody">
            <StepSetCone />
            <div className="SetConeMap">
              <InitMap />
              <ConeBalance/>
            </div>
            <BackNextButton/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetCone;
