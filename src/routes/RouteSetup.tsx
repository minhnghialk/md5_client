import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Lazy Function */
import Lazy from "../utils/lazies/Lazy";
import Home from "../modules/user/pages/homes/Home";
import AdminRoute from "./RouteAdmin";

export default function RouteSetup() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home - Navbar + Footer */}
        <Route path="/home" element={<Home />}>
          {/* <Route path="" element={}></Route> */}
        </Route>

        {/* User */}
        <Route
          path="register"
          element={Lazy(() => import("../modules/user/pages/users/Register"))()}
        ></Route>
        <Route
          path="login"
          element={Lazy(() => import("../modules/user/pages/users/Login"))()}
        ></Route>
        <Route
          path="reset-password"
          element={Lazy(
            () => import("../modules/user/pages/users/ResetPassword")
          )()}
        ></Route>
        <Route
          path="change-password"
          element={Lazy(
            () => import("../modules/user/pages/users/ChangePassword")
          )()}
        ></Route>
        <Route
          path="login/home"
          element={Lazy(() => import("../modules/user/pages/homes/Home"))()}
        ></Route>

        {/* Admin */}
        {AdminRoute}

        {/* Cart */}
        <Route
          path="cart"
          element={Lazy(() => import("../modules/user/pages/carts/Cart"))()}
        ></Route>
        <Route
          path="login/cart"
          element={Lazy(() => import("../modules/user/pages/carts/Cart"))()}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}
