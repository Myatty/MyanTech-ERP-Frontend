import { useDispatch } from "react-redux";
import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, Button } from "@mui/material/";
import { IconProgressCheck } from "@tabler/icons-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  TextField,
} from "@mui/material";
import axios from "axios";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const DeliverHistory = () => {
  //fetch endpoint for data which only Delivering & Delivered order
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  //For filtering
  const [driver, setDriver] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  //func for clicking complete button
  const handleClick = async (orderId) => {
    const changeStatus = orders.map((item) =>
      item.order_id === orderId ? { ...item, status: "Delivered" } : item
    );
    setOrders(changeStatus);
    try {
      await axios.post(
        //replace with correct endpoint
        `http://localhost:4000/api/status`,
        [orderId]
      );
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };

  //func for clicking complete all button
  const handleAllClick = async () => {
    const allOrderIds = filteredOrders
      .filter((item) => item.status === "Delivering")
      .map((o) => o.order_id);
    const changeStatus = orders.map((item) =>
      allOrderIds.includes(item.order_id)
        ? { ...item, status: "Delivered" }
        : item
    );
    setOrders(changeStatus);
    try {
      await axios.post(
        //replace with correct endpoint
        `http://localhost:4000/api/status`,
        allOrderIds
      );
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };

  useEffect(() => {
    //you must fill with real data
    setOrders(allOrders);
  }, []);

  // useEffect(() => {
  //   dispatch(fetchData());
  // }, [dispatch]);

  //delete allOrders when  real data get
  const allOrders = [
    {
      order_id: 1,
      customer_name: "Su Su",
      status: "Delivering",
      order_date: "Wed Feb 11 2025 13:40:56 GMT+0630",
      township: "ALone",
      region: "Yangon",
      driver: "U Ba",
      truck: "YGN/245",
    },
    {
      order_id: 2,
      customer_name: "Hla Hla",
      status: "Delivering",
      order_date: "Wed Feb 11 2025 13:40:56 GMT+0630",
      township: "Bahan",
      region: "Yangon",
      driver: "U Ba",
      truck: "YGN/245",
    },
    {
      order_id: 3,
      customer_name: "Mg Mg",
      status: "Delivered",
      order_date: "Wed Feb 11 2025 13:40:56 GMT+0630",
      township: "Sanchaung",
      region: "Yangon",
      driver: "U Hla",
      truck: "YGN/945",
    },
    {
      order_id: 4,
      customer_name: "Kyaw Kyaw",
      status: "Delivering",
      order_date: "Wed Feb 13 2025 12:40:56 GMT+0630",
      township: "ALone",
      region: "Yangon",
      driver: "U Mg",
      truck: "YGN/115",
    },
    {
      order_id: 5,
      customer_name: "Ye Ye",
      status: "Delivered",
      order_date: "Wed Feb 14 2025 12:40:56 GMT+0630",
      township: "Tamwe",
      region: "Yangon",
      driver: "U Taung",
      truck: "YGN/145",
    },
    {
      order_id: 6,
      customer_name: "Gu GU",
      status: "Delivering",
      order_date: "Wed Mar 11 2025 12:40:56 GMT+0630",
      township: "Tamwe",
      region: "Yangon",
      driver: "U Taung",
      truck: "YGN/145",
    },
  ];
  // Get orderId from order
  const drivers = [...new Set(orders?.map((order) => order.driver) || [])];
  // Get order_status from order
  const order_status = [...new Set(orders?.map((order) => order.status) || [])];

  // Filtered orders based on order_id & status
  const filteredOrders = orders?.filter((order) => {
    const DriverMatch = driver ? order.driver === driver : true;
    const StatusMatch = status ? order.status === status : true;
    const DateMatch =
      startDate || endDate
        ? new Date(order.order_date).getTime() >=
            new Date(startDate).getTime() &&
          new Date(order.order_date).getTime() <= new Date(endDate).getTime()
        : true;

    return DateMatch && DriverMatch && StatusMatch;
  });
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          mb: 4,
          alignItems: "center",
        }}
      >
        {/* date picker */}
        <Box>
          <Typography sx={{ mr: 2, fontWeight: "bold" }}>Start Date</Typography>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
          />
        </Box>
        <Box>
          <Typography sx={{ mr: 2, fontWeight: "bold" }}>End Date</Typography>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
          />
        </Box>

        {/* driver dropdown*/}
        <FormControl variant="outlined" size="small" sx={{ width: 200 }}>
          <InputLabel>Filter by drivers</InputLabel>
          <Select
            value={driver}
            onChange={(e) => setDriver(e.target.value)}
            label="Filter by drivers"
          >
            <MenuItem value="">All drivers</MenuItem>
            {drivers.map((d) => (
              <MenuItem key={d} value={d}>
                {d}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* status dropdown*/}
        <FormControl variant="outlined" size="small" sx={{ width: 200 }}>
          <InputLabel>Filter by status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Filter by status"
          >
            <MenuItem value="">All status</MenuItem>
            {order_status.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <label>Total Order quantity</label>
          <TextField
            value={filteredOrders.length}
            sx={{ ml: 2, width: 100 }}
          ></TextField>
        </Box>

        <Box
          fullweight
          sx={{ display: "flex", justifyContent: "right", mb: 4 }}
        >
          <Button variant="contained" onClick={handleAllClick}>
            Complete All
          </Button>
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Driver</StyledTableCell>
              <StyledTableCell>Truck</StyledTableCell>
              <StyledTableCell align="center">Order No</StyledTableCell>
              <StyledTableCell align="center">Customer</StyledTableCell>
              <StyledTableCell align="center">Township</StyledTableCell>
              <StyledTableCell align="center">Region</StyledTableCell>
              <StyledTableCell align="center">Status</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredOrders.map((fo) => {
              const completeIcon = (
                <IconProgressCheck stroke={1.5} size="1.6rem" />
              );
              return (
                <StyledTableRow>
                  <StyledTableCell>
                    {new Date(fo.order_date).toLocaleDateString()}
                  </StyledTableCell>
                  <StyledTableCell align="center">{fo.driver}</StyledTableCell>
                  <StyledTableCell align="center">{fo.truck}</StyledTableCell>
                  <StyledTableCell align="center">
                    {fo.order_id}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {fo.customer_name}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {fo.township}
                  </StyledTableCell>
                  <StyledTableCell align="center">{fo.region}</StyledTableCell>
                  <StyledTableCell align="center">{fo.status}</StyledTableCell>
                  <StyledTableCell align="center">
                    {fo.status === "Delivered" ? (
                      <Button>{completeIcon}</Button>
                    ) : (
                      <Button
                        variant="contained"
                        onClick={() => {
                          handleClick(fo.order_id);
                        }}
                      >
                        Complete
                      </Button>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default DeliverHistory;
