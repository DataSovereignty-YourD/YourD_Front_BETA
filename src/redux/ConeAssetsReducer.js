import { createSlice } from "@reduxjs/toolkit";

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
    ConeAssetsStore: (state) => {
      state.ConeAssets =state.ConeAssets.concat(state.ExampleConeDistance);
      state.ExampleConeDistance= [];
      state.TotalCount=0;
      state.TotalPrice=0;
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
    UseCone: (state) => {
      state.ConeAssets = state.ConeAssets.filter(item1 => {
        return !state.SetConeTemp.some(item2 => item1.index === item2.index);
      })
      state.SetConeTemp= [];
      state.ConePosition = [];
    },
  },
});

export const {ConeAssetsStore,ExamConeStore,ExampleConeTotal,ExampleConeReset,ExamConeRemove, SetConeTemp,ConePositionStore,UseCone,TempConeReset} = ConeAssetsSlice.actions;

export default ConeAssetsSlice.reducer;