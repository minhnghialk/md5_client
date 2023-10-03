/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "./App.css";
import RouteSetup from "./routes/RouteSetup";
import { useSelector, useDispatch } from "react-redux";
import { StoreType } from "./store";
import { useEffect } from "react";
import { Receipt, User, userAction } from "./store/slices/user.slice";
import { Socket, io } from "socket.io-client";

function App() {
  const dispatch = useDispatch();

  const userStore = useSelector((store: StoreType) => {
    return store.userStore;
  });

  // /* Check Token */
  // useEffect(() => {
  //   axios
  //     .post("http://127.0.0.1:3000/api/v1/authentication", {
  //       token: localStorage.getItem("token"),
  //     })
  //     .then((res) => {
  //       console.log("res", res);
  //       if (res.status === 200) {
  //         dispatch(userAction.setData(res.data));
  //       } else {
  //         localStorage.removeItem("token");
  //       }
  //     })
  //     .catch((_err) => localStorage.removeItem("token"));
  // }, []);

  useEffect(() => {
    if (!userStore.data) {
      const token = localStorage.getItem("token");
      if (token) {
        const socket: Socket = io("http://localhost:3001", {
          query: {
            token,
          },
        });

        socket.on(
          "connectStatus",
          (data: { status: boolean; message: string }) => {
            if (data.status) {
              console.log(data.message);
            } else {
              console.log(data.message);
              // localStorage.removeItem("token");
            }
          }
        );

        socket.on("disconnect", () => {
          dispatch(userAction.setData(null));
          console.log("Đã out");
        });

        socket.on("receiveUserData", (user: User) => {
          console.log("receiveUserData", user);

          dispatch(userAction.setData(user));
        });

        socket.on("receiveReceipt", (receipts: Receipt[]) => {
          console.log("receiveReceipt", receipts);
          dispatch(userAction.setReceipt(receipts));
        });

        socket.on("receiveCart", (cart: Receipt) => {
          console.log("onInitCart - receiveCart", cart);
          dispatch(userAction.setCart(cart));
        });

        socket.on("onUpdateCart", (cart: Receipt) => {
          console.log("onUpdateCart", cart);
          dispatch(userAction.setCart(cart));
          console.log("onUpdateCart cart.detail", cart.detail?.[0]?.quantity);

          // alert(`Your cart has been updated`);
        });

        dispatch(userAction.setSocket(socket));
      }
    }
  }, [userStore.reLoad]);

  useEffect(() => {
    console.log("userData", userStore.data);
  }, [userStore.data]);

  useEffect(() => {
    console.log("userDataCart", userStore.cart);
  }, [userStore.cart]);

  return (
    <>
      {/* Routing */}
      <RouteSetup />
    </>
  );
}

export default App;
