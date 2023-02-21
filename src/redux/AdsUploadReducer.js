import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    adsfile: [],
    info: [{
        title:"",
        description: "",
    }],
}

export const fileInfo = (state) => state.AdsUpload.adsfile;
export const infoValue = (state) => state.AdsUpload.info;

export const AdsUploadSlice = createSlice({
    name: 'Upload',
    initialState,
    reducers: {
        fileUpload: (state, action) => {
            state.adsfile= action.payload;
        },
        detailinfo: (state, action )=> {
            state.info = [action.payload];
        }
    }
})


export const {fileUpload, detailinfo} = AdsUploadSlice.actions;
export default AdsUploadSlice.reducer;