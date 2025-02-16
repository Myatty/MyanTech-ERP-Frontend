import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import axios from "axios";
const apiUrl = import.meta.env.VITE_APP_API_URL;

const DialogBox = ({ open, setOpen, onProductCreated }) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    brand: "",
    price: "",
    serial_number: "",
    stock_quantity: "",
    product_segment: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // create new product
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/api/products`, formData);
      setOpen(false);
      onProductCreated();
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Create New Product</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", p: 4 }}>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            sx={{ mb: 2, width: 300 }}
          />
          <TextField
            name="category"
            label="Category"
            value={formData.category}
            onChange={handleChange}
            sx={{ mb: 2, width: 300 }}
          />
          <TextField
            name="brand"
            label="Brand"
            value={formData.brand}
            onChange={handleChange}
            sx={{ mb: 2, width: 300 }}
          />
          <TextField
            name="price"
            label="Price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            sx={{ mb: 2, width: 300 }}
          />
          <TextField
            name="serial_number"
            label="Serial Number"
            value={formData.serial_number}
            onChange={handleChange}
            sx={{ mb: 2, width: 300 }}
          />
          <TextField
            name="stock_quantity"
            label="Stock Quantity"
            type="number"
            value={formData.stock_quantity}
            onChange={handleChange}
            sx={{ mb: 2, width: 300 }}
          />
          <TextField
            name="product_segment"
            label="Product Segment"
            value={formData.product_segment}
            onChange={handleChange}
            sx={{ mb: 2, width: 300 }}
          />
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              Create
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DialogBox;
