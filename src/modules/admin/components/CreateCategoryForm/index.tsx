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
import apis from "@/services/apis";

interface Picture {
  file: File;
  url: string;
}

interface Category {
  id: number;
  title: string;
  active: boolean;
  avatar: string;
}
export default function CreateCategoryForm() {
  const imgPreviewRef = React.useRef();

  const [avatarFile, setAvatarFile] = React.useState<File | null>(null);

  const [pictures, setPictures] = React.useState<Picture[]>([]);

  const { data: categoryList } = useGetCategoryData();

  const [categories, setCategories] = React.useState<Category[]>([]);

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

  const handleAddCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append(
      "category",
      JSON.stringify({
        title: (e.target as any).title.value,
      })
    );

    formData.append("avatar", avatarFile!);

    apis.categoryApi
      .create(formData)
      .then((res) => {
        console.log(res);
        setCategories(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const ContainerSx = {
    width: 500,
    height: 500,
    overflowY: "auto",

    mx: "auto",
    px: "16px",

    bgcolor: "white",

    marginTop: "65px",
  };

  const FormTitleSx = {
    fontSize: "24px",
    textAlign: "center",

    py: "24px",
  };

  return (
    <Box sx={ContainerSx}>
      <Typography variant="h2" sx={FormTitleSx}>
        Add new category
      </Typography>

      <Box
        component="form"
        onSubmit={(e) => {
          handleAddCategory(e);
        }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="categoryTitle"
          label="Category Title"
          name="title"
          autoFocus
        />

        <Box>
          <Typography mt="16px" mb="8px">
            Category Avatar:
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
          Add category
        </Button>

        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel id="productCategory">Product Categories</InputLabel>
          <Select
            key={categoryId}
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
      </Box>
    </Box>
  );
}
