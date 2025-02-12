import * as React from "react";
import { useState, useEffect } from "react";
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
import { fetchWarehouseOrders } from "../../actions/warehouseOrderActions";
import { fetchDrivers } from "../../actions/driverActions";
import { fetchTrucks } from "../../actions/truckActions";

export default function CustomizedTables() {
  const dispatch = useDispatch();
  const warehouseOrders = useSelector((state) => state.warehouseOrders.warehouseOrders);
  const drivers = useSelector((state) => state.drivers.drivers);
  const trucks = useSelector((state) => state.trucks.trucks);
  console.log("trucks :", trucks);

  const [region, setRegion] = useState("");
  const [township, setTownship] = useState("");
  const [assignOrderId, setAssignOrderId] = useState([]);
  const [selectOrderId, setSelectOrderId] = useState([]);

  const handleAdd = (orderId) => {
    setSelectOrderId([...selectOrderId, orderId]);
    setAssignOrderId([...assignOrderId, orderId]);
  };

  useEffect(() => { dispatch(fetchDrivers()) }, [dispatch]);
  useEffect(() => { dispatch(fetchTrucks()) }, [dispatch]);

  useEffect(() => {
    dispatch(fetchWarehouseOrders()).then((response) => {
      console.log("API call response:", response);
    }).catch((error) => {
      console.error("API call error:", error);
    });
  }, [dispatch]);

  // drivers
  const driversList = Array.isArray(drivers) ? drivers : [];
  const driver_names = driversList.map((driver) => driver.driver_name);

  // trucks
  const trucksList = Array.isArray(trucks) ? trucks : [];
  const license_plate = trucksList.map((truck) => truck.license_plate);

  // warehouse orders
  const orders = Array.isArray(warehouseOrders) ? warehouseOrders : [];

  const orderIds = [...new Set(orders.map((order) => order.order_id))];
  const order_township = [...new Set(orders.map((order) => order.township))];
  const order_region = [...new Set(orders.map((order) => order.region))];

  // Filtered orders based on township & region
  const filteredOrders = orders.filter((order) => {
    const townshipMatch = township ? order.township === township : true;
    const regionMatch = region ? order.region === region : true;

    return townshipMatch && regionMatch;
  });

  // Ensure the selected values are valid
  useEffect(() => {
    if (township && !order_township.includes(township)) {
      setTownship("");
    }
    if (region && !order_region.includes(region)) {
      setRegion("");
    }
  }, [order_township, order_region, township, region]);

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
          <InputLabel>Filter by Region</InputLabel>
          <Select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            label="Filter by Region"
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
              <TableCell>Date and Time</TableCell>
              <TableCell align="center">Order Number</TableCell>
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

              if (!findData.length) return null;
              return findData.map((find, index) => (
                <TableRow key={id}>
                  {index === 0 && (
                    <>
                      <TableCell rowSpan={findData.length} align="left">
                        {new Date(find.order_date).toLocaleString(undefined, {
                          year: 'numeric',
                          month: '2-digit',
                          day: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </TableCell>
                      <TableCell rowSpan={findData.length} align="center">
                        Order#{find.order_id}
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

      <AssignTruck
        assignOrderId={assignOrderId}
        orders={orders}
        setAssignOrderId={setAssignOrderId}
        setSelectOrderId={setSelectOrderId}
        selectOrderId={selectOrderId}
        driver_info={driversList}
        trucks={trucksList}
      />
    </>
  );
}