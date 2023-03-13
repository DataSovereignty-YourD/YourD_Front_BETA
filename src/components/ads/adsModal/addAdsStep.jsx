import { ReactComponent as ColorCircle}from "../../../assets/colorCircle.svg";
import { ReactComponent as DefaultCircle} from "../../../assets/defaultCircle.svg";
import {ReactComponent as CollectCircle} from "../../../assets/collectCircle.svg";
import { ReactComponent as WarningCircle} from "../../../assets/warningCircle.svg";
import { useSelector } from "react-redux";
import { AdsRewardValue, CategorySelectValue, infoValue, TokenDepositValue } from "../../../redux/AdsUploadReducer";
import { useLocation } from "react-router-dom";
// import { useEffect } from "react";
import { ConePositionValue } from "../../../redux/ConeAssetsReducer";

export const StepCircle = () => {
  const infovalue = useSelector(infoValue);
  const CategoryValue = useSelector(CategorySelectValue);
  const DepositToken = useSelector(TokenDepositValue);
  const RewardToken = useSelector(AdsRewardValue);
  const Position = useSelector(ConePositionValue);
  console.log(Position);
  const location = useLocation();
  const Detail = () => {
    switch (location.pathname) {
      case "/Detail": {
        return <ColorCircle/>
      }
      default: {
        if (infovalue[0].title !== "" && infovalue[0].description !== "") return<CollectCircle/> 
        else return <WarningCircle/>
      }
    }
  }

  const VideoInfo = () => {
    switch (location.pathname) {
      case "/Detail": {
        if(CategoryValue[0] === undefined && DepositToken === 0 && RewardToken === 0 ) return <DefaultCircle/>
        else if (CategoryValue[0] !== undefined && DepositToken !== 0 && RewardToken !== 0) return <CollectCircle/>
        else return <WarningCircle/>
      }
      case "/VideoInfo": {
        return <ColorCircle/>
      }
      default: {
        if(CategoryValue[0] !== undefined && DepositToken !== 0 && RewardToken !== 0) return <CollectCircle/>
        else return <WarningCircle/>
      }
    }
  }

  const SetCone = () => {
    switch (location.pathname) {
      case "/SetCone": return <ColorCircle/>;
      case "/Check": {
        if (Position[0] === undefined || Position[0] === null) return <WarningCircle/>;
        else return <CollectCircle/>
    }
      default: {
        if (Position[0] === undefined) return <DefaultCircle/>
        else return <CollectCircle/>
      }
    }
  }
  const Check = () => {
    switch (location.pathname) {
      case "/Check": return <ColorCircle/>
      default: return <DefaultCircle/>
    }
  }
    return (
      <section className="Modal_Step">
        <div className="Step_Box">
          <div className="Step_Title">Detail</div>
          {Detail()}
        </div>
        <div className="Step_Box">
            <div className="Step_Line"/>
        </div>
        <div className="Step_Box">
          <div className="Step_Title">Video Info</div>
          {VideoInfo()}
        </div>
        <div className="Step_Box">
            <div className="Step_Line"/>
        </div>
        <div className="Step_Box">
            <div className="Step_Title">Set Cone</div>
            {SetCone()}
        </div>
        <div className="Step_Box">
            <div className="Step_Line"/>
        </div>
        <div className="Step_Box">
            <div className="Step_Title">Check</div>
            {Check()}
        </div>
      </section>
    );
}
