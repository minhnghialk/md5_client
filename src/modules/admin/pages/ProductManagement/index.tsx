/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Modal, Typography } from "@mui/material";
import ProductList from "../../components/ProductList";
import React from "react";
import CreateProductForm from "../../components/CreateProductForm";
import CreateCategoryForm from "../../components/CreateCategoryForm";
import EditProductForm from "../../components/EditProductForm";
import { Product } from "@/store/slices/product.slice";

export default function ProductManagement() {
  const [openCreateForm, setOpenCreateForm] = React.useState(false);
  const [openEditForm, setOpenEditForm] = React.useState(false);
  const [editProduct, setEditProduct] = React.useState<Product | null>(null);
  const [openCreateCategoryForm, setOpenCreateCategoryForm] =
    React.useState(false);

  const handleOpenCreateForm = () => {
    setOpenCreateForm(true);
  };

  const handleCloseCreateForm = () => {
    setOpenCreateForm(false);
  };

  const handleOpenEditForm = () => {
    setOpenEditForm(true);
  };

  const handleCloseEditForm = () => {
    setOpenEditForm(false);
  };

  const handleOpenCreateCategoryForm = () => {
    setOpenCreateCategoryForm(true);
  };

  const handleCloseCreateCategoryForm = () => {
    setOpenCreateCategoryForm(false);
  };

  const handleRowClick = (product: Product) => {
    setEditProduct(product);
    handleOpenEditForm();
  };

  const TitleSx = {
    fontSize: "32px",
    fontWeight: "bold",
  };

  const BtnCreateCategorySx = {
    borderRadius: "16px",
    my: "32px",
    marginRight: "10px",
  };

  const BtnCreateProductSx = {
    borderRadius: "16px",
    my: "32px",
  };

  return (
    <Box>
      <Typography variant="h1" sx={TitleSx}>
        Product Management
      </Typography>

      <Box sx={{ textAlign: "right" }}>
        <Button
          variant="outlined"
          sx={BtnCreateCategorySx}
          onClick={handleOpenCreateCategoryForm}
        >
          Create new category
        </Button>

        <Button
          variant="outlined"
          sx={BtnCreateProductSx}
          onClick={handleOpenCreateForm}
        >
          Create new product
        </Button>
      </Box>

      <ProductList onRowClick={handleRowClick} />

      <Modal
        open={openCreateCategoryForm}
        onClose={handleCloseCreateCategoryForm}
      >
        <CreateCategoryForm />
      </Modal>

      <Modal open={openCreateForm} onClose={handleCloseCreateForm}>
        <CreateProductForm />
      </Modal>

      {editProduct != null ? (
        <Modal open={openEditForm} onClose={handleCloseEditForm}>
          <EditProductForm product={editProduct} />
        </Modal>
      ) : null}
    </Box>
  );
}
