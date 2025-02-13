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
import { Paper, Button, Autocomplete } from "@mui/material/";
import { IconProgressCheck } from "@tabler/icons-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  TextField,
  Menu,
} from "@mui/material";
import StatusModel from "./components/StatusModel";
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

const Return = () => {
  //fetch data from Return Order
  const dispatch = useDispatch();
  const [orderId, setOrderId] = useState(0);
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("Pending");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [retunOrders, setReturOrders] = useState([]);
  const [open, setOpen] = useState(false);

  const [obj, setObj] = useState({
    driver_id: null,
    truck_id: null,
    service_center_id: null,
    return_id: null,
    status: "",
    order_id: null,
    order_item_id: null,
  });

  //codes for clicking change status button
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  const statusOptions = {
    Pending: ["Pick_Up"],
    Pick_Up: ["Collected"],
    Collected: ["Service_Center", "Resolved"],
    Service_Center: ["Resolved"],
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (status) => {
    if (status === "Service_Center" || status === "Pick_Up") {
      setObj({ ...obj, status: status });
      return setOpen(true);
    } else {
      //you must keep code under this comment before try in fetch try
      if (status) {
        setSelectedStatus(status); // Set selected value;
        const filterData = retunOrders.map((item) =>
          item.return_id === obj.return_id ? { ...item, status: status } : item
        );
        setReturOrders(filterData);
      }
      setAnchorEl(null);
      //call fetch
      try {
        await axios.post(
          //replace with correct endpoint
          `http://localhost:4000/api/return`,
          { ...obj, status: status }
        );
      } catch (error) {
        console.error("Error changing status:", error);
      }
    }
  };

  console.log("status", selectedStatus);

  useEffect(() => {
    //you must fill with real data
    setReturOrders(allRetunOrders);
  }, []);

  //delete returnOrders when real data get
  const allRetunOrders = [
    {
      order_date: "Wed Feb 11 2025 13:40:56 GMT+0630",
      return_id: 1,
      product_name: "Apple",
      qty: 4,
      reason: "wrong order",
      status: "Pending",
      order_id: 1,
      order_item_id: 5,
    },
    {
      order_date: "Wed Feb 11 2025 13:40:56 GMT+0630",
      return_id: 2,
      product_name: "Dell",
      qty: 1,
      reason: "faulty product",
      status: "Pending",
      order_id: 1,
      order_item_id: 4,
    },
    {
      order_date: "Wed Feb 11 2025 13:40:56 GMT+0630",
      return_id: 3,
      product_name: "Lenovo",
      qty: 3,
      reason: "wrong order",
      status: "Pending",
      order_id: 2,
      order_item_id: 3,
    },
    {
      order_date: "Wed Feb 13 2025 12:40:56 GMT+0630",
      return_id: 4,
      product_name: "Apple",
      qty: 2,
      reason: "faulty product",
      status: "Pending",
      order_id: 2,
      order_item_id: 2,
    },
    {
      order_date: "Wed Feb 14 2025 12:40:56 GMT+0630",
      return_id: 5,
      product_name: "Lenovo",
      qty: 2,
      reason: "wrong order",
      status: "Pending",
      order_id: 3,
      order_item_id: 5,
    },
  ];
  // Get return_id from returnOrder
  const orderIds = [
    ...new Set(retunOrders?.map((order) => order.return_id) || []),
  ];
  // Get reason from returnOrder
  const reasons = [...new Set(retunOrders?.map((order) => order.reason) || [])];
  // Get status from returnOrder
  const order_status = [
    ...new Set(retunOrders?.map((order) => order.status) || []),
  ];

  // Filtered returnOrders based on return_id & status & reason
  const filteredReturnOrders = retunOrders?.filter((order) => {
    const ReasonMatch = reason ? order.reason === reason : true;
    const StatusMatch = status ? order.status === status : true;
    const OrderIdMatch = orderId ? order.return_id === orderId : true;
    const DateMatch =
      startDate || endDate
        ? new Date(order.order_date).getTime() >=
            new Date(startDate).getTime() &&
          new Date(order.order_date).getTime() <= new Date(endDate).getTime()
        : true;

    return ReasonMatch && StatusMatch && DateMatch;
  });
  return (
    <>
      {/* date picker */}
      <Box sx={{ width: 500, border: 1, p: 2, borderRadius: 2, mb: 3 }}>
        <label style={{ fontSize: 16 }}>Date Pick</label>
        <Box
          sx={{ display: "flex", justifyContent: "space-between", width: 450 }}
        >
          <Box>
            <Typography sx={{ mr: 2, fontWeight: "bold" }}>
              Start Date
            </Typography>
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
        </Box>
      </Box>

      {/* other filter */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          mb: 3,
        }}
      >
        {/* search returnID */}
        {/* <Autocomplete
          disablePortal
          options={orderIds}
          sx={{ width: 300 }}
          onChange={(e, newValue) => {
            setOrderId(newValue);
          }}
          renderInput={(params) => <TextField {...params} label="Order no" />}
        /> */}

        {/* reason dropdown */}
        <FormControl variant="outlined" size="small" sx={{ width: 200 }}>
          <InputLabel>Filter by reasons</InputLabel>
          <Select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            label="Filter by reason"
          >
            <MenuItem value="">All reason</MenuItem>
            {reasons.map((r) => (
              <MenuItem key={r} value={r}>
                {r}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {/* status dropdown */}
        <FormControl variant="outlined" size="small" sx={{ width: 200 }}>
          <InputLabel>Filter by status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            label="Filter by status"
          >
            {order_status.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Date</StyledTableCell>
              <StyledTableCell>Return no</StyledTableCell>
              <StyledTableCell>Product</StyledTableCell>
              <StyledTableCell>Retrun Quantity</StyledTableCell>
              <StyledTableCell>Return Reason</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredReturnOrders.map((item) => {
              const completeIcon = (
                <IconProgressCheck stroke={1.5} size="1.6rem" />
              );
              return (
                <StyledTableRow key={item.return_id}>
                  <StyledTableCell>
                    {new Date(item.order_date).toLocaleDateString()}
                  </StyledTableCell>
                  <StyledTableCell>{item.return_id}</StyledTableCell>
                  <StyledTableCell>{item.product_name}</StyledTableCell>
                  <StyledTableCell>{item.qty}</StyledTableCell>
                  <StyledTableCell>{item.reason}</StyledTableCell>
                  <StyledTableCell>{item.status}</StyledTableCell>
                  <StyledTableCell align="center">
                    {item.status === "Resolved" ? (
                      <Button>{completeIcon}</Button>
                    ) : (
                      <div>
                        <Button
                          variant="contained"
                          onClick={(e) => {
                            handleClick(e),
                              setObj({
                                ...obj,
                                return_id: item.return_id,
                                order_id: item.order_id,
                                order_item_id: item.order_item_id,
                              });
                          }}
                        >
                          Change Status
                        </Button>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={() => {
                            handleClose(null);
                          }}
                        >
                          {statusOptions[item.status].map((option) => (
                            <MenuItem
                              key={option}
                              onClick={() => handleClose(option)}
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </Menu>
                      </div>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <StatusModel
        open={open}
        setOpen={setOpen}
        setAnchorEl={setAnchorEl}
        setReturOrders={setReturOrders}
        setSelectedStatus={setSelectedStatus}
        retunOrders={retunOrders}
        obj={obj}
        setObj={setObj}
      />
    </>
  );
};
export default Return;
