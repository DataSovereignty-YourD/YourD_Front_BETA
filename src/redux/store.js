import { configureStore } from "@reduxjs/toolkit";
import ModalReducer from "./ModalReducer";
import CategoryReducer from "./CategoryReducer"

const store = configureStore({
    reducer: ({
        Modal: ModalReducer,
        Category: CategoryReducer,
    }),
})

export default store;