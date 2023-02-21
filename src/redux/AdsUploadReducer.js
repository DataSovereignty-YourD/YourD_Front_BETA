import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    adsfile: [],
    info: [{
        title:"",
        description: "",
    }],
    CategorySelect: [],
    TokenDeposit: 0,
    AdsReward: 0,
}

export const fileInfo = (state) => state.AdsUpload.adsfile;
export const infoValue = (state) => state.AdsUpload.info;
export const CategorySelectValue = (state) => state.AdsUpload.CategorySelect;
export const TokenDepositValue = (state) => state.AdsUpload.TokenDeposit;
export const AdsRewardValue = (state) => state.AdsUpload.AdsReward;

export const AdsUploadSlice = createSlice({
    name: 'Upload',
    initialState,
    reducers: {
        fileUpload: (state, action) => {
            state.adsfile= action.payload;
        },
        detailinfo: (state, action )=> {
            state.info = [action.payload];
        },
        Categorydatastore: (state, action) => {
            state.CategorySelect= action.payload;
        },
        DepositValue: (state, action)=> {
            state.TokenDeposit = action.payload;
        },
        AdsRewardStore: (state, action)=> {
            state.AdsReward = action.payload;
        },
    }
})

export const {fileUpload, detailinfo, Categorydatastore,DepositValue,AdsRewardStore} = AdsUploadSlice.actions;
export default AdsUploadSlice.reducer;