import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ConeAssets: [],
  ExampleConeDistance: [],
  TotalCount: 0,
  TotalPrice: 0,
  SetConePosition: [],
};

export const ConeAssetsValue = (state) => state.Cone.ConeAssets;
export const ExampleConeDistanceValue = (state) => state.Cone.ExampleConeDistance;
export const TotalCountValue = (state) => state.Cone.TotalCount;
export const TotalPriceValue = (state) => state.Cone.TotalPrice;
export const SetConePositionValue = (state)=> state.Cone.SetConePosition;

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
    SetCone: (state, action) => {
        state.ConeAssets.splice(action.payload.index,1);
        state.SetConePosition.push(action.payload.D);
    }
  },
});

export const {ConeAssetsStore,ExamConeStore,ExampleConeTotal,ExampleConeReset,ExamConeRemove, SetCone} = ConeAssetsSlice.actions;

export default ConeAssetsSlice.reducer;