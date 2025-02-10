import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, ListItemText, TextField, Button } from '@mui/material';

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
  const [product, setProduct] = useState('');
  const [selectProductQty, setSelectProductQty] = useState(0);
  const [fakeId, setFakeId] = useState(0);

  // add order into order list
  const handleAddOrder = () => {
    const findItem = orders.find(
      (o) => o.serial_number === newOrder.serial_number
    );
    if (findItem) {
      const updateOrder = orders.map((item) => {
        return item.serial_number === newOrder.serial_number
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

  // Select Product to order
  const handleChange = (e) => {
    console.log("Products array:", products); // Debugging log
    const find = products.find((i) => i.product_id === Number(e.target.value));
    console.log("Selected product:", find); // Debugging log
    if (find) {
      setFakeId(fakeId + 1);
      setNewOrder({
        ...newOrder,
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
    }
  };

  // Enter Order Quantity
  const handleOrderQty = (e) => {
    if (
      selectProductQty >= Number(e.target.value) &&
      Number(e.target.value) !== 0
    ) {
      const totalPrice = newOrder.price * Number(e.target.value);
      setNewOrder({
        ...newOrder,
        quantity: Number(e.target.value),
        totalPrice: totalPrice,
      });
    } else {
      // Handle invalid quantity
    }
  };

  console.log("fakeid", fakeId);
  console.log("select", newOrder);
  console.log("order", orders);

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel>Product</InputLabel>
        <Select
          name="product"
          label="Product"
          value={product}
          onChange={handleChange}
        >
          {products.map((item) => (
            <MenuItem key={item.product_id} value={item.product_id}>
              <ListItemText primary={item.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        margin="normal"
        fullWidth
        label="Brand"
        value={newOrder.brand}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Category"
        value={newOrder.category}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Product Segment"
        value={newOrder.product_segment}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Serial Number"
        value={newOrder.serial_number}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Price"
        value={newOrder.price}
        InputProps={{
          readOnly: true,
        }}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Quantity"
        type="number"
        value={newOrder.quantity}
        onChange={handleOrderQty}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Total Price"
        value={newOrder.totalPrice}
        InputProps={{
          readOnly: true,
        }}
      />
      <Button variant="contained" color="primary" onClick={handleAddOrder}>
        Add Order
      </Button>
    </div>
  );
};

export default SelectedProduct;