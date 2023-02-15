import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ConeAssets: [],
  ExampleConeDistance: [],
  ExampleConeCount: [],
};

export const ConeAssetsValue = (state) => state.Cone.ConeAssets;
export const ExampleConeDistanceValue = (state) => state.Cone.ExampleConeDistance;
export const ExampleConeCountValue = (state) => state.Cone.ExampleConeCount;

export const ConeAssetsSlice = createSlice({
  name: "ConeAssets",
  initialState,
  reducers: {
    ConeAssetsStore: (state, action) => {
      state.ConeAssets = action.payload;
    },
    ExamConeStore: (state, action1) => {
      state.ExampleConeDistance.push(action1.payload);
    },
  },
});

export const {ConeAssetsStore,ExamConeStore} = ConeAssetsSlice.actions;

export default ConeAssetsSlice.reducer;