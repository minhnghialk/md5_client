/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

export default {
    createGuestReceipt: async function(newGuestReceipt: any, guestReceiptDetailList: any) {
        return await axios.post(import.meta.env.VITE_SV_HOST + "purchase", {
            newGuestReceipt,
            guestReceiptDetailList
        })
    },
    findGuestReceipt: async function(data: {
        email: string;
        otp?: string;
    }) {
        const body: any = {
            guestEmail: data.email
        }
        if(data.otp) {
            body.otp = data.otp
        }
        return await axios.post(import.meta.env.VITE_SV_HOST + "purchase/order-history", body)
    },
    addOrder:async function(token:any,data:any) {
        return await axios.post(import.meta.env.VITE_SV_HOST + "purchase/create-order", {
            token,
            data
        })
    },
    getOrder:async function(token:any) {
        return await axios.post(import.meta.env.VITE_SV_HOST + "purchase/get-order", {
            token,

        })
    },

}