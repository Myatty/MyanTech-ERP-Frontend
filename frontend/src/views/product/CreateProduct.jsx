import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Grid,
  Typography,
  Divider,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import { createProduct, fetchProducts } from "../../actions/productActions";

const CreateProduct = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.products);

  const [productData, setProductData] = useState({
    name: "",
    category: "",
    brand: "",
    price: "",
    serial_number: "",
    stock_quantity: "",
    product_segment: "",
  });

  const [openToast, setOpenToast] = useState(false);

  const categories = ["Electronics", "Laptops", "Phones", "Accessories"];
  const brands = ["Apple", "Samsung", "HP", "Dell", "Sony"];

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await dispatch(createProduct(productData));

    if (success) {
      setOpenToast(true); // Show success toast
      dispatch(fetchProducts()); // Update product list
      setProductData({
        name: "",
        category: "",
        brand: "",
        price: "",
        serial_number: "",
        stock_quantity: "",
        product_segment: "",
      }); // Reset form
    }
  };

  return (
    <PageContainer title="Create Product" description="Add a new product">
      <Box
        sx={{
          maxWidth: "1200px",
          margin: "auto",
          padding: "40px",
          borderRadius: "12px",
          boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Create New Product
        </Typography>
        <Divider sx={{ mb: 3 }} />

        {error && (
          <Typography color="error" textAlign="center" mb={2}>
            {error}
          </Typography>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Name *"
                name="name"
                value={productData.name}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Category *"
                name="category"
                value={productData.category}
                onChange={handleChange}
                required
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                select
                fullWidth
                label="Brand *"
                name="brand"
                value={productData.brand}
                onChange={handleChange}
                required
              >
                {brands.map((brand) => (
                  <MenuItem key={brand} value={brand}>
                    {brand}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Price *"
                name="price"
                type="number"
                value={productData.price}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Serial Number"
                name="serial_number"
                value={productData.serial_number}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Stock Quantity *"
                name="stock_quantity"
                type="number"
                value={productData.stock_quantity}
                onChange={handleChange}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Product Segment"
                name="product_segment"
                value={productData.product_segment}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between" mt={3}>
                <Button
                  variant="outlined"
                  color="secondary"
                  sx={{
                    borderRadius: "8px",
                    padding: "10px 20px",
                    "&:hover": { background: "#f5f5f5" },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    borderRadius: "8px",
                    padding: "10px 20px",
                    background: "#4A90E2",
                    "&:hover": { background: "#357ABD" },
                  }}
                  disabled={loading}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: "#fff" }} />
                  ) : (
                    "Create Product"
                  )}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>

      <Snackbar
        open={openToast}
        autoHideDuration={3000}
        onClose={() => setOpenToast(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenToast(false)}
          severity="success"
          sx={{
            width: "100%",
            backgroundColor: "#4A90E2", // Custom Background (Blue)
            color: "#fff", // White Text
            fontWeight: "bold", // Make Text Bold
            borderRadius: "8px",
          }}
        >
          Product created successfully!
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default CreateProduct;
