import { Icon } from "@iconify/react";

import { useDispatch, useSelector } from "react-redux";
import {
  ConeAssetsStore,
  ExamConeStore,
  ExampleConeTotal,
  TotalCountValue,
  ExampleConeDistanceValue,
  TotalPriceValue,
  ExampleConeReset,
  ExamConeRemove,
} from "../../redux/ConeAssetsReducer";
import { useState, Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ExamMap from "../map/coneShopMap";

const Top = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <div className="ModalTop">
      <div className="ModalTitle">ConeShop</div>
      <div
        className="CloseButton"
        onClick={() => {
          dispatch(ExampleConeReset());
          navigate("/");
        }}
      >
        <Icon icon="mingcute:close-fill" color="white" width="30" />
      </div>
    </div>
  );
};

const ConeList = [
  { distance: "100m", color: "#2F88FF", Price: 10 },
  { distance: "200m", color: "#FF4D4D", Price: 20 },
  { distance: "500m", color: "#FF9330", Price: 50 },
  { distance: "1km", color: "#FFF615", Price: 100 },
  { distance: "2km", color: "#67E01C", Price: 200 },
  { distance: "5km", color: "#1ED7E2", Price: 500 },
  { distance: "10km", color: "#AB2DE7", Price: 1000 },
  { distance: "20km", color: "#CC3FA4", Price: 2000 },
  { distance: "50km", color: "#000000", Price: 5000 },
];
const Payment = () => {
  const dispatch = useDispatch();
  const [CurrentPosition, setCurrentPosition] = useState([]);
  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({ lat: latitude, lng: longitude });
      },
      (error) => console.error(error)
    );
  }, []);

  const ConeSelect = () => {
    let index = 0;
    
    const List2 = (distance, color, Price) => {
      if (CurrentPosition !== null) {
        console.log("sipal");
        dispatch(ExamConeStore({ distance, color, Price, index }));
        dispatch(ExampleConeTotal(Price));
        index++;
      }
    };


    return (
      <div>
        {ConeList.map(({ distance, color, Price }) => (
          <label key={Price}>
            <input
              type="checkbox"
              value={distance}
              style={{ display: "none" }}
            />
            <span
              className="ConeListBox"
              value={color}
              style={{ backgroundColor: color }}
              onClick={() => List2(distance, color, Price)}
            >
              {distance}
            </span>
          </label>
        ))}
      </div>
    );
  };

  const SelectedCone = () => {
    const examasset = useSelector(ExampleConeDistanceValue);
    if (examasset.Distance !== "")
      return (
        <div>
          {examasset.map(({ distance, Price }, index) => {
            return (
              <div key={index} className="SelectedCone">
                <div key={distance} className="ConeDistance">
                  {distance} Cone
                </div>
                <section className="ConeCountandPrice">
                  <button
                    className="Remove"
                    onClick={() => {
                      dispatch(ExamConeRemove({ index, Price }));
                    }}
                  >
                    Remove
                  </button>
                  <div key={Price} className="Price">
                    Price: {Price}
                  </div>
                </section>
              </div>
            );
          })}
        </div>
      );
  };

  const Total = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const TotalCount = useSelector(TotalCountValue);
    const TotalPrice = useSelector(TotalPriceValue);

    function BalanceUpdate() {
      dispatch(ConeAssetsStore());
      navigate("/");
    }
    return (
      <div className="PaymentBox">
        <div className="TotalCount">Total Count: {TotalCount}</div>
        <div className="TotalPrice">Total Price: {TotalPrice} Cat</div>
        <div className="PayButton" onClick={BalanceUpdate}>
          <div>
            Pay Now<div className="fill-one"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Fragment>
      <section className="SelectConeSection">
        <ConeSelect />
      </section>
      <section className="ConeListSection">
        <div className="Cone_List">Cone List</div>
        <SelectedCone />
      </section>
      <section className="Payment_Section">
        <div className="Payment">Payment</div>
        <Total />
      </section>
    </Fragment>
  );
};

const ConeShop = () => {
  document.body.style = `overflow-y: hidden;`;

  return (
    <div className="Container">
      <div className="Background">
        <div className="Modal">
          <Top />
          <section className="Modal_body">
            <section className="ConeShop_body_Left">
              <ExamMap/>
            </section>
            <section className="ConeShop_body_Right">
              <Payment />
            </section>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ConeShop;
