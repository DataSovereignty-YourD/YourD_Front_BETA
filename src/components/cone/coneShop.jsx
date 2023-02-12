import { Icon } from "@iconify/react";
import InitMap from "../../map";
// import { useDispatch } from "react-redux";
// import { ModalClose } from "../../redux/ModalReducer";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const Top = () => {
  // const navigate = useNavigate();
  return (
    <div className="ModalTop">
      <div className="ModalTitle">ConeShop</div>
      <Link to="/" className="CloseButton" >
        <Icon icon="mingcute:close-fill" color="white" width="30" />
      </Link>
    </div>
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

  const Payment = () => {
    return (
      <Fragment>
        <div className="Cone_List">Cone List</div>
        <section className="Payment_Section">
          <div className="Payment">Payment</div>
          <div className="PaymentBox"></div>
        </section>
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
