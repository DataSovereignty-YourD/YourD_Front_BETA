import { Icon } from "@iconify/react";
// import { ConeMap } from "./coneMap";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import { ConeAssetsStore,ConeAssetsValue,ExamConeStore, ExampleConeDistanceValue} from "../../redux/ConeAssetsReducer";
import { useState,Fragment ,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import D100Cone from "../../assets/D100Cone.svg";
import D200Cone from "../../assets/D200Cone.svg";
import D500Cone from "../../assets/D500Cone.svg";
import D1000Cone from "../../assets/D1000Cone.svg";
import D2000Cone from "../../assets/D2000Cone.svg";
import D5000Cone from "../../assets/D5000Cone.svg";
import D10000Cone from "../../assets/D10000Cone.svg";
import D20000Cone from "../../assets/D20000Cone.svg";
import D50000Cone from "../../assets/D50000Cone.svg";


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
const Payment = (props) => {
  const dispatch = useDispatch();
  
  const asset = useSelector(ConeAssetsValue);
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
      dispatch(ExamConeStore([copyBasket[findIndex].Distance,copyBasket[findIndex].Count]));
      setBasket(copyBasket);
      
      
      console.log(asset);
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


const ExamMap = () => {

  function ConeMap() {
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API,
    });
    const [currentPosition, setCurrentPosition] = useState(null);
  
    useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentPosition({ lat: latitude, lng: longitude });
        },
        (error) => console.error(error)
      );
    }, []);
  
    if (!isLoaded) return <div>Loading...</div>;
  
    return <ExampleMap currentPosition={currentPosition} />;
  }
  const ExampleMap = ({ currentPosition }) => {
    const center = currentPosition;
    const ExamConeDistance = useSelector(ExampleConeDistanceValue);
    console.log(ExamConeDistance);
    
    const createCone = () => {
      let markers =[];
      for (let i =0; i < ExamConeDistance.length; i++) {
        switch (ExamConeDistance[i][0]) {
          case "100m":
            markers.push(
              <Marker
                key={i}
                position={currentPosition}
                icon={D100Cone}
                draggable={true}
              />
            );
            break;
            case "200m":
            markers.push(
              <Marker
                key={i}
                position={currentPosition}
                icon={D200Cone}
                draggable={true}
              />
            );
            break;
            case "500m":
            markers.push(
              <Marker
                key={i}
                position={currentPosition}
                icon={D500Cone}
                draggable={true}
              />
            );
            break;
            case "1km":
            markers.push(
              <Marker
                key={i}
                position={currentPosition}
                icon={D1000Cone}
                draggable={true}
              />
            );
            break;
            case "2km":
            markers.push(
              <Marker
                key={i}
                position={currentPosition}
                icon={D2000Cone}
                draggable={true}
              />
            );
            break;
            case "5km":
            markers.push(
              <Marker
                key={i}
                position={currentPosition}
                icon={D5000Cone}
                draggable={true}
              />
            );
            break;
            case "10km":
            markers.push(
              <Marker
                key={i}
                position={currentPosition}
                icon={D10000Cone}
                draggable={true}
              />
            );
            break;
            case "20km":
            markers.push(
              <Marker
                key={i}
                position={currentPosition}
                icon={D20000Cone}
                draggable={true}
              />
            );
            break;
            case "50km":
            markers.push(
              <Marker
                key={i}
                position={currentPosition}
                icon={D50000Cone}
                draggable={true}
              />
            );
            break;
          default:
            break;
        }
        
      }


      return markers;
    }
    return (
      <GoogleMap zoom={17} center={center} mapContainerClassName="map-container1">
        {<Marker position={currentPosition} draggable={true} />}
        {createCone()}
      </GoogleMap>
    );
  };
  

  
  return (
    <Fragment>
      <div className="Example">Example</div>
      <div className="Example_Map">
        <ConeMap/>
      </div>
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
