import { configureStore } from "@reduxjs/toolkit";
import AdsUploadReducer from "./AdsUploadReducer";
import ConeAssetsReducer from "./ConeAssetsReducer";

const store = configureStore({
    reducer: ({
        Cone: ConeAssetsReducer,
        AdsUpload: AdsUploadReducer,
    }),
})

export default store;