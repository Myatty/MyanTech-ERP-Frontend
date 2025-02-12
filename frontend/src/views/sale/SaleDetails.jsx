import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
  IconButton,
} from "@mui/material";
import { IconArrowLeft, IconTrash } from "@tabler/icons-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SaleDetails = () => {
  const { order_id } = useParams();

  // Mock data for the order details
  const [orderDetails, setOrderDetails] = useState({
    order_id: order_id,
    customer_name: "John Doe",
    customer_id: "12345",
    township: "Downtown",
    region: "Yangon",
    contact_number1: "09123456789",
    order_date: new Date(),
    products: [
      {
        product_id: "1",
        productName: "Product A",
        brand: "Brand X",
        category: "Category 1",
        product_segment: "Segment A",
        serial_number: "SN123",
        price: 100,
        quantity: 2,
        totalPrice: 200,
      },
      {
        product_id: "2",
        productName: "Product B",
        brand: "Brand Y",
        category: "Category 2",
        product_segment: "Segment B",
        serial_number: "SN456",
        price: 150,
        quantity: 1,
        totalPrice: 150,
      },
    ],
  });

  // Calculate grand total
  const grandTotal = orderDetails.products.reduce(
    (acc, product) => acc + product.totalPrice,
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
                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  margin="dense"
                  placeholder="Township"
                  value={orderDetails.township || ""}
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  margin="dense"
                  placeholder="Region"
                  value={orderDetails.region || ""}
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  margin="dense"
                  placeholder="Contact Number"
                  value={orderDetails.contact_number1 || ""}
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
              <TableCell>Segment</TableCell>
              <TableCell>Serial #</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="right">Qty</TableCell>
              <TableCell align="right">Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Existing lines */}
            {orderDetails.products.map((product, idx) => (
              <TableRow key={idx}>
                <TableCell>{product.productName}</TableCell>
                <TableCell>{product.brand}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>{product.product_segment}</TableCell>
                <TableCell>{product.serial_number}</TableCell>
                <TableCell align="right">{product.price}</TableCell>
                <TableCell align="right">{product.quantity}</TableCell>
                <TableCell align="right">{product.totalPrice}</TableCell>
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
