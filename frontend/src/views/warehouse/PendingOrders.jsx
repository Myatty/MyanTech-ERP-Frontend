import * as React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, Button } from "@mui/material/";
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import AssignTruck from "./components/AssignPage";
import { fetchOrders } from "../../actions/orderActions";

export default function CustomizedTables() {
  //fetch our discussed orders endpoint for this
  const dispatch = useDispatch();

  const [region, setRegion] = useState("");
  const [township, setTownship] = useState("");
  const [assignOrderId, setAssignOrderId] = useState([]);
  const [selectOrderId, setSelectOrderId] = useState([]);
  //func for clicking plus button
  const handleAdd = (orderId) => {
    selectOrderId.push(orderId);
    setAssignOrderId([...assignOrderId, orderId]);
  };

  // useEffect(() => {
  //   dispatch(fetchOrders());
  // }, [dispatch]);
  console.log("deleting");
  //delete orders when  real data get
  const orders = [
    {
      order_id: 1,
      customer_name: "Su Su",
      order_item_id: 1,
      product_name: "Dell",
      quantity: 5,
      status: "Pending",
      order_date: "Wed Feb 11 2025 15:40:56 GMT+0630",
      township: "Bahan",
      region: "Yangon",
      address: "459frkjghoir",
      contact_number: "0947463533",
    },
    {
      order_id: 1,
      customer_name: "Su Su",
      order_item_id: 2,
      product_name: "Apple",
      quantity: 10,
      status: "Pending",
      order_date: "Wed Feb 11 2025 15:40:56 GMT+0630",
      township: "Bahan",
      region: "Yangon",
      address: "87yhj",
      contact_number: "0947463533",
    },
    {
      order_id: 1,
      customer_name: "Su Su",
      order_item_id: 3,
      product_name: "Lenovo",
      quantity: 2,
      status: "Pending",
      order_date: "Wed Feb 11 2025 15:40:56 GMT+0630",
      township: "Bahan",
      region: "Yangon",
      address: "67jkk",
      contact_number: "0947463533",
    },
    {
      order_id: 2,
      customer_name: "Kyaw Kyaw",
      order_item_id: 3,
      product_name: "Lenovo",
      quantity: 2,
      status: "Pending",
      order_date: "Wed Feb 11 2025 15:40:56 GMT+0630",
      township: "ALone",
      region: "Yangon",
      address: "23fjjk",
      contact_number: "098775455",
    },
    {
      order_id: 2,
      customer_name: "Kyaw Kyaw",
      order_item_id: 3,
      product_name: "Dell",
      quantity: 2,
      status: "Pending",
      order_date: "Wed Feb 11 2025 15:40:56 GMT+0630",
      township: "ALone",
      region: "Yangon",
      address: "78hmmmk",
      contact_number: "098775455",
    },
    {
      order_id: 3,
      customer_name: "Hla Hla",
      order_item_id: 3,
      product_name: "Apple",
      quantity: 2,
      status: "Pending",
      order_date: "Wed Feb 11 2025 15:40:56 GMT+0630",
      township: "Tamwe",
      region: "Yangon",
      address: "98jjj",
      contact_number: "093435234",
    },
  ];

  // Get orderId from order
  const orderIds = [...new Set(orders?.map((order) => order.order_id) || [])];
  // Get order_township from order
  const order_township = [
    ...new Set(orders?.map((order) => order.township) || []),
  ];
  // Get order_region from order
  const order_region = [...new Set(orders?.map((order) => order.region) || [])];
  // Filtered orders based on township & region
  const filteredOrders = orders?.filter((order) => {
    const townshipMatch = township ? order.township === township : true;
    const regionMatch = region ? order.region === region : true;

    return townshipMatch && regionMatch;
  });

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-evenly", mb: 4 }}>
        {/* township Dropdown */}
        <FormControl variant="outlined" size="small" fullWidth>
          <InputLabel>Filter by Township</InputLabel>
          <Select
            value={township}
            onChange={(e) => setTownship(e.target.value)}
            label="Filter by Township"
          >
            <MenuItem value="">All Townships</MenuItem>
            {order_township.map((town) => (
              <MenuItem key={town} value={town}>
                {town}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* region Dropdown */}
        <FormControl variant="outlined" size="small" fullWidth>
          <InputLabel>Filter by region</InputLabel>
          <Select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            label="Filter by Township"
          >
            <MenuItem value="">All Regions</MenuItem>
            {order_region.map((region) => (
              <MenuItem key={region} value={region}>
                {region}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell align="center">Order_id</TableCell>
              <TableCell align="center">Customer</TableCell>
              <TableCell align="center">Product</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="center">Township</TableCell>
              <TableCell align="center">Region</TableCell>
              <TableCell align="center">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderIds.map((id) => {
              const findData = filteredOrders.filter((o) => o.order_id === id);

              if (!findData.length) return;
              return findData.map((find, index) => {
                return (
                  <TableRow key={id}>
                    {index === 0 && (
                      <>
                        <TableCell rowSpan={findData.length} align="left">
                          {new Date(find.order_date).toLocaleDateString()}
                        </TableCell>
                        <TableCell rowSpan={findData.length} align="center">
                          {find.order_id}
                        </TableCell>
                        <TableCell rowSpan={findData.length} align="center">
                          {find.customer_name}
                        </TableCell>
                      </>
                    )}
                    <TableCell align="center">{find.product_name}</TableCell>
                    <TableCell align="center">{find.quantity}</TableCell>
                    <TableCell align="center">{find.township}</TableCell>
                    <TableCell align="center">{find.region}</TableCell>
                    <TableCell align="center">{find.status}</TableCell>
                    {index === 0 && (
                      <TableCell align="center" rowSpan={findData.length}>
                        <Button
                          disabled={selectOrderId.find((s) =>
                            s === find.order_id ? true : false
                          )}
                          variant="contained"
                          size="small"
                          onClick={() => {
                            handleAdd(find.order_id);
                          }}
                        >
                          +
                        </Button>
                      </TableCell>
                    )}
                  </TableRow>
                );
              });
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <AssignTruck
        assignOrderId={assignOrderId}
        orders={orders}
        setAssignOrderId={setAssignOrderId}
        setSelectOrderId={setSelectOrderId}
        selectOrderId={selectOrderId}
      />
    </>
  );
}
