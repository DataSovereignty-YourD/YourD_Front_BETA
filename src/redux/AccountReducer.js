import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    account: "",
}

export const Account = (state) => state.Account.account;

export const AccountSlice = createSlice({
  name: "Account",
  initialState,
  reducers: {
    AccountStore: (state, action) => {
      state.account = action.payload;
    },
  },
});

export const {AccountStore} = AccountSlice.actions;
export default AccountSlice.reducer;