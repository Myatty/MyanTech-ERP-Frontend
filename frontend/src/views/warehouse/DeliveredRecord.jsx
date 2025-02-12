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
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Autocomplete,
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
  const [orderId, setsOrderId] = useState(0);
  const [status, setStatus] = useState("");

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
    const allOrderIds = orders
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
      order_date: "Wed Feb 11 2025 15:40:56 GMT+0630",
      township: "ALone",
      region: "Yangon",
    },
    {
      order_id: 2,
      customer_name: "Hla Hla",
      status: "Delivering",
      order_date: "Wed Feb 11 2025 15:40:56 GMT+0630",
      township: "Bahan",
      region: "Yangon",
    },
    {
      order_id: 3,
      customer_name: "Mg Mg",
      status: "Delivered",
      order_date: "Wed Feb 11 2025 15:40:56 GMT+0630",
      township: "Sanchaung",
      region: "Yangon",
    },
    {
      order_id: 4,
      customer_name: "Kyaw Kyaw",
      status: "Delivering",
      order_date: "Wed Feb 11 2025 15:40:56 GMT+0630",
      township: "ALone",
      region: "Yangon",
    },
    {
      order_id: 5,
      customer_name: "Ye Ye",
      status: "Delivered",
      order_date: "Wed Feb 11 2025 15:40:56 GMT+0630",
      township: "Tamwe",
      region: "Yangon",
    },
  ];
  // Get orderId from order
  const orderIds = [...new Set(orders?.map((order) => order.order_id) || [])];
  // Get order_status from order
  const order_status = [...new Set(orders?.map((order) => order.status) || [])];

  // Filtered orders based on order_id & status
  const filteredOrders = orders?.filter((order) => {
    const orderIdMatch = orderId ? order.order_id === orderId : true;
    const statusMatch = status ? order.status === status : true;

    return orderIdMatch && statusMatch;
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
        {/* orderId Dropdown */}
        <Autocomplete
          sx={{ width: 200 }}
          options={orderIds}
          getOptionLabel={(order) => order}
          onChange={(event, newValue) => setsOrderId(newValue)}
          renderInput={(params) => (
            <TextField {...params} label="Select order_id" />
          )}
        />

        {/* status dropdown*/}
        <FormControl variant="outlined" size="small" sx={{ width: 200 }}>
          <InputLabel>Filter by Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Filter by status"
          >
            <MenuItem value="">All</MenuItem>
            {order_status.map((status) => (
              <MenuItem key={status} value={status}>
                {status}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Box fullweight sx={{ display: "flex", justifyContent: "right", mb: 4 }}>
        <Button variant="contained" onClick={handleAllClick}>
          Complete All
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell align="right">Order_Id</StyledTableCell>
              <StyledTableCell align="right">Customer</StyledTableCell>
              <StyledTableCell align="right">Township</StyledTableCell>
              <StyledTableCell align="right">Region</StyledTableCell>
              <StyledTableCell align="right">Status</StyledTableCell>
              <StyledTableCell align="right"></StyledTableCell>
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
                  <StyledTableCell align="right">{fo.order_id}</StyledTableCell>
                  <StyledTableCell align="right">
                    {fo.customer_name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{fo.township}</StyledTableCell>
                  <StyledTableCell align="right">{fo.region}</StyledTableCell>
                  <StyledTableCell align="right">{fo.status}</StyledTableCell>
                  <StyledTableCell align="right">
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
