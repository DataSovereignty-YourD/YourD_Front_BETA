import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    account: "",
    adscid: "",
}

export const Account = (state) => state.Account.account;
export const AdsCid = (state) => state.Account.adscid;

export const AccountSlice = createSlice({
  name: "Account",
  initialState,
  reducers: {
    AccountStore: (state, action) => {
      state.account = action.payload;
    },
    AdsCidStore: (state, action) =>{
      state.adscid= action.payload;
    }
  },
});

export const {AccountStore,AdsCidStore} = AccountSlice.actions;
export default AccountSlice.reducer;