import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
import { IconArrowLeft } from "@tabler/icons-react";
import ReturnDialog from "./components/ReturnDialog";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { fetchSaleDetail } from "../../actions/saleDetailActions";
import InvoiceDialog from "./components/InvoiceDialog";

const SaleDetails = () => {
  const [returnDialogOpen, setOpenReturnDialog] = useState(false);
  const { order_id } = useParams();
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.saleDetails.order);
  const orderItems = useSelector((state) => state.saleDetails.details);
  const loading = useSelector((state) => state.saleDetails.loading);
  const error = useSelector((state) => state.saleDetails.error);
  const handleReturnClick = () => setOpenReturnDialog(true);
  const handleCreateInvoice = () => alert("Create invoice clicked" + order_id);

  const handleConfirmReturn = (selectedReturns) => {};

  useEffect(() => {
    dispatch(fetchSaleDetail(order_id));
  }, [dispatch, order_id]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h5" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  if (!orderDetails) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h5">Order not found</Typography>
      </Box>
    );
  }

  // Calculate grand total
  const grandTotal = orderItems.reduce(
    (acc, item) => acc + item.price_at_order * item.quantity,
    0
  );

  const grandQty = orderItems.reduce((acc, item) => acc + item.quantity, 0);

  // Handle return
  const handleReturn = () => {
    // return logic here
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
        <Link
          to="/sales/history"
          style={{ textDecoration: "none", color: "black" }}
        >
          <IconArrowLeft />
        </Link>
        <Typography variant="h3" sx={{ ml: 2 }}>
          Sale Details - Order #{order_id}
        </Typography>
        <Box>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleReturnClick}
          >
            Return
          </Button>
          {orderDetails.invoice_status === null && (
            <InvoiceDialog orderId={order_id} />
          )}
        </Box>
      </Box>

      <Paper sx={{ p: 3, mb: 2, borderRadius: 2, boxShadow: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} sx={{ ml: 1 }}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Customer Info
                </Typography>
                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  margin="dense"
                  disabled
                  placeholder="Customer Name"
                  value={orderDetails.customer_name || ""}
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  margin="dense"
                  disabled
                  placeholder="Township"
                  value={orderDetails.township || ""}
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  margin="dense"
                  disabled
                  placeholder="Region"
                  value={orderDetails.region || ""}
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  disabled
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
              <Grid item sm={7}></Grid>
              {/* Date Field */}
              <Grid item xs={12} sm={5}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Date
                </Typography>
                <DatePicker
                  selected={new Date(orderDetails.order_date)}
                  onChange={(dt) => {}}
                  disabled
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
                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  margin="dense"
                  disabled
                  placeholder="Delivery Status"
                  value={
                    `Delivery Status - ${
                      orderDetails.order_status.charAt(0).toUpperCase() +
                      orderDetails.order_status.slice(1)
                    }` || ""
                  }
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  margin="dense"
                  disabled
                  placeholder="Payment Status"
                  value={`Payment Status - ${
                    orderDetails.invoice_status
                      ? orderDetails.invoice_status.charAt(0).toUpperCase() +
                        orderDetails.invoice_status.slice(1)
                      : "N/A"
                  }`}
                  InputProps={{ readOnly: true }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* Order Lines */}
      <Paper sx={{ p: 2, mt: 2 }}>
        <Table>
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
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
                <TableCell align="right">
                  {Number(item.price_at_order * item.quantity).toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4}></TableCell>
              <TableCell align="right">Total Qty &nbsp;:</TableCell>
              <TableCell align="right">{grandQty}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={4}></TableCell>
              <TableCell align="right">Total Amount &nbsp;:</TableCell>
              <TableCell align="right">
                {Number(grandTotal).toLocaleString()}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
      <ReturnDialog
        open={returnDialogOpen}
        onClose={() => setOpenReturnDialog(false)}
        orderItems={orderItems}
        onConfirm={handleConfirmReturn}
      />
    </Container>
  );
};

export default SaleDetails;
