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
import { fetchOrders } from "../../actions/orderActions";

const OrderCreate = () => {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.products);
  // delete cus when real customer data get
  const cus = [
    {
      id: 1,
      name: "Su Su",
      township: "A lon",
      region: "yangon",
      phone: "093764547",
    },
    {
      id: 2,
      name: "Hla Hla",
      township: "Sanchung",
      region: "yangon",
      phone: "094654735",
    },
    {
      id: 3,
      name: "Kyaw kyaw",
      township: "Bahan",
      region: "yangon",
      phone: "097453455",
    },
  ];
  const [customer, setCustomer] = useState("");
  const [selectdedCustomer, setSelectedCustomer] = useState({
    name: "",
    township: "",
    region: "",
    phone: "",
  });
  const [selecteddate, setSelectedDate] = useState(new Date());
  const [tabIndex, setTabIndex] = useState(0);
  const [orders, setOrders] = useState([]);

  const [newOrder, setNewOrder] = useState({
    fakeOrderID: null,
    date: null,
    customer: "",
    township: "",
    region: "",
    phone: "",
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
    const findCus = cus.find((c) => c.id === Number(e.target.value));
    setSelectedCustomer({
      ...selectdedCustomer,
      name: findCus.name,
      township: findCus.township,
      region: findCus.region,
      phone: findCus.phone,
    });
    setCustomer(e.target.value);
    setNewOrder({
      ...newOrder,
      customer: findCus.name,
      region: findCus.region,
      township: findCus.township,
      phone: findCus.phone,
    });
  };

  useEffect(() => {
    dispatch(fetchOrders());
    setNewOrder({ ...newOrder, date: selecteddate });
  }, [dispatch]);

  // create new order
  const handleSubmit = async () => {
    try {
      await axios.post("http://localhost:4000/api/orders", orders);
      dispatch(fetchOrders());
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
            selected={selecteddate}
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
                  {cus.map((item) => (
                    <MenuItem key={item.id} value={item.id}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <TextField
              margin="normal"
              sx={{ width: 200 }}
              value={selectdedCustomer.township}
            />
            <TextField
              margin="normal"
              sx={{ width: 200 }}
              value={selectdedCustomer.region}
            />
            <TextField
              margin="normal"
              sx={{ width: 200 }}
              value={selectdedCustomer.phone}
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
          selectedCustomer={selectdedCustomer}
          selecteddate={selecteddate}
        />
      </Paper>
    </Container>
  );
};

export default OrderCreate;
