import { configureStore } from "@reduxjs/toolkit";
import CategoryReducer from "./CategoryReducer"
import ConeAssetsReducer from "./ConeAssetsReducer";

const store = configureStore({
    reducer: ({
        Category: CategoryReducer,
        Cone: ConeAssetsReducer,
    }),
})

export default store;