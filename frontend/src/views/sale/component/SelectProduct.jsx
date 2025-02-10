import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  ListItemText,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useState } from "react";

const SelectedProduct = ({
  products,
  newOrder,
  setNewOrder,
  orders,
  setOrders,
  selecteddate,
  customer,
}) => {
  const [status, setStatus] = useState(true);
  const [product, setProduct] = useState(0);
  const [selectProductQty, setSelectProductQty] = useState(0);
  const [fakeId, setFakeId] = useState(0);
  //   delect p array when real data get
  // const p = [
  //   {
  //     id: 1,
  //     name: "Apple Macbook",
  //     brand: "Apple",
  //     category: "Laptop",
  //     product_segment: "gidhgdh",
  //     serial_number: "htghd",
  //     price: 100,
  //     stock_quantity: 10,
  //   },
  //   {
  //     id: 2,
  //     name: "LG Ultra Gear",
  //     brand: "LG",
  //     category: "Monitor",
  //     product_segment: "dgdhhh",
  //     serial_number: "ujhrt",
  //     price: 200,
  //     stock_quantity: 15,
  //   },
  // ];

  // add order into order list
  const handleAddOrder = () => {
    const findItem = orders.find(
      (o) => o.serial_number === newOrder.serial_number
    );
    if (findItem) {
      const updateOrder = orders.map((item) => {
        return item.serial_number == newOrder.serial_number
          ? {
              ...item,
              quantity: item.quantity + newOrder.quantity,
              totalPrice: item.totalPrice + newOrder.totalPrice,
            }
          : item;
      });
      setOrders([...updateOrder]);
      console.log("okok", updateOrder);
    } else {
      setOrders([...orders, newOrder]);
    }

    setNewOrder({
      fakeOrderID: null,
      date: selecteddate,
      customer: customer.name,
      township: customer.township,
      region: customer.region,
      phone: customer.phone,
      productName: "",
      brand: "",
      category: "",
      product_segment: "",
      serial_number: "",
      price: 0,
      quantity: 0,
      totalPrice: 0,
    });
    setSelectProductQty(0);
    setStatus(true);
  };

  //Select Product to order

  console.log("fakeid", fakeId);
  const handleChange = (e) => {
    // find item from products instead of p
    const find = products.find((i) => i.id === Number(e.target.value));
    setFakeId(fakeId + 1);
    setNewOrder({
      ...newOrder,
      fakeOrderID: fakeId,
      productName: find.name,
      brand: find.brand,
      category: find.category,
      product_segment: find.product_segment,
      serial_number: find.serial_number,
      price: find.price,
      quantity: 0,
      totalPrice: 0,
    });
    setProduct(e.target.value);
    setSelectProductQty(find.stock_quantity);
  };

  //enter Order Quantity
  const handleOrderQty = (e) => {
    if (
      selectProductQty >= Number(e.target.value) &&
      Number(e.target.value) !== 0
    ) {
      const totalPrice = newOrder.price * Number(e.target.value);
      setStatus(false);
      setNewOrder({
        ...newOrder,
        quantity: Number(e.target.value),
        totalPrice: totalPrice,
      });
    } else {
      setStatus(true);
      setNewOrder({
        ...newOrder,
        quantity: 0,
        totalPrice: 0,
      });
    }
  };

  console.log("select", newOrder);
  console.log("order", orders);
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          flexWrap: "wrap",
        }}
      >
        <FormControl sx={{ mt: 2, width: 300 }}>
          <InputLabel>Products</InputLabel>
          <Select
            name="product"
            label="Product"
            value={product}
            onChange={(e) => {
              handleChange(e);
            }}
          >
            {/* use products from prop instead of p  */}
            {products.map((item) => (
              <MenuItem key={item.id} value={item.id}>
                <ListItemText primary={item.name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          label="Brand"
          value={newOrder.brand}
          margin="normal"
          sx={{ width: 200 }}
        />
        <TextField
          label="Category"
          value={newOrder.category}
          margin="normal"
          sx={{ width: 200 }}
        />
        <TextField
          label="Product Segment"
          value={newOrder.product_segment}
          margin="normal"
          sx={{ width: 200 }}
        />
        <TextField
          label="Serial Number"
          value={newOrder.serial_number}
          margin="normal"
          sx={{ width: 190 }}
        />
        <TextField
          label="Unit Price"
          value={newOrder.price}
          margin="normal"
          sx={{ width: 190 }}
        />
        <TextField
          label="Stock Qty"
          value={selectProductQty}
          margin="normal"
          sx={{ width: 190 }}
        />

        <TextField
          disabled={selectProductQty === 0}
          label="Quantity"
          margin="normal"
          sx={{ width: 190 }}
          onChange={(e) => {
            handleOrderQty(e);
          }}
        />

        <TextField
          label="Sub Total"
          value={newOrder.totalPrice}
          margin="normal"
          sx={{ width: 190 }}
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleAddOrder}
        sx={{ mt: 2 }}
        disabled={status || !newOrder.customer}
      >
        Add Item
      </Button>
    </>
  );
};
export default SelectedProduct;
