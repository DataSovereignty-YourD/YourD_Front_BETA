import { Icon } from "@iconify/react";
import InitMap from "../../map";
import { useDispatch, useSelector } from "react-redux";
import { ConeAssetsStore,ConeAssetsValue} from "../../redux/ConeAssetsReducer";
import { useState,Fragment } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Top = () => {
  // const navigate = useNavigate();
  return (
    <div className="ModalTop">
      <div className="ModalTitle">ConeShop</div>
      <Link to="/" className="CloseButton">
        <Icon icon="mingcute:close-fill" color="white" width="30" />
      </Link>
    </div>
  );
};
const ConeList = [
  { distance: "100m", color: "#2F88FF" },
  { distance: "200m", color: "#FF4D4D" },
  { distance: "500m", color: "#FF9330" },
  { distance: "1km", color: "#FFF615" },
  { distance: "2km", color: "#67E01C" },
  { distance: "5km", color: "#1ED7E2" },
  { distance: "10km", color: "#AB2DE7" },
  { distance: "20km", color: "#CC3FA4" },
  { distance: "50km", color: "#000000" },
];

const Payment = () => {
  const [Basket, setBasket] = useState([
    { "Distance": "100m", "Count": 0, "color": "#2F88FF", "Price": 10},
    { "Distance": "200m", "Count": 0, "color": "#FF4D4D", "Price": 20},
    { "Distance": "500m", "Count": 0, "color": "#FF9330", "Price": 50},
    { "Distance": "1km", "Count": 0, "color": "#FFF615" ,"Price": 100},
    { "Distance": "2km", "Count": 0, "color": "#67E01C" ,"Price": 200},
    { "Distance": "5km", "Count": 0, "color": "#1ED7E2" ,"Price": 500},
    { "Distance": "10km", "Count": 0, "color": "#AB2DE7", "Price": 1000},
    { "Distance": "20km", "Count": 0, "color": "#CC3FA4", "Price": 2000},
    { "Distance": "50km", "Count": 0, "color": "#000000", "Price": 5000},
    { "TotalCount": 0, "Price": 0 }
  ]);
  const ConeSelect = () => {
    const List = (cone) => {
      const findIndex = Basket.findIndex(element => element.Distance === cone.distance);
      const copyBasket = [...Basket];
      console.log(copyBasket[findIndex]);
      
      if(findIndex !== -1) {
        copyBasket[findIndex].Count += 1;
        copyBasket[9].TotalCount += 1;
        copyBasket[9].Price += copyBasket[findIndex].Price;
      };
      
      setBasket(copyBasket);
    }

    return (
      <div>
        {ConeList.map((cone) => {
          return (
            <label key={cone.color}>
              <input
                type="checkbox"
                value={cone.Distance}
                style={{ display: "none" }}
              />
              <span
                className="ConeListBox"
                value={cone.color}
                style={{ backgroundColor: cone.color }}
                onClick={() =>List(cone)}
              >
                {cone.distance}
              </span>
            </label>
          );
        })}
      </div>
    );
  };

  const SelectedCone = () => {
    return (
      <div>
        { Basket.map((C) => {
          
          if (C.Count > 0) {
            return (
              <div key={C.Distance} className="SelectedCone">
                <div className="ConeDistance">{C.Distance}Cone</div>
                <section className="ConeCountandPrice">
                  <div className="Count">Count: {C.Count}</div>
                  <div className="Price">Price: {C.Price}</div>
                </section>
              </div>
            );
          } else return <div></div>
        })}
      </div>
    );
  }

  const Total = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const ConeBalance = useSelector(ConeAssetsValue);

    function BalanceUpdate() {
      dispatch(ConeAssetsStore(Basket));
      navigate("/");
    }
    return (
      <div className="PaymentBox">
        <div className="TotalCount">Total Count: {Basket[9].TotalCount}</div>
        <div className="TotalPrice">Total Price: {Basket[9].Price} Cat</div>
        <div 
          className="PayButton"
          onClick={ BalanceUpdate}>
          <div>
            Pay Now<div className="fill-one"></div>
          </div>
        </div>
      </div>
    );
  }


  return (
    <Fragment>
      <section className="SelectConeSection">
          <ConeSelect />
      </section>
      <section className="ConeListSection">
        <div className="Cone_List">Cone List</div>
        <SelectedCone/>
      </section>
      <section className="Payment_Section">
        <div className="Payment">Payment</div>
        <Total/>
      </section>
    </Fragment>
  );
};




const ConeShop = () => {
  document.body.style = `overflow-y: hidden;`;
  
  const ExamMap = () => {
    return (
      <Fragment>
        <div className="Example">Example</div>
        <div className="Example_Map">
          <InitMap />
        </div>
      </Fragment>
    );
  };


  return (
    <div className="Container">
      <div className="Background">
        <div className="Modal">
          <Top />
          <section className="Modal_body">
            <section className="ConeShop_body_Left">
              <ExamMap />
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
