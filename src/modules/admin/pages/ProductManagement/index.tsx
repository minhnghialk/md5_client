/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Modal, Typography } from "@mui/material";
import ProductList from "../../components/ProductList";
import React from "react";
import CreateProductForm from "../../components/CreateProductForm";
import CreateCategoryForm from "../../components/CreateCategoryForm";

export default function ProductManagement() {
  const [openCreateForm, setOpenCreateForm] = React.useState(false);
  const [openCreateCategoryForm, setOpenCreateCategoryForm] =
    React.useState(false);

  const handleOpenCreateForm = () => {
    setOpenCreateForm(true);
  };

  const handleCloseCreateForm = () => {
    setOpenCreateForm(false);
  };

  const handleOpenCreateCategoryForm = () => {
    setOpenCreateCategoryForm(true);
  };

  const handleCloseCreateCategoryForm = () => {
    setOpenCreateCategoryForm(false);
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

      <ProductList />

      <Modal
        open={openCreateCategoryForm}
        onClose={handleCloseCreateCategoryForm}
      >
        <CreateCategoryForm />
      </Modal>

      <Modal open={openCreateForm} onClose={handleCloseCreateForm}>
        <CreateProductForm />
      </Modal>
    </Box>
  );
}
