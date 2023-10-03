/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { useState } from "react";
import apis from "@/services/apis";
// import useGetProductData from "@modules/admin/hooks/useGetProductData";
import "./style.scss";
import EditProductDialog from "@modules/admin/components/EditProductForm/EditProductDialog";

interface Product {
  id: number;
  name: string;
  avatar: string;
  des: string;
  price: number;
}

interface Column {
  id: keyof Product;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (
    value: string | number,
    row: Product,
    onDelete: (productId: number) => void,
    onUpdate: (product: Product) => void
  ) => JSX.Element;
}

const columns: readonly Column[] = [
  { id: "id", label: "ID", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 170 },
  {
    id: "avatar",
    label: "Image",
    minWidth: 170,
    format: (value: string, row: Product) => (
      <img
        src={value}
        alt="Product Avatar"
        style={{ width: "100px", height: "100px" }}
      />
    ),
  },
  { id: "des", label: "Description", minWidth: 170 },
  { id: "price", label: "Price", minWidth: 170 },
  {
    id: "tools",
    label: "Tools",
    minWidth: 100,
    align: "center",
    format: (
      value: number,
      row: Product,
      onDelete: (productId: number) => void,
      onUpdate: (product: Product) => void
    ) => (
      <div className="toolsContainer">
        <button className="deleteButton" onClick={() => onDelete(row.id)}>
          Delete
        </button>
        <button className="updateButton" onClick={() => onUpdate(row)}>
          Update
        </button>
      </div>
    ),
  },
];

interface ProductListProps {
  onRowClick: (product: Product) => void;
}

export default function ProductList({ onRowClick }: ProductListProps) {
  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [productList, setProductList] = useState<Product[]>([]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    apis.productApi.findMany().then((res) => {
      if (res.status != 200) {
        alert(res.data.message);
      } else {
        // console.log(res.data.data);
        setProductList(res.data.data);
      }
    });
  }, []);

  const handleDeleteProduct = (productId: number) => {
    // Delete product logic

    // Fetch product data from APIs
    apis.productApi.deleteById(productId).then((res) => {
      if (res.status !== 200) {
        alert(res.data.message);
      } else {
        console.log(res.data.data);
        setProductList(res.data.data);
      }
    });

    // Remove the product from the list
    const updatedProductList = productList.filter(
      (product) => product.id !== productId
    );
    setProductList(updatedProductList);
  };

  const handleUpdateProduct = (product: Product) => {
    console.log("handleUpdateProduct", product);
    // setOpenEditForm(true)
    onRowClick(product);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(productList) &&
              productList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                      {columns.map((column) => {
                        if (column.id === "tools") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format &&
                              typeof column.format === "function"
                                ? column.format(
                                    row.id,
                                    row,
                                    handleDeleteProduct,
                                    handleUpdateProduct
                                  )
                                : null}
                            </TableCell>
                          );
                        } else {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "string"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={productList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
