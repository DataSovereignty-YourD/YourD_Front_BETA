import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ConeAssets: 
    [],
};

export const ConeAssetsValue = (state) => state.Cone.ConeAssets;

export const ConeAssetsSlice = createSlice({
    name: 'ConeAssets',
    initialState,
    reducers: {
        ConeAssetsStore: (state, action) => {
            state.ConeAssets= action.payload;
        },
        
    }
})

export const {ConeAssetsStore} = ConeAssetsSlice.actions;

export default ConeAssetsSlice.reducer;