/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";
import { Product } from "./product.slice";

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

enum ReceiptStatus {
  SHOPPING = "SHOPPING",
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  SHIPPING = "SHIPPING",
  DONE = "DONE",
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

export interface Guest {
  id: string;
  name: string;
  numberPhone: string;
  email: string;
  receipts: Receipt[];
}

export interface ReceiptDetail {
  id: string;
  receiptId: string;
  productId: string;
  product: Product;
  receipt: Receipt;
  quantity: number;
  name: string;
}

export interface Receipt {
  id: string;
  userId: string;
  guestId: string;
  user: User;
  guest: Guest;
  total: number;
  status: ReceiptStatus;
  createAt: string;
  acceptedAt: string;
  shipAt: string;
  doneAt: string;
  detail: ReceiptDetail[];
}

export interface UserState {
  data: User | null;
  reLoad: boolean;
  socket: null | Socket;
  receipts: null | Receipt[];
  cart: null | Receipt;
}

export const initialState: UserState = {
  data: null,
  reLoad: false,
  socket: null,
  receipts: null,
  cart: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setData: function (state, action) {
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
    setReceipt: function (state, action) {
      return {
        ...state,
        receipts: action.payload,
      };
    },
    setCart: function (state, action) {
      return {
        ...state,
        cart: action.payload,
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
