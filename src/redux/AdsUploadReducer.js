import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    filetitle: "",
    adsfile: [],
    info: [{
        title:"",
        description: "",
    }],
    CategorySelect: [],
    AdsReward: 0,
    Cone: [],
    ConePosition: [],
    TokenDeposit: 0,
}

export const fileInfo = (state) => state.AdsUpload.adsfile;
export const infoValue = (state) => state.AdsUpload.info;
export const CategorySelectValue = (state) => state.AdsUpload.CategorySelect;
export const TokenDepositValue = (state) => state.AdsUpload.TokenDeposit;
export const AdsRewardValue = (state) => state.AdsUpload.AdsReward;
export const Cone = (state)=> state.AdsUpload.Cone;
export const ConePosition = (state)=> state.AdsUpload.ConePosition;
export const fileTitle = (state) => state.AdsUpload.filetitle;
export const AdsUploadSlice = createSlice({
    name: 'Upload',
    initialState,
    reducers: {
        fileTitleStore: (state,action) => {
            state.filetitle = action.payload;
        },
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
        ModalCloseAction: (state) => {
            state.adsfile = [];
            state.info = [{
                title:"",
                description: "",
            }];
            state.CategorySelect= [];
            state.TokenDeposit = 0;
            state.AdsReward = 0;
        },
        AdsUpload: (state, action) => {
            state.ConePosition = [action.payload[0]];
            state.Cone = [action.payload[1]];
            state.CategorySelect= [];
            state.TokenDeposit = 0;
            state.AdsReward = 0;
            state.info = [{
                title:"",
                description: "",
            }];
        },
    },
    serialize: false,
})

export const {fileUpload, detailinfo, Categorydatastore,DepositValue,AdsRewardStore,AdsUpload,ModalCloseAction,fileTitleStore} = AdsUploadSlice.actions;
export default AdsUploadSlice.reducer;