import { Icon } from "@iconify/react";
// import ConeShop from "../../components/cone/coneShop";
// import AdsUpload from "../../components/ads/adsModal/adsUpload";
// import {
//   ModalSwitchValue,
//   ConeShopModalOpen,
//   AddAdsModalOpen,
// } from "../../redux/ModalReducer";
// import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";


const TopBar = () => {
  document.body.style = `overflow-y: scroll;`;
  // const dispatch = useDispatch();
  // const SwitchValue = useSelector(ModalSwitchValue);
  const location = useLocation();
  
  const MenuButton = () => {
    return (
      <div className="menu">
        <Icon
          className="menu_Icon"
          icon="material-symbols:menu"
          color="white"
          width="28"
        />
      </div>
    );
  };

  const ConeShopModal = () => {
    return (
      <div className="Button">
        <Icon icon="mdi:traffic-cone" width="26" />
      </div>
    );
  };

  const AddAds = () => {
    return (
      <div className="Button">
        <Icon icon="ri:advertisement-line" width="26" />
      </div>
    );
  };

  return (
    <div className="TopBar">
      <section className="leftSection">
        <MenuButton />
        <div className="Logo">D-AD</div>
      </section>
      <section className="Button_sction">
        <Link to="/ConeShopModal" state={{ background: location }}>
          <ConeShopModal />
        </Link>
        <Link to="/AdsUploadModal" state={{ background: location }}>
          <AddAds />
        </Link>
      </section>
    </div>
  );
};

export default TopBar;
