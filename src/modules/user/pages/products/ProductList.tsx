/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import apis from "@/services/apis";
import { AppBar, Button, Container, Stack, Toolbar } from "@mui/material";
import ListIcon from "@mui/icons-material/List";
import { useSelector } from "react-redux";
import { StoreType } from "@/store";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

// Define the Product interface
interface Product {
  id: string;
  name: string;
  avatar: string;
  price: number;
  des: string;
  categoryId: string;
  productPictures: {
    id: string;
    path: string;
  }[];
}

export default function ColumnsGrid() {
  const [productList, setProductList] = React.useState<Product[]>([]);
  const [visibleProducts, setVisibleProducts] = React.useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = React.useState<number>(6);

  // Mock data for ProductList
  const ProductList: Product[] = [
    // Mock product data, replace with actual data from API
  ];

  const userStore = useSelector((store: StoreType) => {
    return store.userStore;
  });

  const handleLoadMore = () => {
    const newVisibleCount = visibleCount + 6;
    setVisibleCount(newVisibleCount);
    setVisibleProducts(ProductList.slice(0, newVisibleCount));
  };

  React.useEffect(() => {
    apis.productApi.findMany().then((res) => {
      if (res.status != 200) {
        alert(res.data.message);
      } else {
        console.log(res.data.data);
        setProductList(res.data.data);
        setVisibleProducts(res.data.data.slice(0, visibleCount));
      }
    });
  }, [visibleCount]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative">
        <Toolbar>
          <ListIcon sx={{ mr: 2 }} />
          <Typography variant="h6" color="inherit" noWrap>
            Products List
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          bgcolor: "background.paper",
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h1"
            variant="h2"
            align="center"
            color="text.primary"
            gutterBottom
          >
            New Arrivals
          </Typography>
          <Typography
            variant="h5"
            align="center"
            color="text.secondary"
            paragraph
          >
            <p>WHAT DOES ABSOLUT VODKA TASTE LIKE?</p>
            <br />
            <p>
              The ways to enjoy Absolut Vodka Original are almost as many as the
              number of times it is distilled – countless. Bring your friends or
              bring yourself. Mix with many or keep it neat. Add soda water,
              lime juice and a couple of lime slices to serve yourself the
              perfect Absolut Vodka Soda or pick any of the drinks below. This
              is One Superb Vodka, Born to Mix.
            </p>
          </Typography>
          <Stack
            sx={{ pt: 4 }}
            direction="row"
            spacing={2}
            justifyContent="center"
          >
            <Button variant="outlined">What's Trend?</Button>
          </Stack>
        </Container>
      </Box>
      <Grid container spacing={3}>
        {visibleProducts.map((product: Product) => (
          <Grid item xs={4} key={product.id}>
            <Item>
              <ButtonBase sx={{ width: 128, height: 128 }}>
                <Img alt="Product" src={product.avatar} />
              </ButtonBase>
              <Typography gutterBottom variant="subtitle1" component="div">
                {product.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {product.des}
              </Typography>
              <Typography variant="subtitle1" component="div">
                ${product.price.toFixed(2)}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  if (userStore.socket) {
                    console.log("Add to cart - userStore", userStore);

                    // false '' null undefined 0 // falsy
                    // true 'asdf' {} [] 1 // truethy
                    const receiptDetails = userStore.cart?.detail || [];

                    const receiptDetailByProductId = receiptDetails.find(
                      (receiptDetail) => receiptDetail.productId === product.id
                    );

                    const currentQuantity =
                      receiptDetailByProductId?.quantity || 0;
                    console.log("currentQuantity", currentQuantity);

                    const newQuantity = currentQuantity + 1;
                    console.log("newQuantity", newQuantity);

                    const data = {
                      receiptId: userStore.cart?.id,
                      productId: product.id,
                      quantity: newQuantity,
                    };

                    console.log("Add to cart - data", data);

                    userStore.socket.emit("addToCart", data);
                  }
                }}
              >
                Add to cart
              </Button>
            </Item>
          </Grid>
        ))}
      </Grid>
      <button
        onClick={handleLoadMore}
        style={{
          border: "1px solid rgba(25, 118, 210, 0.5)",
          color: "#1976d2",
          width: "140px",
          height: "40px",
          margin: "5% 45%",
          borderRadius: "5px",
        }}
      >
        LOAD MORE
        <span> &gt;&gt;</span>
      </button>
    </Box>
  );
}

