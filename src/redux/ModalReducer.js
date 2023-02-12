import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    ModalSwitch: 0
};

export const ModalSwitchValue = (state) => state.Modal.ModalSwitch;

export const ModalSlice = createSlice({
    name: 'ModalToggle',
    initialState,
    reducers: {
        ModalClose: (state) => {
            state.ModalSwitch=0;
        },
        ConeShopModalOpen: (state) => {
            state.ModalSwitch=1;
        },
        AddAdsModalOpen: (state) => {
            state.ModalSwitch=2;
        }
    },
})

export const {ModalClose, ConeShopModalOpen, AddAdsModalOpen} = ModalSlice.actions;


export default ModalSlice.reducer;