import { configureStore } from "@reduxjs/toolkit";
import ModalReducer from "./ModalReducer";


const store = configureStore({
    reducer: ({
        Modal: ModalReducer,
    }),
})

export default store;