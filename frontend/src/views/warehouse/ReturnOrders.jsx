import { useDispatch, useSelector } from "react-redux";
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
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import StatusModel from "./components/StatusModel";
import DashboardCard from "../../components/shared/DashboardCard";
import PageContainer from "../../components/container/PageContainer";
import { fetchReturnInfo } from "../../actions/returnInfoActions";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#5D87FF",
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

  const dispatch = useDispatch();
  const [orderId, setOrderId] = useState(0);
  const [reason, setReason] = useState("");
  const [status, setStatus] = useState("pending");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [retunOrders, setReturOrders] = useState([]);
  const [open, setOpen] = useState(false);
  const returnInfo = useSelector((state) => state.returnInfo.returnInfo);
  const apiUrl = import.meta.env.VITE_APP_API_URL;

  const [obj, setObj] = useState({
    driver_id: null,
    truck_id: null,
    service_center_id: null,
    return_id: null,
    status: "",
    order_id: null,
    order_item_id: null,
  });

  useEffect(() => {
    dispatch(fetchReturnInfo());
  }, [dispatch]);


  // const returnInfo = Array.isArray(returnInfoArray) ? returnInfoArray : [];
  console.log("returnInfo", returnInfo);
  console.log('ret info array ', returnInfo);

  const totalReturn = returnInfo?.total || 0;
  const serviceCount = returnInfo?.serviceCount || 0;
  const pendingCount = returnInfo?.pendingCount || 0;
  const pickUpCount = returnInfo?.pickupCount || 0;
  const collectedCount = returnInfo?.collectedCount || 0;
  const resolvedCount = returnInfo?.resolvedCount || 0;
  console.log('service ', pickUpCount);

  const results = returnInfo?.results || [];
  console.log('results ', results);
  const returnIds = [...new Set(results.map((rtOrder) => rtOrder.return_id))];
  console.log('returnIds ', returnIds);


  // const returnOrders = [ ...new Set(results.map((order) => order.return_id))];


  //codes for clicking change status button
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  const statusOptions = {
    pending: ["picked_up"],
    picked_Up: ["collected"],
    collected: ["service", "resolved"],
    service: ["resolved"],
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (status) => {
    if (status === "service" || status === "picked_up") {
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

          `${apiUrl}/api/return`,
          { ...obj, status: status }
        );
      } catch (error) {
        console.error("Error changing status:", error);
      }
    }
  };

  //console.log("status", selectedStatus);

  useEffect(() => {
    //you must fill with real data
    setReturOrders(results);
  }, []);

  // Get return_id from returnOrder
  const orderIds = [
    ...new Set(results?.map((order) => order.order_id) || []),
  ];
  console.log("orderIds", orderIds);

  // Get reason from returnOrder
  const reasons = [...new Set(results?.map((order) => order.return_reason) || [])];
  console.log("reasons", reasons);

  // Get status from returnOrder
  const order_status = [
    ...new Set(results?.map((order) => order.status) || []),
  ]; const filteredReturnOrders = results?.filter((order) => {
    const ReasonMatch = reason ? order.return_reason === reason : true;
    const StatusMatch = status ? order.status === status : true;
    const OrderIdMatch = orderId ? order.order_id === orderId : true;

    return ReasonMatch && StatusMatch && OrderIdMatch;
  });


  console.log("filteredReturnOrders", filteredReturnOrders);

  return (
    <PageContainer title="Return Orders" description="this is Return Orders">
      <DashboardCard>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2>Return Order List</h2>
        </div>

        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={6} md={2}>
            <Card variant="outlined" sx={{ backgroundColor: "#BBDEFB" }}>
              <CardContent>
                <Typography variant="subtitle1">Total Return</Typography>
                <Typography variant="h5">{totalReturn}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Card variant="outlined" sx={{ backgroundColor: "#FFCCBC" }}>
              <CardContent>
                <Typography variant="subtitle1">Pending</Typography>
                <Typography variant="h5">{pendingCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Card variant="outlined" sx={{ backgroundColor: "#FFF9C4" }}>
              <CardContent>
                <Typography variant="subtitle1">Pick Up</Typography>
                <Typography variant="h5">{pickUpCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Card variant="outlined" sx={{ backgroundColor: "#C8E6C9" }}>
              <CardContent>
                <Typography variant="subtitle1">Collected</Typography>
                <Typography variant="h5">{collectedCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Card variant="outlined" sx={{ backgroundColor: "#E1BEE7" }}>
              <CardContent>
                <Typography variant="subtitle1">Service Center</Typography>
                <Typography variant="h5">{serviceCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={2}>
            <Card variant="outlined" sx={{ backgroundColor: "#B3E5FC" }}>
              <CardContent>
                <Typography variant="subtitle1">Resolved</Typography>
                <Typography variant="h5">{resolvedCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* other filter */}
        <Box
          sx={{
            display: "flex",
            gap: 3,
            alignItems: "center",
            mb: 3,
          }}
        >
          {/* search returnID */}
          <Autocomplete
            disablePortal
            options={orderIds}
            sx={{ width: 200 }}
            size="small"
            onChange={(e, newValue) => {
              setOrderId(newValue);
            }}
            renderInput={(params) => <TextField {...params} label="Order No" />}
          />

          {/* reason dropdown */}
          <FormControl variant="outlined" size="small" sx={{ width: 200 }}>
            <InputLabel>Filter by Reasons</InputLabel>
            <Select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              label="Filter by Reasons"
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
            <InputLabel>Filter by Return Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Filter by Return Status"
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
                <StyledTableCell>Return no</StyledTableCell>
                <StyledTableCell>Order no</StyledTableCell>
                <StyledTableCell>Return Date</StyledTableCell>
                <StyledTableCell>Customer</StyledTableCell>
                <StyledTableCell>Product Name</StyledTableCell>
                <StyledTableCell>Quantity</StyledTableCell>
                <StyledTableCell>Return Reason</StyledTableCell>
                <StyledTableCell>Status</StyledTableCell>
                <StyledTableCell>Actions</StyledTableCell>
                <StyledTableCell></StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredReturnOrders.map((item) => {
                const completeIcon = (
                  <IconProgressCheck stroke={1.5} size="1.6rem" />
                );
                const itemOptions = statusOptions[item.status] || [];
                console.log("itemOptions", itemOptions);
                console.log('intm', item.status);

                return (
                  <StyledTableRow key={item.return_id}>

                    <StyledTableCell>{item.return_id}</StyledTableCell>
                    <StyledTableCell>Order #{item.order_id}</StyledTableCell>
                    <StyledTableCell>
                      {new Date(item.return_date).toLocaleDateString()}
                    </StyledTableCell>
                    <StyledTableCell>{item.customer_name}</StyledTableCell>
                    <StyledTableCell>{item.product_name}</StyledTableCell>
                    <StyledTableCell>{item.qty}</StyledTableCell>
                    <StyledTableCell>{item.return_reason}</StyledTableCell>
                    <StyledTableCell>{item.status}</StyledTableCell>
                    <StyledTableCell align="center">
                      {item.status === "resolved" ? (
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
                            {itemOptions.map((option) => (
                              <MenuItem key={option} onClick={() => handleClose(option)}>
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
      </DashboardCard>
    </PageContainer>
  );
};
export default Return;
