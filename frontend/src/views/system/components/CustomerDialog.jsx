import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import axios from "axios";
const apiUrl = import.meta.env.VITE_APP_API_URL;

import { fetchCustomers } from "../../../actions/customerActions";

const CustomerDialog = ({ open, setOpen }) => {
  const dispatch = useDispatch();

  const [customerData, setCustomerData] = useState({
    name: "",
    contact_number1: "",
    contact_number2: "",
    email: "",
    address: "",
    township: "",
    region: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/api/customers`, customerData);
      setOpen(false);
      dispatch(fetchCustomers());
    } catch (error) {
      console.error("Error creating customer:", error);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.25rem" }}>
        Create New Customer
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent dividers sx={{ pb: 2 }}>
          <Grid container spacing={2}>
            {/* Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                required
                name="name"
                fullWidth
                variant="outlined"
                value={customerData.name}
                onChange={handleChange}
              />
            </Grid>

            {/* Contact #1 */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Contact #1"
                name="contact_number1"
                fullWidth
                variant="outlined"
                value={customerData.contact_number1}
                onChange={handleChange}
              />
            </Grid>

            {/* Contact #2 */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Contact #2"
                name="contact_number2"
                fullWidth
                variant="outlined"
                value={customerData.contact_number2}
                onChange={handleChange}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                fullWidth
                variant="outlined"
                type="email"
                value={customerData.email}
                onChange={handleChange}
              />
            </Grid>

            {/* Address */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Address"
                name="address"
                fullWidth
                variant="outlined"
                value={customerData.address}
                onChange={handleChange}
              />
            </Grid>

            {/* Township */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Township"
                name="township"
                fullWidth
                variant="outlined"
                value={customerData.township}
                onChange={handleChange}
              />
            </Grid>

            {/* Region */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Region"
                name="region"
                fullWidth
                variant="outlined"
                value={customerData.region}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setOpen(false)}
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default CustomerDialog;
