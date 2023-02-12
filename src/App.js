import { Route, Router, Routes,useLocation } from 'react-router-dom';
import Main from './pages/main';
import ConeShopModal from './components/cone/coneShop';
import AdsUpload from './components/ads/adsModal/adsUpload';
import Detail from './components/ads/adsModal/detail';
import VideoInfo from './components/ads/adsModal/videoInfo';
function App() {
  const location = useLocation();
  const background = location.state && location.state.background;
  return (
    <>
      <Routes location={background || location}>
        <Route path="/" element={<Main />}>
          <Route exact path="ConeShopModal" element={<ConeShopModal />} />
          <Route exact path="AdsUploadModal" element={<AdsUpload />} />
          <Route path="Detail" element={<Detail />} />
          <Route path="VideoInfo" element={<VideoInfo />} />
        </Route>
      </Routes>

      {background && (
        <Routes>
          <Route path="ConeShopModal" element={<ConeShopModal />} />
          <Route path="AdsUploadModal" element={<AdsUpload />} />
          <Route path="Detail" element={<Detail />} />
          <Route path="VideoInfo" element={<VideoInfo />} />
        </Routes>
      )}
    </>
  );
}

export default App;
