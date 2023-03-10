import { AddAdsModalTop } from "./detail";
import { useNavigate,useLocation,Link } from "react-router-dom";
import { StepCircle } from "./addAdsStep";
import { ConeAssetsValue, SetConeTemp,SetConeTempValue } from "../../../redux/ConeAssetsReducer";
import {  useDispatch, useSelector} from "react-redux";
import SetConeMap from "../../map/setConeMap";
import { useEffect, useMemo, useState } from "react";
const BackNextButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const Back = () => {
    return (
      <div className="ModalSmallButton" onClick={() => navigate(-1)}>
        Back
      </div>
    );
  };
  const Next = () => {
    return (
      <Link to="/Check" state={{ background: location }} className="ModalSmallButton">
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
  const TempAsset = useSelector(SetConeTempValue);
  const dispatch = useDispatch();
  const Temp=[...ConeAsset];

  const ConeTemp = Temp.filter((item1) =>{
    return !TempAsset.some((item2) => item1.index === item2.index);
  })
  console.log("ConeTemp",ConeTemp);
  const count = useMemo(() => {
    const initialCount = [
      { color: "#2F88FF", Distance: "100m", Count: 0 },
      { color: "#FF4D4D", Distance: "200m", Count: 0 },
      { color: "#FF9330", Distance: "500m", Count: 0 },
      { color: "#FFF615", Distance: "1km", Count: 0 },
      { color: "#67E01C", Distance: "2km", Count: 0 },
      { color: "#1ED7E2", Distance: "5km", Count: 0 },
      { color: "#AB2DE7", Distance: "10km", Count: 0 },
      { color: "#CC3FA4", Distance: "20km", Count: 0 },
      { color: "#000000", Distance: "50km", Count: 0 },
    ];

    ConeTemp.forEach((distance) => {
      const index = initialCount.findIndex(
        (count) => count.Distance === distance.distance
      );
      if (index >= 0) {
        initialCount[index].Count++;
      }
    });
    return initialCount.filter((count) => count.Count > 0);
  }, [ConeTemp]);
  console.log("Count",count);
  
  const setConeClick = (distance) => {
    const index = ConeTemp.findIndex((D) => D.distance === distance);
    if (index >= 0) {
      console.log(ConeTemp[index], index);
      dispatch(SetConeTemp({ D: ConeTemp[index], index }));
      ConeTemp.splice(index, 1);
    }
  };

  const BalanceBox = ({ color, Distance, Count }) => (
    <div
      className="BalanceBox"
      style={{ backgroundColor: color }}
      onClick={() => {
        if (Count > 0) {
          setConeClick(Distance);
        }
      }}
    >
      {Distance}: {Count}
    </div>
  );

  return(
    <section className="BalanceSection">
      {count.map((item) => (
        <BalanceBox key={item.Distance} {...item} />
      ))}
    </section>
  )  
}

const SetConePage = () => {
    document.body.style = `overflow-y: hidden`;
  return (
    <div className="Container">
      <div className="Background">
        <div className="Modal">
          <AddAdsModalTop />
          <div className="SetConeBody">
            <StepCircle />
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
