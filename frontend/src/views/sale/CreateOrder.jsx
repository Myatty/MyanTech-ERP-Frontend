import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
  IconButton,
  Snackbar,
  Alert,
  Skeleton,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { IconTrash } from "@tabler/icons-react";

import { fetchProducts } from "../../actions/productActions";
import { fetchCustomers } from "../../actions/customerActions";

import ProductAutocomplete from "./components/ProductAutoComplete";
import CustomerAutoComplete from "./components/CustomerAutoComplete";

const OrderCreate = () => {
  const [openToast, setOpenToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSeverity, setToastSeverity] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  // Redux data
  const { loading, products, error } = useSelector((state) => state.products);
  const { customers } = useSelector((state) => state.customers);

  // Basic form states
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [customer, setCustomer] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState({
    name: "",
    customer_id: "",
    township: "",
    region: "",
    contact_number1: "",
  });

  // Tab index
  const [tabIndex, setTabIndex] = useState(0);

  // Existing lines array
  const [lines, setLines] = useState([]);

  // Whether we show the new line row
  const [showNewLine, setShowNewLine] = useState(false);

  // Draft line for the “new row”
  const [draftLine, setDraftLine] = useState({
    product_id: "",
    productName: "",
    brand: "",
    category: "",
    product_segment: "",
    serial_number: "",
    price: 0,
    quantity: 1,
    totalPrice: 0,
  });

  useEffect(() => {
    dispatch(fetchCustomers());
    dispatch(fetchProducts());
  }, [dispatch]);

  // Submit the order
  const handleSubmit = async () => {
    setIsSubmitting(true); // Start loading

    try {
      const orderData = {
        customer_name: selectedCustomer.name,
        customer_id: selectedCustomer.customer_id,
        order_date: selectedDate,
        products: lines.map((ln) => ({
          product_id: ln.product_id,
          quantity: ln.quantity,
        })),
      };

      await axios.post("http://localhost:4000/api/orders", orderData);

      // Show success message
      setToastMessage("Order created successfully!");
      setToastSeverity("success");
      setOpenToast(true);

      // Clear everything
      setLines([]);
      setCustomer("");
      setSelectedCustomer({
        name: "",
        customer_id: "",
        township: "",
        region: "",
        contact_number1: "",
      });
      setDraftLine({
        product_id: "",
        productName: "",
        brand: "",
        category: "",
        product_segment: "",
        serial_number: "",
        price: 0,
        quantity: 1,
        totalPrice: 0,
      });
      setShowNewLine(false);
    } catch (err) {
      // Show error message
      setToastMessage("Error creating order. Please try again.");
      setToastSeverity("error");
      setOpenToast(true);
      console.error("Error creating order:", err);
    } finally {
      setIsSubmitting(false); // Stop loading
    }
  };

  // When quantity/price changes in the draft, recalc total
  const handleDraftChange = (field, val) => {
    let newVal = val;
    if (field === "quantity" || field === "price") {
      newVal = Number(val);
    }
    let newTotal = draftLine.totalPrice;
    if (field === "quantity" || field === "price") {
      const qty = field === "quantity" ? Number(val) : draftLine.quantity;
      const prc = field === "price" ? Number(val) : draftLine.price;
      newTotal = qty * prc;
    }
    setDraftLine((prev) => ({
      ...prev,
      [field]: newVal,
      totalPrice: newTotal,
    }));
  };

  // Called by the ProductAutocomplete
  const handleSelectProduct = (prod) => {
    if (!prod) return;
    setDraftLine((prev) => ({
      ...prev,
      product_id: prod.product_id,
      productName: prod.name,
      brand: prod.brand,
      category: prod.category,
      product_segment: prod.product_segment,
      serial_number: prod.serial_number,
      price: prod.price,
      totalPrice: prod.price * prev.quantity,
    }));
  };

  // Save the new line
  const handleSaveNewLine = () => {
    setLines([...lines, draftLine]);
    // Reset
    setDraftLine({
      product_id: "",
      productName: "",
      brand: "",
      category: "",
      product_segment: "",
      serial_number: "",
      price: 0,
      quantity: 1,
      totalPrice: 0,
    });
    setShowNewLine(false);
  };

  // Cancel new line
  const handleCancelNewLine = () => {
    setDraftLine({
      product_id: "",
      productName: "",
      brand: "",
      category: "",
      product_segment: "",
      serial_number: "",
      price: 0,
      quantity: 1,
      totalPrice: 0,
    });
    setShowNewLine(false);
  };

  // Delete an existing line
  const handleDeleteLine = (idx) => {
    const newArr = lines.filter((_, i) => i !== idx);
    setLines(newArr);
  };

  // Sum of all line totals
  const grandTotal = lines.reduce((acc, ln) => acc + ln.totalPrice, 0);

  if (loading || isSubmitting) {
    return (
      <Container maxWidth="xl">
        <Box sx={{ mt: 2 }}>
          <Skeleton variant="rectangular" width="100%" height={118} />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
          <Skeleton variant="text" />
        </Box>
      </Container>
    );
  }
  if (error) return <div>Error: {error}</div>;

  return (
    <Container maxWidth="xl">
      {/* Title & confirm button */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={2}
        mb={2}
      >
        <Typography variant="h3" sx={{ ml: 2 }}>
          New Sale Order
        </Typography>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Confirm
        </Button>
      </Box>

      {/* Customer & date info */}
      <Paper sx={{ p: 3, mb: 2, borderRadius: 2, boxShadow: 2 }}>
        <Grid container spacing={2}>
          {/* Right Column (Additional Customer Info) */}
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              {/* Customer Selection */}
              <Grid item xs={12} sm={6} sx={{ ml: 1 }}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Customer Info
                </Typography>
                <CustomerAutoComplete
                  customers={customers}
                  onSelectCustomer={(selectedCustomer) => {
                    setCustomer(selectedCustomer.customer_id);
                    setSelectedCustomer({
                      name: selectedCustomer.name,
                      customer_id: selectedCustomer.customer_id,
                      township: selectedCustomer.township,
                      region: selectedCustomer.region,
                      contact_number1: selectedCustomer.contact_number1,
                    });
                  }}
                />
                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  margin="dense"
                  placeholder="Township"
                  value={selectedCustomer.township || ""}
                  InputProps={{ readOnly: true }}
                />
                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  margin="dense"
                  placeholder="Region"
                  value={selectedCustomer.region || ""}
                  InputProps={{ readOnly: true }}
                  required
                />
                <TextField
                  fullWidth
                  variant="standard"
                  size="small"
                  margin="dense"
                  placeholder="Contact Number"
                  value={selectedCustomer.contact_number1 || ""}
                  InputProps={{ readOnly: true }}
                  required
                />
              </Grid>
            </Grid>
          </Grid>
          {/* Left Column (Date + Customer Selection) */}
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              <Grid item sm={8}></Grid>
              {/* Date Field */}
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle2" fontWeight="bold">
                  Date
                </Typography>
                <DatePicker
                  selected={selectedDate}
                  onChange={(dt) => setSelectedDate(dt)}
                  dateFormat="dd/MM/yyyy"
                  customInput={
                    <TextField
                      fullWidth
                      variant="standard"
                      size="small"
                      margin="dense"
                    />
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={tabIndex} onChange={(e, val) => setTabIndex(val)}>
          <Tab label="Order Lines" />
        </Tabs>
      </Box>

      {/* Tab 1: Order Lines */}
      {tabIndex === 0 && (
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
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Existing lines */}
              {lines.map((ln, idx) => (
                <TableRow key={idx}>
                  <TableCell>{ln.productName}</TableCell>
                  <TableCell>{ln.brand}</TableCell>
                  <TableCell>{ln.category}</TableCell>
                  <TableCell>{ln.product_segment}</TableCell>
                  <TableCell>{ln.serial_number}</TableCell>
                  <TableCell align="right">{ln.price}</TableCell>
                  <TableCell align="right">{ln.quantity}</TableCell>
                  <TableCell align="right">{ln.totalPrice}</TableCell>
                  <TableCell>
                    <IconButton
                      color="error"
                      onClick={() => handleDeleteLine(idx)}
                    >
                      <IconTrash stroke={1.5} size="1.3rem" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}

              {/* The new-line row, if showNewLine */}
              {showNewLine && (
                <TableRow>
                  <TableCell colSpan={9}>
                    <Box
                      sx={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 2,
                        alignItems: "center",
                      }}
                    >
                      {/* Smaller Autocomplete */}
                      <Box sx={{ width: 180 }}>
                        <ProductAutocomplete
                          products={products}
                          onSelectProduct={handleSelectProduct}
                          // If you control the TextField inside Autocomplete, do something like:
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              variant="standard"
                              size="small"
                              margin="dense"
                              label="Select Product"
                              required
                            />
                          )}
                        />
                      </Box>

                      <TextField
                        variant="standard"
                        size="small"
                        margin="dense"
                        label="Brand"
                        sx={{ width: 120 }}
                        value={draftLine.brand}
                        required
                        InputProps={{ readOnly: true }}
                      />
                      <TextField
                        variant="standard"
                        size="small"
                        margin="dense"
                        label="Category"
                        sx={{ width: 120 }}
                        value={draftLine.category}
                        required
                        InputProps={{ readOnly: true }}
                      />
                      <TextField
                        variant="standard"
                        size="small"
                        margin="dense"
                        label="Segment"
                        required
                        sx={{ width: 120, display: "none" }}
                        value={draftLine.product_segment}
                        InputProps={{ readOnly: true }}
                      />
                      <TextField
                        variant="standard"
                        size="small"
                        margin="dense"
                        label="Serial #"
                        sx={{ width: 150 }}
                        required
                        value={draftLine.serial_number}
                        InputProps={{ readOnly: true }}
                      />
                      <TextField
                        variant="standard"
                        size="small"
                        margin="dense"
                        label="Unit Price"
                        required
                        sx={{ width: 110 }}
                        type="text"
                        value={draftLine.price}
                        onChange={(e) =>
                          handleDraftChange("price", e.target.value)
                        }
                      />
                      <TextField
                        variant="standard"
                        size="small"
                        margin="dense"
                        label="Qty"
                        sx={{ width: 60 }}
                        type="text"
                        required
                        value={draftLine.quantity}
                        onChange={(e) =>
                          handleDraftChange("quantity", e.target.value)
                        }
                      />
                      <TextField
                        variant="standard"
                        size="small"
                        margin="dense"
                        label="Subtotal"
                        required
                        sx={{ width: 120 }}
                        value={draftLine.totalPrice}
                        InputProps={{ readOnly: true }}
                      />

                      <Button
                        variant="contained"
                        size="small"
                        onClick={handleSaveNewLine}
                      >
                        Save
                      </Button>
                      <Button
                        variant="text"
                        size="small"
                        onClick={handleCancelNewLine}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
              <TableRow>
                <TableCell colSpan={6}></TableCell>
                <TableCell>Total: </TableCell>
                <TableCell>{grandTotal}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

          {/* Odoo-like links */}
          {!showNewLine && (
            <Box sx={{ mt: 1 }}>
              <Link
                component="button"
                variant="body2"
                underline="hover"
                sx={{ ml: 2 }}
                onClick={() => setShowNewLine(true)}
              >
                Add a product
              </Link>
            </Box>
          )}

          {/* Grand total */}
          <Box sx={{ mt: 2, fontWeight: "bold", textAlign: "right", mr: 13 }}>
            Total: {grandTotal}
          </Box>
        </Paper>
      )}
      <Snackbar
        open={openToast}
        autoHideDuration={3000}
        onClose={() => setOpenToast(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenToast(false)}
          severity={toastSeverity}
          sx={{
            width: "100%",
            backgroundColor:
              toastSeverity === "success" ? "#4A90E2" : "#FF6B6B", // Custom Background (Blue for success, Red for error)
            color: "#fff", // White Text
            fontWeight: "bold", // Make Text Bold
            borderRadius: "8px",
          }}
        >
          {toastMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default OrderCreate;
