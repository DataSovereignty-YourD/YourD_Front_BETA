import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    CategorySelect: []
};

export const CategorySelectValue = (state) => state.Category.CategorySelect;

export const CategorySlice = createSlice({
    name: 'CategorySelect',
    initialState,
    reducers: {
        Categorydatastore: (state, action) => {
            state.CategorySelect= action.payload;
        },
        // CategorydataDelete: (state,action) => {
        //     const newCategory = state.CategorySelect.filter((cate) => cate !== "action")
        // }
    }
})

export const {Categorydatastore} = CategorySlice.actions;

export default CategorySlice.reducer;