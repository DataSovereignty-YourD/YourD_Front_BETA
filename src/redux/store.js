import { configureStore } from "@reduxjs/toolkit";
import AccountReducer from "./AccountReducer";
import AdsUploadReducer from "./AdsUploadReducer";
import ConeAssetsReducer from "./ConeAssetsReducer";

const store = configureStore({
    reducer: ({
        Cone: ConeAssetsReducer,
        AdsUpload: AdsUploadReducer,
        Account: AccountReducer,
    }),
})

export default store;