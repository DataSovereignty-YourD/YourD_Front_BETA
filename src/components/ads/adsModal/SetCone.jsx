import InitMap from "../../map";
import { AddAdsModalTop } from "./detail";
import { useNavigate,useLocation,Link } from "react-router-dom";
import { StepSetCone } from "./addAdsStep";
import { ConeAssetsValue, SetCone } from "../../../redux/ConeAssetsReducer";
import {  useDispatch, useSelector} from "react-redux";
import SetConeMap from "../../map/setConeMap";
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
  const dispatch = useDispatch();
  console.log(ConeAsset);
  const count = [
    {color: "#2F88FF", Distance: "100m",Count: 0}, 
    {color: "#FF4D4D", Distance: "200m",Count: 0},
    {color: "#FF9330", Distance: "500m",Count: 0},
    {color: "#FFF615", Distance: "1km" ,Count: 0},
    {color: "#67E01C", Distance: "2km" ,Count: 0},
    {color: "#1ED7E2", Distance: "5km" ,Count: 0},
    {color: "#AB2DE7", Distance: "10km",Count: 0},
    {color: "#CC3FA4", Distance: "20km",Count: 0},
    {color: "#000000", Distance: "50km",Count: 0},
  ];
  ConeAsset.map((Distance) => {
    switch (Distance.distance) {
      case "100m" : count[0].Count++; break;
      case "200m" :count[1].Count++;break;
      case "500m" : count[2].Count++;break;
      case "1km" :  count[3].Count++;break;
      case "2km" :  count[4].Count++;break;
      case "5km" :  count[5].Count++;break;
      case "10km" : count[6].Count++;break;
      case "20km" : count[7].Count++;break;
      case "50km" : count[8].Count++;break;
      default: break;
    };
    return 0;
  })

  const SetConeClick = (distance) => {
    console.log(distance);
    try {
      ConeAsset.map((D)=> {
        if(D.distance === distance) {
          console.log(D);
          const index = ConeAsset.findIndex(el => el === D);
          
          dispatch(SetCone({D, index}));
          throw new Error("Once");
        }
      })
    } catch (error) {
      
    }
  }

  return(
    <section className="BalanceSection">
      {count.map((index)=> {
        if(index.Count>0) {
          return (
            <div
              key={index.Distance}
              value={index.Distance}
              className="BalanceBox"
              style={{ backgroundColor: index.color }}
              onClick={() => {SetConeClick(index.Distance)}}
            >
              {index.Distance}: {index.Count}
            </div>
          );
        }
      })}
    </section>
  )  
}

const SetConePage = () => {
    document.body.style = `overflow-y: hidden;`;
  return (
    <div className="Container">
      <div className="Background">
        <div className="Modal">
          <AddAdsModalTop />
          <div className="SetConeBody">
            <StepSetCone />
            <div className="SetConeMap">
              <SetConeMap />
              <ConeBalance/>
            </div>
            <BackNextButton/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetConePage;