// import * as React from "react";
// import { styled } from "@mui/material/styles";
// import Grid from "@mui/material/Grid";
// import Paper from "@mui/material/Paper";
// import Typography from "@mui/material/Typography";
// import ButtonBase from "@mui/material/ButtonBase";

// const Img = styled("img")({
//   margin: "auto",
//   display: "block",
//   maxWidth: "100%",
//   maxHeight: "100%",
// });

// export default function ComplexGrid() {
//   return (
//     <Paper
//       sx={{
//         p: 2,
//         margin: "auto",
//         maxWidth: 500,
//         maxHeight: 500,
//         flexGrow: 1,
//         backgroundColor: (theme) =>
//           theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//       }}
//     >
//       <Grid container spacing={2}>
//         <Grid item>
//           <ButtonBase sx={{ width: 128, height: 128 }}>
//             <Img
//               alt="complex"
//               src="https://www.absolut.com/wp-content/uploads/8-absolut-100_1000ml.jpg"
//             />
//           </ButtonBase>
//         </Grid>
//         <Grid item xs={12} sm container>
//           <Grid item xs container direction="column" spacing={2}>
//             <Grid item xs>
//               <Typography gutterBottom variant="subtitle1" component="div">
//                 Standard license
//               </Typography>
//               <Typography variant="body2" gutterBottom>
//                 Full resolution 1920x1080 • JPEG
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 ID: 1030114
//               </Typography>
//             </Grid>
//             <Grid item>
//               <Typography sx={{ cursor: "pointer" }} variant="body2">
//                 Remove
//               </Typography>
//             </Grid>
//           </Grid>
//           <Grid item>
//             <Typography variant="subtitle1" component="div">
//               $19.00
//             </Typography>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Paper>
//   );
// }

// import * as React from "react";
// import { styled } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
// import Grid from "@mui/material/Grid";
// import Card from "@mui/material/Card";
// import CardContent from "@mui/material/CardContent";
// import CardMedia from "@mui/material/CardMedia";
// import Typography from "@mui/material/Typography";
// import { Button, CardActionArea, CardActions } from "@mui/material";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

// function FormRow() {
//   return (
//     <React.Fragment>
//       <Grid item xs={4}>
//         <Item>
//           <Card sx={{ maxWidth: 345 }}>
//             <CardActionArea>
//               <CardMedia
//                 component="img"
//                 height="140"
//                 image="https://www.absolut.com/wp-content/uploads/8-absolut-100_1000ml.jpg"
//                 alt="green iguana"
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   Lizard
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Lizards are a widespread group of squamate reptiles, with over
//                   6,000 species, ranging across all continents except Antarctica
//                 </Typography>
//               </CardContent>
//             </CardActionArea>
//             <CardActions>
//               <Button size="small" color="primary">
//                 Share
//               </Button>
//             </CardActions>
//           </Card>
//         </Item>
//       </Grid>
//       <Grid item xs={4}>
//         <Item>
//           <Card sx={{ maxWidth: 345 }}>
//             <CardActionArea>
//               <CardMedia
//                 component="img"
//                 height="140"
//                 image="https://www.absolut.com/wp-content/uploads/8-absolut-100_1000ml.jpg"
//                 alt="green iguana"
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   Lizard
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Lizards are a widespread group of squamate reptiles, with over
//                   6,000 species, ranging across all continents except Antarctica
//                 </Typography>
//               </CardContent>
//             </CardActionArea>
//             <CardActions>
//               <Button size="small" color="primary">
//                 Share
//               </Button>
//             </CardActions>
//           </Card>
//         </Item>
//       </Grid>
//       <Grid item xs={4}>
//         <Item>
//           <Card sx={{ maxWidth: 345 }}>
//             <CardActionArea>
//               <CardMedia
//                 component="img"
//                 height="140"
//                 image="https://www.absolut.com/wp-content/uploads/8-absolut-100_1000ml.jpg"
//                 alt="green iguana"
//               />
//               <CardContent>
//                 <Typography gutterBottom variant="h5" component="div">
//                   Lizard
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary">
//                   Lizards are a widespread group of squamate reptiles, with over
//                   6,000 species, ranging across all continents except Antarctica
//                 </Typography>
//               </CardContent>
//             </CardActionArea>
//             <CardActions>
//               <Button size="small" color="primary">
//                 Share
//               </Button>
//             </CardActions>
//           </Card>
//         </Item>
//       </Grid>
//     </React.Fragment>
//   );
// }

