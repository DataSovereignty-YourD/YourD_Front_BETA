import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { act } from "react-dom/test-utils";
const initialState = {
  ConeAssets: [],
  ExampleConeDistance: [],
  TotalCount: 0,
  TotalPrice: 0,
  SetConeTemp: [],
  ConePosition: [],
};

export const ConeAssetsValue = (state) => state.Cone.ConeAssets;
export const ExampleConeDistanceValue = (state) => state.Cone.ExampleConeDistance;
export const TotalCountValue = (state) => state.Cone.TotalCount;
export const TotalPriceValue = (state) => state.Cone.TotalPrice;
export const SetConeTempValue = (state)=> state.Cone.SetConeTemp;
export const ConePositionValue = (state)=> state.Cone.ConePosition;


export const ConeAssetsSlice = createSlice({
  name: "ConeAssets",
  initialState,
  reducers: {
    ReadDBAsset: (state,action)=> {
      // const asset = action.payload;
      // asset.map((index)=> {
      //   if (index.length !== 0) {
      //     state.ConeAssets.push(action.payload);}
      // })
      state.ConeAssets =state.ConeAssets.concat(action.payload);
      
    },
    ConeAssetsStore: (state,action) => {
      state.ConeAssets =state.ConeAssets.concat(state.ExampleConeDistance);
      state.ExampleConeDistance= [];
      state.TotalCount=0;
      state.TotalPrice=0;
      axios.post('http://localhost:3001/ConeUpdate', {Asset: state.ConeAssets,Account: action.payload});
    },
    ExamConeStore: (state, action) => {
      state.ExampleConeDistance.push(action.payload);
    },
    ExampleConeTotal: (state, action) => {
        state.TotalPrice= state.TotalPrice + action.payload;
        state.TotalCount++;
    },
    ExampleConeReset: (state) => {
        state.ExampleConeDistance= [];
        state.TotalCount=0;
        state.TotalPrice=0;
    },
    ExamConeRemove: (state, action) => {
        state.ExampleConeDistance.splice(action.payload.index,1);
        state.TotalCount--;
        state.TotalPrice= state.TotalPrice - action.payload.Price;
    },
    SetConeTemp: (state, action) => {
        state.SetConeTemp.push(action.payload.D);
    },
    TempConeReset: (state)=> {
      state.SetConeTemp = [];
    },
    ConePositionStore: (state, action)=> {
      state.ConePosition = action.payload;
    },
    UseCone: (state,action) => {
      state.ConeAssets = state.ConeAssets.filter(item1 => {
        return !state.SetConeTemp.some(item2 => item1.index === item2.index);
      })
      axios.post('http://localhost:3001/ConeUpdate', {Asset: state.ConeAssets,Account: action.payload});
      state.SetConeTemp= [];
      state.ConePosition = [];
    },
  },
});

export const {ConeAssetsStore,ExamConeStore,ExampleConeTotal,ExampleConeReset,ExamConeRemove, SetConeTemp,ConePositionStore,UseCone,TempConeReset,ReadDBAsset} = ConeAssetsSlice.actions;

export default ConeAssetsSlice.reducer;