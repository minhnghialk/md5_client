/* eslint-disable @typescript-eslint/no-unused-vars */
import "./cart.scss";
import { useSelector } from "react-redux";
import { StoreType } from "@/store";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

export default function Cart() {
  const userStore = useSelector((store: StoreType) => {
    return store.userStore;
  });

  console.log("userStore", userStore);

  const receiptDetails = userStore?.cart?.detail || [];

  return (
    <>
      <h1>Your cart</h1>

      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Image</th>
            <th>Product Price</th>
            <th>Product Quantity</th>
            <th>Tools</th>
          </tr>
        </thead>

        <tbody>
          {receiptDetails.map((item) => {
            return (
              <tr key={item.id}>
                <td>{item.product.name}</td>
                <td>
                  <img
                    src={item.product.avatar}
                    style={{
                      width: "100px",
                      height: "100px",
                      borderRadius: "50%",
                    }}
                  />
                </td>
                <td>{item.product.price}</td>
                <td>
                  <span>
                    <button>
                      <RemoveIcon />
                    </button>
                  </span>
                  {item.quantity}
                  <span>
                    <button>
                      <AddIcon />
                    </button>
                  </span>
                </td>
                <td>
                  <DeleteOutlineIcon />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div style={{ textAlign: "center", marginTop: "15px" }}>
        <select>
          <option value="CASH">CASH</option>
          <option disabled value="ZALO">
            Zalo
          </option>
        </select>

        <button style={{ width: "100px", height: "50px", marginLeft: "15px" }}>
          Order
        </button>
      </div>
    </>
  );
}
