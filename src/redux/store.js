import { configureStore } from "@reduxjs/toolkit";
import ModalReducer from "./ModalReducer";
import CategoryReducer from "./CategoryReducer"
import ConeAssetsReducer from "./ConeAssetsReducer";

const store = configureStore({
    reducer: ({
        Modal: ModalReducer,
        Category: CategoryReducer,
        Cone: ConeAssetsReducer,
    }),
})

export default store;