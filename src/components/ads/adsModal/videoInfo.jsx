import { Icon } from "@iconify/react";
import { Link  } from "react-router-dom";
import { StepVideoInfo } from "./addAdsStep";
import { AddAdsModalTop, DetailAdsView } from "./detail";

const VideoInfoBody = () => {
    return (
        <section className="DetailBody">
            <section className="DetailInput">
            <div className="DetailBodyTitle">Video Info</div>
            <section className="CategorySection">
                <div className="CategoryTitle">Category Settings</div>
            </section>
            </section>
            <DetailAdsView/>
        </section>
    )
}

const VideoInfo = () => {
    document.body.style = `overflow-y: hidden;`;
    return (
      <div className="Container">
        <div className="Background">
          <div className="Modal">
            <AddAdsModalTop />
            <div className="AddAds_Modal_body">
              <StepVideoInfo />
              <VideoInfoBody/>
            </div>
          </div>
        </div>
      </div>
    );
}

export default VideoInfo;