// export default function NestedGrid() {
//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <Grid container spacing={1}>
//         <Grid container item spacing={3}>
//           <FormRow />
//         </Grid>
//         <Grid container item spacing={3}>
//           <FormRow />
//         </Grid>
//         <Grid container item spacing={3}>
//           <FormRow />
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }

// import * as React from "react";
// import { styled } from "@mui/material/styles";
// import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
// import Grid from "@mui/material/Grid";
// import Typography from "@mui/material/Typography";
// import ButtonBase from "@mui/material/ButtonBase";
// import apis from "@/services/apis";
// import { AppBar, Button, Container, Stack, Toolbar } from "@mui/material";
// import ListIcon from "@mui/icons-material/List";

// const Img = styled("img")({
//   margin: "auto",
//   display: "block",
//   maxWidth: "100%",
//   maxHeight: "100%",
// });

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

// // Define the Product interface
// interface Product {
//   id: string;
//   name: string;
//   avatar: string;
//   price: number;
//   des: string;
//   categoryId: string;
//   productPictures: {
//     id: string;
//     path: string;
//   }[];
// }

// export default function ColumnsGrid() {
//   const [productList, setProductList] = React.useState<Product[]>([]);
//   const [visibleProducts, setVisibleProducts] = React.useState<Product[]>([]);
//   const [visibleCount, setVisibleCount] = React.useState<number>(3);

//   // Mock data for ProductList
//   const ProductList: Product[] = [
//     // Mock product data, replace with actual data from API
//   ];

//   const handleLoadMore = () => {
//     const newVisibleCount = visibleCount + 3;
//     setVisibleCount(newVisibleCount);
//     setVisibleProducts(ProductList.slice(0, newVisibleCount));
//   };

//   React.useEffect(() => {
//     apis.productApi.findMany().then((res) => {
//       if (res.status != 200) {
//         alert(res.data.message);
//       } else {
//         console.log(res.data.data);
//         setProductList(res.data.data);
//         setVisibleProducts(res.data.data.slice(0, visibleCount));
//       }
//     });
//   }, [visibleCount]);

//   return (
//     <Box sx={{ flexGrow: 1 }}>
//       <AppBar position="relative">
//         <Toolbar>
//           <ListIcon sx={{ mr: 2 }} />
//           <Typography variant="h6" color="inherit" noWrap>
//             Products List
//           </Typography>
//         </Toolbar>
//       </AppBar>

//       <Box
//         sx={{
//           bgcolor: "background.paper",
//           pt: 8,
//           pb: 6,
//         }}
//       >
//         <Container maxWidth="sm">
//           <Typography
//             component="h1"
//             variant="h2"
//             align="center"
//             color="text.primary"
//             gutterBottom
//           >
//             New Arrivals
//           </Typography>
//           <Typography
//             variant="h5"
//             align="center"
//             color="text.secondary"
//             paragraph
//           >
//             Something short and leading about the collection below—its contents,
//             the creator, etc. Make it short and sweet, but not too short so
//             folks don&apos;t simply skip over it entirely.
//           </Typography>
//           <Stack
//             sx={{ pt: 4 }}
//             direction="row"
//             spacing={2}
//             justifyContent="center"
//           >
//             <Button variant="outlined">What's Trend?</Button>
//           </Stack>
//         </Container>
//       </Box>

//       <Grid container spacing={3}>
//         {visibleProducts.map((product: Product) => (
//           <Grid item xs={4} key={product.id}>
//             <Item>
//               <ButtonBase sx={{ width: 128, height: 128 }}>
//                 <Img alt="Product" src={product.avatar} />
//               </ButtonBase>
//               <Typography gutterBottom variant="subtitle1" component="div">
//                 {product.name}
//               </Typography>
//               <Typography variant="body2" gutterBottom>
//                 {product.des}
//               </Typography>
//               <Typography variant="subtitle1" component="div">
//                 ${product.price.toFixed(2)}
//               </Typography>
//             </Item>
//           </Grid>
//         ))}
//       </Grid>
//       <button
//         onClick={handleLoadMore}
//         style={{
//           border: "1px solid black",
//           width: "140px",
//           height: "40px",
//           margin: "5% 45%",
//           borderRadius: "5px",
//         }}
//       >
//         Load more
//       </button>
//     </Box>
//   );
// }
