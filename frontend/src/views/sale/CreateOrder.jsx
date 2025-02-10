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
  TextField,
} from "@mui/material";
import OrderTab from "./component/Tab";
import { fetchProducts } from "../../actions/productActions";
import { fetchUsers } from "../../actions/userActions";
import axios from "axios";

const OrderCreate = () => {
  const dispatch = useDispatch();

  const { loading, products, error } = useSelector((state) => state.products);
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const [customer, setCustomer] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState({
    name: "",
    township: "",
    region: "",
    contact_number1: "",
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tabIndex, setTabIndex] = useState(0);
  const [orders, setOrders] = useState([]);

  const [newOrder, setNewOrder] = useState({
    fakeOrderID: null,
    date: null,
    customer: "",
    township: "",
    region: "",
    contact_number1: "",
    productName: "",
    brand: "",
    category: "",
    product_segment: "",
    serial_number: "",
    price: 0,
    quantity: 0,
    totalPrice: 0,
  });

  const handleCustomer = (e) => {
    const findCus = users.find((c) => c.customer_id === Number(e.target.value));
    setSelectedCustomer({
      ...selectedCustomer,
      name: findCus.name,
      township: findCus.township,
      region: findCus.region,
      contact_number1: findCus.contact_number1,
    });
    setCustomer(e.target.value);
    setNewOrder({
      ...newOrder,
      customer: findCus.name,
      region: findCus.region,
      township: findCus.township,
      contact_number1: findCus.contact_number1,
    });
  };

  useEffect(() => {
    dispatch(fetchProducts());
    setNewOrder({ ...newOrder, date: selectedDate });
  }, [dispatch]);

  // create new order
  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:4000/api/orders", orders);
      dispatch(fetchProducts());
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

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
          onClick={handleSubmit}
        >
          Confirm
        </Button>
        <Typography variant="h5" gutterBottom>
          Create Order
        </Typography>

        <Box sx={{ mx: 2, display: "flex", mt: 4, width: 300 }}>
          <Typography sx={{ mr: 2, fontWeight: "bold" }}>Date</Typography>
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setNewOrder({ ...newOrder, date });
            }}
          />
        </Box>

        <Paper sx={{ mt: 3, p: 2 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Box>
              <Typography sx={{ fontWeight: "bold", mb: 2 }}>
                Customer
              </Typography>
              <FormControl sx={{ width: 250 }}>
                <InputLabel>Customer</InputLabel>
                <Select
                  name="customer"
                  label="Customer"
                  value={customer}
                  onChange={(e) => {
                    handleCustomer(e);
                  }}
                >
                  {users.map((item) => (
                    <MenuItem key={item.customer_id} value={item.customer_id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <TextField
              margin="normal"
              sx={{ width: 200 }}
              value={selectedCustomer.township}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              margin="normal"
              sx={{ width: 200 }}
              value={selectedCustomer.region}
              InputProps={{
                readOnly: true,
              }}
            />
            <TextField
              margin="normal"
              sx={{ width: 200 }}
              value={selectedCustomer.contact_number1}
              InputProps={{
                readOnly: true,
              }}
            />
          </Box>
        </Paper>

        <OrderTab
          tabIndex={tabIndex}
          setTabIndex={setTabIndex}
          newOrder={newOrder}
          setNewOrder={setNewOrder}
          orders={orders}
          setOrders={setOrders}
          products={products}
          selectedCustomer={selectedCustomer}
          selectedDate={selectedDate}
        />
      </Paper>
    </Container>
  );
};

export default OrderCreate;