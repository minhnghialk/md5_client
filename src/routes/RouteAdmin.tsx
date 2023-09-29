import Lazy from "../utils/lazies/Lazy";
import { Route } from "react-router-dom";

const Dashboard = Lazy(() => import("../modules/admin/pages/Dashboard"))();
const ProductManagement = Lazy(
  () => import("../modules/admin/pages/ProductManagement")
)();
const OrderManagement = Lazy(
  () => import("../modules/admin/pages/OrderManagement")
)();
const UserManagement = Lazy(
  () => import("../modules/admin/pages/UserManagement")
)();

export default (
  <Route path="/admin" element={Dashboard}>
    <Route index element={ProductManagement} />

    <Route path="products" element={ProductManagement} />
    <Route path="orders" element={OrderManagement} />
    <Route path="users" element={UserManagement} />
  </Route>
);
