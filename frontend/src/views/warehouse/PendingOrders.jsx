import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Paper,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  TextField,
} from "@mui/material";
import AssignTruck from "./components/AssignPage";
import { fetchWarehouseOrders } from "../../actions/warehouseOrderActions";
import { fetchDrivers } from "../../actions/driverActions";
import { fetchTrucks } from "../../actions/truckActions";

export default function CustomizedTables() {
  const dispatch = useDispatch();
  const warehouseOrders = useSelector(
    (state) => state.warehouseOrders.warehouseOrders
  );
  const drivers = useSelector((state) => state.drivers.drivers);
  const trucks = useSelector((state) => state.trucks.trucks);

  const [region, setRegion] = useState("");
  const [township, setTownship] = useState("");
  const [searchOrder, setSearchOrder] = useState("");
  const [assignOrderId, setAssignOrderId] = useState([]);
  const [selectOrderId, setSelectOrderId] = useState([]);

  const handleAdd = (orderId) => {
    setSelectOrderId([...selectOrderId, orderId]);
    setAssignOrderId([...assignOrderId, orderId]);
  };

  useEffect(() => {
    dispatch(fetchDrivers());
    dispatch(fetchTrucks());
    dispatch(fetchWarehouseOrders());
  }, [dispatch]);

  // Get warehouse orders
  const orders = Array.isArray(warehouseOrders) ? warehouseOrders : [];
  const orderIds = [...new Set(orders.map((order) => order.order_id))];
  const order_township = [...new Set(orders.map((order) => order.township))];
  const order_region = [...new Set(orders.map((order) => order.region))];

  // Filtered orders based on search, township & region
  const filteredOrders = orders.filter((order) => {
    const searchMatch = searchOrder
      ? order.order_id.toString().includes(searchOrder)
      : true;
    const townshipMatch = township ? order.township === township : true;
    const regionMatch = region ? order.region === region : true;
    return searchMatch && townshipMatch && regionMatch;
  });

  return (
    <>
      <AssignTruck
        assignOrderId={assignOrderId}
        orders={orders}
        setAssignOrderId={setAssignOrderId}
        setSelectOrderId={setSelectOrderId}
        selectOrderId={selectOrderId}
        driver_info={drivers}
        trucks={trucks}
      />
      <Box sx={{ display: "flex", my: 2, gap: 2, alignItems: "center" }}>
        <TextField
          size="small"
          label="Search Order No"
          variant="outlined"
          sx={{ minWidth: 200, zIndex: 0 }}
          value={searchOrder}
          onChange={(e) => setSearchOrder(e.target.value)}
        />
        <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
          <InputLabel sx={{ zIndex: 0 }}>Filter by Region</InputLabel>
          <Select value={region} onChange={(e) => setRegion(e.target.value)}>
            <MenuItem value="">All Regions</MenuItem>
            {order_region.map((region) => (
              <MenuItem key={region} value={region}>
                {region}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
          <InputLabel sx={{ zIndex: 0 }}>Filter by Township</InputLabel>
          <Select
            value={township}
            onChange={(e) => setTownship(e.target.value)}
          >
            <MenuItem value="">All Townships</MenuItem>
            {order_township.map((town) => (
              <MenuItem key={town} value={town}>
                {town}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
            <TableRow>
              <TableCell>Date and Time</TableCell>
              <TableCell align="left">Order No</TableCell>
              <TableCell align="left">Customer</TableCell>
              <TableCell align="left">Product</TableCell>
              <TableCell align="left">Quantity</TableCell>
              <TableCell align="left">Township</TableCell>
              <TableCell align="left">Region</TableCell>
              <TableCell align="left">Assign</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderIds.map((id) => {
              const findData = filteredOrders.filter((o) => o.order_id === id);
              if (!findData.length) return null;
              return findData.map((find, index) => (
                <TableRow key={`${id}-${index}`}>
                  {index === 0 && (
                    <>
                      <TableCell
                        rowSpan={findData.length}
                        align="left"
                        sx={{ borderBottom: 1 }}
                      >
                        {new Date(find.order_date).toLocaleString()}
                      </TableCell>
                      <TableCell
                        rowSpan={findData.length}
                        align="left"
                        sx={{ borderBottom: 1 }}
                      >
                        Order#{find.order_id}
                      </TableCell>
                      <TableCell
                        rowSpan={findData.length}
                        align="left"
                        sx={{ borderBottom: 1 }}
                      >
                        {find.customer_name}
                      </TableCell>
                    </>
                  )}
                  <TableCell
                    align="left"
                    sx={{ borderBottom: index === findData.length - 1 ? 1 : 0 }}
                  >
                    {find.product_name}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ borderBottom: index === findData.length - 1 ? 1 : 0 }}
                  >
                    {find.quantity}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ borderBottom: index === findData.length - 1 ? 1 : 0 }}
                  >
                    {find.township}
                  </TableCell>
                  <TableCell
                    align="left"
                    sx={{ borderBottom: index === findData.length - 1 ? 1 : 0 }}
                  >
                    {find.region}
                  </TableCell>
                  {index === 0 && (
                    <TableCell
                      align="left"
                      rowSpan={findData.length}
                      sx={{ borderBottom: 1 }}
                    >
                      <Button
                        disabled={selectOrderId.includes(find.order_id)}
                        variant="contained"
                        size="small"
                        onClick={() => handleAdd(find.order_id)}
                      >
                        +
                      </Button>
                    </TableCell>
                  )}
                </TableRow>
              ));
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
