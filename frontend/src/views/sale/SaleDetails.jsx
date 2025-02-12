import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
  Container,
  Grid,
  TextField,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchSaleDetail } from "../../actions/saleDetailActions";

const SaleDetails = () => {
  const { order_id } = useParams();
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.saleDetails.order);
  const orderItems = useSelector((state) => state.saleDetails.details);
  const loading = useSelector((state) => state.saleDetails.loading);
  const error = useSelector((state) => state.saleDetails.error);

  useEffect(() => {
    dispatch(fetchSaleDetail(order_id));
  }, [dispatch, order_id]);

  useEffect(() => {
    console.log("sale details:", orderDetails);
    console.log("order items:", orderItems);
  }, [orderDetails, orderItems]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h5" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!orderDetails) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h5">Order not found</Typography>
      </Box>
    );
  }

  // Calculate grand total
  const grandTotal = orderItems.reduce(
    (acc, item) => acc + item.price_at_order * item.quantity,
    0
  );

  // Handle return action
  const handleReturn = () => {
    console.log("Returning order:", order_id);
    // Add your return logic here
  };

  return (
    <Container maxWidth="xl">
      {/* Title & return button */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
        mb={2}
      >
        <Typography variant="h3" sx={{ ml: 2 }}>
          Sale Details - Order #{order_id}
        </Typography>
        <Button variant="contained" color="secondary" onClick={handleReturn}>
          Return
        </Button>
      </Box>

      {/* Customer & date info */}
      <Paper sx={{ p: 3, mb: 2, borderRadius: 2, boxShadow: 2 }}>
        <Grid container spacing={2}>
          {/* Right Column (Additional Customer Info) */}
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              {/* Customer Info */}
              <Grid item xs={12} sm={6} sx={{ ml: 1 }}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Customer Info
                </Typography>
                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  margin="dense"
                  placeholder="Customer Name"
                  value={orderDetails.customer_name || ""}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>
          </Grid>
          {/* Left Column (Date) */}
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              <Grid item sm={8}></Grid>
              {/* Date Field */}
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Date
                </Typography>
                <DatePicker
                  selected={new Date(orderDetails.order_date)}
                  onChange={(dt) => {}}
                  dateFormat="dd/MM/yyyy"
                  customInput={
                    <TextField
                      fullWidth
                      variant="standard"
                      size="small"
                      margin="dense"
                      InputProps={{ readOnly: true }}
                    />
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* Order Lines */}
      <Paper sx={{ p: 2, mt: 2 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Category</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Existing lines */}
            {orderItems.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.product_name}</TableCell>
                <TableCell>{item.brand}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell align="right">{item.price_at_order}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">{item.price_at_order * item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Grand total */}
        <Box sx={{ mt: 2, fontWeight: "bold", textAlign: "right", mr: 13 }}>
          Total: {grandTotal}
        </Box>
      </Paper>
    </Container>
  );
};

export default SaleDetails;