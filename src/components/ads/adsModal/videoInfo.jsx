import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { StepVideoInfo } from "./addAdsStep";
import { AddAdsModalTop } from "./detail";
import {
  CategorySelectValue,
  Categorydatastore,
} from "../../../redux/CategoryReducer";
import { useDispatch, useSelector } from "react-redux";

const CATEGORY_LIST = [
  { id: 0, data: "Art" },
  { id: 1, data: "Architecture" },
  { id: 2, data: "Korean calligraphy" },
  { id: 3, data: "Cinema" },
  { id: 4, data: "Dance" },
  { id: 5, data: "Illustration" },
  { id: 6, data: "Fashion" },
  { id: 7, data: "Graphic design" },
  { id: 8, data: "Literature" },
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
      console.log(selectedList);
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

  const DetailAdsView = () => {
    const BackNextButton = () => {
      const navigate = useNavigate();
      const location = useLocation();
  
      const Back = () => {
        return (
          <div className="ModalSmallButton" onClick={() => {
            dispatch(Categorydatastore(selectedList));
            navigate(-1);
            console.log(SelectValue);
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
    return (
      <>
        <section className="AdsViewSection">
          <div className="AdsViewBox">Video</div>
        </section>
        <BackNextButton />
      </>
    );
  };

  return (
    <section className="DetailBody">
      <section className="DetailInput">
        <div className="DetailBodyTitle">Video Info</div>
        <section className="CategorySection">
          <div className="CategoryTitle">Category Settings</div>
          <CategoryBoxs />
        </section>
      </section>
      <DetailAdsView />
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
          <div className="AddAds_Modal_body">
            <StepVideoInfo />
            <VideoInfoBody />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;
