import { configureStore } from "@reduxjs/toolkit";
import AdsUploadReducer from "./AdsUploadReducer";
import CategoryReducer from "./CategoryReducer"
import ConeAssetsReducer from "./ConeAssetsReducer";

const store = configureStore({
    reducer: ({
        Category: CategoryReducer,
        Cone: ConeAssetsReducer,
        AdsUpload: AdsUploadReducer,
    }),
})

export default store;