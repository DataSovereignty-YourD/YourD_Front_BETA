import React, { Fragment, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StepCircle } from "./addAdsStep";
import { DetailAdsView } from "./detail";
import AddAdsModalTop from "./ModalTop";
import { useDispatch, useSelector } from "react-redux";
import {
  CategorySelectValue,
  Categorydatastore,
  DepositValue,
  AdsRewardStore,
} from "../../../redux/AdsUploadReducer";

const CATEGORY_LIST = [
  { id: 0, data: "Art" },
  { id: 1, data: "FestFood" },
  { id: 2, data: "Korean calligraphy" },
  { id: 3, data: "Cinema" },
  { id: 4, data: "Restaurant" },
  { id: 5, data: "Illustration" },
  { id: 6, data: "Fashion" },
  { id: 7, data: "Graphic design" },
  { id: 8, data: "Web3" },
];

const VideoInfoBody = () => {
  const dispatch = useDispatch();
  const SelectValue = useSelector(CategorySelectValue);
  const [selectedList, setSelectList] = useState(SelectValue);

  const CategoryBoxs = () => {
    const SelectElement = (checked, itemId) => {
      if (checked) {
        setSelectList([...selectedList, itemId]);
      } else if (!checked) {
        setSelectList(selectedList.filter((el) => el !== itemId));
      }
      dispatch(Categorydatastore(selectedList));
    };

    return (
      <section className="CategorySelect">
        {CATEGORY_LIST.map((item) => {
          return (
            <label key={item.id}>
              <input
                type="checkbox"
                value={item.data}
                onChange={(e) => {
                  SelectElement(e.target.checked, e.target.value);
                }}
                checked={selectedList.includes(item.data) ? true : false}
                style={{ display: "none" }}
              />
              <span
                className={
                  //체크 Css변환
                  selectedList.includes(item.data) ? "SelectBox" : "CategoryBox"
                }
              >
                {item.data}
              </span>
            </label>
          );
        })}
      </section>
    );
  };

  const BackNextButton = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const Back = () => {
      return (
        <div className="ModalSmallButton" onClick={() => {
          dispatch(Categorydatastore(selectedList));
          navigate(-1);
          }}>
          Back
        </div>
      );
    };
    const Next = () => {
      return (
        <Link
          to="/SetCone"
          state={{ background: location }}
          className="ModalSmallButton"
          onClick={() => {
            dispatch(Categorydatastore(selectedList))}}

        >
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



  const Deposit =()=> {
    const dispatch = useDispatch();
    const TokenValuehandler =()=> {
      const TokenValue = document.getElementById("DepositValue");
      dispatch(DepositValue(TokenValue.value));
    }
    return (
      <Fragment>
        <input type="number" id="DepositValue" className="DepositInput" />
        <button className="DepositButton" onClick={TokenValuehandler}>Deposit</button>
      </Fragment>
    )
  }

  const Reward =()=> {
    const dispatch = useDispatch();

    const RewardValuehandler =()=> {
      const Reward = document.getElementById("RewardValue");
      dispatch(AdsRewardStore(Reward.value));
    }
    return (
      <Fragment>
        <input type="number" id="RewardValue" className="DepositInput" />
        <button className="DepositButton" onClick={RewardValuehandler}>Check</button>
      </Fragment>
    )
  }


  return (
    <section className="DetailBody">
      <section className="DetailInput">
        <div className="DetailBodyTitle">Video Info</div>
        <section className="CategorySection">
          <div className="SmallTitle">Category Settings</div>
          <CategoryBoxs />
        </section>
        <section className="TokenSection">
        <div className="SmallTitle">Deposit Token</div>
          <Deposit/>
        <div className="SmallTitle">Reward per Person</div>
          <Reward/>
        </section>
      </section>
      <DetailAdsView />
      <BackNextButton/>
    </section>
  );
};

const VideoInfo = () => {
  document.body.style = `overflow-y: hidden;`;
  return (
    <div className="Container">
      <div className="Background">
        <div className="Modal">
          <AddAdsModalTop />
          <StepCircle />
          <div className="AddAds_Modal_body">
            <VideoInfoBody />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;
