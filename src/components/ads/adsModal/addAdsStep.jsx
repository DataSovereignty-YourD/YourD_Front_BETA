import { ReactComponent as ColorCircle}from "../../../assets/colorCircle.svg";
import { ReactComponent as DefaultCircle} from "../../../assets/defaultCircle.svg";
import {ReactComponent as CollectCircle} from "../../../assets/collectCircle.svg";
export const StepDetail = () => {
    return (
      <section className="Modal_Step">
        <div className="Step_Box">
          <div className="Step_Title">Detail</div>
          <ColorCircle/>
        </div>
        <div className="Step_Box">
            <div className="Step_Line"/>
        </div>
        <div className="Step_Box">
          <div className="Step_Title">Video Info</div>
          <DefaultCircle/>
        </div>
        <div className="Step_Box">
            <div className="Step_Line"/>
        </div>
        <div className="Step_Box">
            <div className="Step_Title">Set Cone</div>
            <DefaultCircle/>
        </div>
        <div className="Step_Box">
            <div className="Step_Line"/>
        </div>
        <div className="Step_Box">
            <div className="Step_Title">Check</div>
            <DefaultCircle/>
        </div>
      </section>
    );
}

export const StepVideoInfo = () => {
  return (
    <section className="Modal_Step">
      <div className="Step_Box">
        <div className="Step_Title">Detail</div>
        <CollectCircle/>
      </div>
      <div className="Step_Box">
          <div className="Step_Line"/>
      </div>
      <div className="Step_Box">
        <div className="Step_Title">Video Info</div>
        <ColorCircle/>
      </div>
      <div className="Step_Box">
          <div className="Step_Line"/>
      </div>
      <div className="Step_Box">
          <div className="Step_Title">Set Cone</div>
          <DefaultCircle/>
      </div>
      <div className="Step_Box">
          <div className="Step_Line"/>
      </div>
      <div className="Step_Box">
          <div className="Step_Title">Check</div>
          <DefaultCircle/>
      </div>
    </section>
  );
}

export const StepSetCone = () => {
  return (
    <section className="Modal_Step">
      <div className="Step_Box">
        <div className="Step_Title">Detail</div>
        <CollectCircle/>
      </div>
      <div className="Step_Box">
          <div className="Step_Line"/>
      </div>
      <div className="Step_Box">
        <div className="Step_Title">Video Info</div>
        <CollectCircle/>
      </div>
      <div className="Step_Box">
          <div className="Step_Line"/>
      </div>
      <div className="Step_Box">
          <div className="Step_Title">Set Cone</div>
          <ColorCircle/>
      </div>
      <div className="Step_Box">
          <div className="Step_Line"/>
      </div>
      <div className="Step_Box">
          <div className="Step_Title">Check</div>
          <DefaultCircle/>
      </div>
    </section>
  );
}