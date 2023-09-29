/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

enum UserRole {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

enum UserStatus {
  ACTIVE = "ACTIVE",
  BANNED = "BANNED",
  TEMPORARY_BAN = "TEMPORARY_BAN",
}

export interface User {
  id: string;
  avatar: string;
  email: string;
  emailAuthentication: boolean;
  firstName: string;
  lastName: string;
  userName: string;
  password: string;
  role: UserRole;
  status: UserStatus;
  createAt: string;
  updateAt: string;
}

interface UserState {
  data: User | null;
  reLoad: boolean;
  socket: null | Socket;
}

const initialState: UserState = {
  data: null,
  reLoad: false,
  socket: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setData: function (state, action) {
      // console.log("action.payload", action.payload);
      return {
        ...state,
        data: action.payload,
      };
    },
    setSocket: function (state, action) {
      return {
        ...state,
        socket: action.payload,
      };
    },
    reload: function (state) {
      return {
        ...state,
        reLoad: !state.reLoad,
      };
    },
  },
});

export const userAction = {
  ...userSlice.actions,
};

export const userReducer = userSlice.reducer;
