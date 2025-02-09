import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
} from "@mui/material";
import OrderTab from "./component/Tab";
import { fetchProducts } from "../../actions/productActions";

const OrderCreate = () => {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.products);
  const customers = ["Su Su", "Hla Hla", "Aung Aung"];
  const [customer, setCustomer] = useState("");
  const [selecteddate, setSelectedDate] = useState(new Date());
  const [tabIndex, setTabIndex] = useState(0);
  const [orders, setOrders] = useState([]);

  const [newOrder, setNewOrder] = useState({
    date: null,
    customer: "",
    productName: "",
    brand: "",
    category: "",
    product_segment: "",
    serial_number: "",
    price: 0,
    quantity: 0,
    totalPrice: 0,
  });

  useEffect(() => {
    //dispatch(fetchProducts());
    setNewOrder({ ...newOrder, date: selecteddate });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <Container maxWidth="lg">
      <Paper elevation={3} sx={{ p: 3, mt: 3, position: "relative" }}>
        <Button
          variant="contained"
          color="secondary"
          sx={{ position: "absolute", right: 20, top: 35 }}
        >
          Confirm
        </Button>
        <Typography variant="h5" gutterBottom>
          Create Order
        </Typography>

        <Box sx={{ mx: 2, display: "flex", mt: 4, width: 300 }}>
          <Typography sx={{ mr: 2, fontWeight: "bold" }}>Date</Typography>
          <DatePicker
            selected={selecteddate}
            onChange={(date) => {
              setSelectedDate(date);
              setNewOrder({ ...newOrder, date });
            }}
          />
        </Box>

        <Paper sx={{ mt: 3, p: 2 }}>
          <Typography sx={{ fontWeight: "bold", mb: 2 }}>Customer</Typography>
          {/* <TextField fullWidth label="Customer" margin="normal" />
          <TextField fullWidth label="Cash Received No." margin="normal" /> */}
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel>Customer</InputLabel>
            <Select
              name="customer"
              label="Customer"
              value={customer}
              onChange={(e) => {
                setCustomer(e.target.value);
                setNewOrder({ ...newOrder, customer: e.target.value });
              }}
            >
              {customers.map((item) => (
                <MenuItem key={item} value={item}>
                  <ListItemText primary={item} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Paper>

        <OrderTab
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
          newOrder={newOrder}
          setNewOrder={setNewOrder}
          orders={orders}
          setOrders={setOrders}
          products={products}
          customer={customer}
          selecteddate={selecteddate}
        />
      </Paper>
    </Container>
  );
};

export default OrderCreate;
