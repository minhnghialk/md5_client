/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

import useGetCategoryData from "@modules/admin/hooks/useGetCategoryData";
// import apiService from "@services/apis";
// import axios from "axios";
import apis from "@/services/apis";

interface Picture {
  file: File;
  url: string;
}
export default function CreateProductForm() {
  const imgPreviewRef = React.useRef();

  const [avatarFile, setAvatarFile] = React.useState<File | null>(null);

  const [pictures, setPictures] = React.useState<Picture[]>([]);

  const { data: categoryList } = useGetCategoryData();

  const [categoryId, setCategoryId] = React.useState<string>("");

  React.useEffect(() => {
    if (categoryList.length > 0) {
      const firstCategory = categoryList[0];
      setCategoryId(firstCategory.id);
    }
  }, [categoryList]);

  const handleChange = (event: SelectChangeEvent) => {
    setCategoryId(event.target.value);
  };

  const handleAddProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    // formData.append("name", (e.target as any).name.value);
    // formData.append("des", (e.target as any).des.value);
    // formData.append("price", (e.target as any).price.value);
    // formData.append("categoryId", (e.target as any).categoryId.value);

    formData.append(
      "product",
      JSON.stringify({
        name: (e.target as any).name.value,
        des: (e.target as any).des.value,
        price: (e.target as any).price.value,
        categoryId: (e.target as any).categoryId.value,
      })
    );

    formData.append("avatar", avatarFile!);

    apis.productApi
      .create(formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    // pictures.forEach((picture) => {
    //   formData.append("imgs", picture.file);
    // });

    // apiService.productApi
    //   .create(formData)
    //   .then((res) => {
    //     window.alert("OK");
    //     console.log("res", res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    // apiService.productApi.create(formData);
  };

  const ContainerSx = {
    width: 500,
    height: "100%",
    overflowY: "auto",

    mx: "auto",
    px: "16px",

    bgcolor: "white",
  };

  const FormTitleSx = {
    fontSize: "24px",
    textAlign: "center",

    py: "24px",
  };

  return (
    <Box sx={ContainerSx}>
      <Typography variant="h2" sx={FormTitleSx}>
        Add new product
      </Typography>

      <Box
        component="form"
        onSubmit={(e) => {
          handleAddProduct(e);
        }}
      >
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="productCategory">Product Category</InputLabel>
          <Select
            labelId="productCategory"
            id="productCategorySelect"
            value={categoryId}
            onChange={handleChange}
            fullWidth
            required
            label="Product Category"
            name="categoryId"
          >
            {categoryList.map((item) => {
              return <MenuItem value={item.id}>{item.title}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <TextField
          margin="normal"
          required
          fullWidth
          id="productName"
          label="Product Name"
          name="name"
          autoFocus
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="productDescription"
          label="Product Description"
          name="des"
        />

        <TextField
          margin="normal"
          required
          fullWidth
          id="productPrice"
          label="Product Price"
          name="price"
        />

        <Box>
          <Typography mt="16px" mb="8px">
            Product Avatar:
          </Typography>
          <input
            name="imgs"
            type="file"
            onChange={(e) => {
              if (e.target.files) {
                if (e.target.files.length > 0) {
                  (imgPreviewRef.current! as HTMLImageElement).src =
                    URL.createObjectURL(e.target.files[0]);
                  setAvatarFile(e.target.files[0]);
                }
              }
            }}
          />
          <Box
            component="img"
            ref={imgPreviewRef}
            style={{ width: "100px", height: "100px", borderRadius: "50%" }}
          />
        </Box>
        <Box>
          {/* <Typography mt="16px" mb="8px">
            Product Pictures:
          </Typography>
          <input
            name="imgs"
            type="file"
            multiple
            onChange={(e) => {
              if (e.target.files) {
                if (e.target.files.length > 0) {
                  const tempPictures: Picture[] = [];
                  for (const i in e.target.files) {
                    if (i == "length") {
                      break;
                    }
                    tempPictures.push({
                      file: e.target.files[i],
                      url: URL.createObjectURL(e.target.files[i]),
                    });
                  }
                  setPictures(tempPictures);
                }
              }
            }}
          /> */}

          <Box>
            {pictures.map((picture) => (
              <Box
                key={picture.url}
                component="img"
                src={picture.url}
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              />
            ))}
          </Box>
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Add product
        </Button>
      </Box>
    </Box>
  );
}
