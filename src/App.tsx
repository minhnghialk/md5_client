/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import "./App.css";
import RouteSetup from "./routes/RouteSetup";
import { useSelector, useDispatch } from "react-redux";
import { StoreType } from "./store";
import { useEffect } from "react";
import axios from "axios";
import { User, userAction } from "./store/slices/user.slice";
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
            }
          }
        );

        socket.on("disconnect", () => {
          dispatch(userAction.setData(null));
          console.log("Đã out");
        });

        socket.on("receiveUserData", (user: User) => {
          dispatch(userAction.setData(user));
        });
        dispatch(userAction.setSocket(socket));
      }
    }
  }, [userStore.reLoad]);

  useEffect(() => {
    console.log("userData", userStore.data);
  }, [userStore.data]);

  return (
    <>
      <h1>Hello</h1>
      {/* Routing */}
      <RouteSetup />
    </>
  );
}

export default App;
