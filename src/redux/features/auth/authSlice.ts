/* eslint-disable @typescript-eslint/no-explicit-any */
import { RootStateType } from "@/redux/store";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Auth } from "./type";

const initialState: Auth = {
  user: {},
  token: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: () => initialState,
    setAuthUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setToken: (state, action: PayloadAction<any>) => {
      state.token = action.payload;
    },
  },
});

export const { setAuthUser, setToken } = authSlice.actions;
export const resetAuth = authSlice.actions.reset;

export const authSliceReducer = authSlice.reducer;

export const selectUser = (state: RootStateType) => state.auth.user;
