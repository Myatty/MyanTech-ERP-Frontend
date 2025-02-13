import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { IconProgressCheck } from "@tabler/icons-react";
import axios from "axios";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import Skeleton from "@mui/material/Skeleton";
import { fetchAllDrivers } from "../../actions/allDriverActions";
import { fetchDeliveries } from "../../actions/deliveryActions";

const DeliverHistory = () => {
  const dispatch = useDispatch();
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [driver, setDriver] = useState("");
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [openToast, setOpenToast] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState("");

  const allDrivers = useSelector((state) => state.allDrivers.allDrivers);
  const driversLoading = useSelector((state) => state.allDrivers.loading);
  const driversError = useSelector((state) => state.allDrivers.error);
  const allDeliveries = useSelector((state) => state.deliveries.deliveries);
  const deliveriesLoading = useSelector((state) => state.deliveries.loading);
  const deliveriesError = useSelector((state) => state.deliveries.error);

  const apiUrl = import.meta.env.VITE_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllDrivers());
    dispatch(fetchDeliveries());
  }, [dispatch]);

  useEffect(() => {
    if (!driversLoading && !deliveriesLoading) {
      setLoading(false);
    }
  }, [driversLoading, deliveriesLoading]);

  useEffect(() => {
    console.log("All Drivers:", allDrivers);
    console.log("Drivers Loading:", driversLoading);
    console.log("Drivers Error:", driversError);
    console.log("All Deliveries:", allDeliveries);
    console.log("Deliveries Loading:", deliveriesLoading);
    console.log("Deliveries Error:", deliveriesError);
  }, [allDrivers, driversLoading, driversError, allDeliveries, deliveriesLoading, deliveriesError]);

  useEffect(() => {
    if (snackbarOpen) {
      dispatch(fetchDeliveries()); // Fetch new deliveries after update
    }
  }, [snackbarOpen, dispatch]);

  const handleClick = async (deliveryId) => {
    console.log("Before Update:", allDeliveries); // Check current deliveries before update
  
    try {
      // ✅ Update local UI immediately
      const updatedDeliveries = allDeliveries.map((item) =>
        item.delivery_id === deliveryId ? { ...item, status: "delivered" } : item
      );
      dispatch({ type: "UPDATE_DELIVERIES", payload: updatedDeliveries });
  
      console.log("After Dispatch:", updatedDeliveries); // Check if state is updated
  
      await axios.put(`${apiUrl}/api/deliveries/update/${deliveryId}`, { status: "delivered" });
  
      setSnackbarMessage(`Delivery ID ${deliveryId} marked as Delivered`);
      setOpenToast(true);
  
      dispatch(fetchDeliveries());
  
    } catch (error) {
      console.error("Error changing status:", error);
      setSnackbarMessage("Error updating delivery status");
      setSnackbarSeverity("error");
      setOpenToast(true);
    }
  };
  

  useEffect(() => {
    if (snackbarOpen) {
      dispatch(fetchDeliveries()); // Re-fetch updated data
    }
  }, [snackbarOpen, dispatch]);


  const handleAllClick = async () => {
    const allDeliveryIds = filteredDeliveries
      .filter((item) => item.status === "delivering")
      .map((o) => o.delivery_id);
    const changeStatus = allDeliveries.map((item) =>
      allDeliveryIds.includes(item.delivery_id)
        ? { ...item, status: "Delivered" }
        : item
    );
    dispatch({ type: 'UPDATE_DELIVERIES', payload: changeStatus });
    try {
      console.log(`PUT requests to ${apiUrl}/api/update/ for delivery IDs:`, allDeliveryIds);
      await Promise.all(
        allDeliveryIds.map((deliveryId) =>
          axios.put(`${apiUrl}/api/deliveries/update/${deliveryId}`, { status: "Delivered" })
        )
      );
      setSnackbarMessage("All delivery statuses updated successfully");
      setSnackbarOpen(true);
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenToast(false);
    setSnackbarOpen(false);
  };

  const order_status = [...new Set(allDeliveries?.map((delivery) => delivery.status) || [])];

  const filteredDeliveries = allDeliveries?.filter((delivery) => {
    const DriverMatch = driver ? delivery.driver_id === driver : true;
    const StatusMatch = status ? delivery.status === status : true;
    const DateMatch =
      startDate || endDate
        ? new Date(delivery.departure_time).getTime() >=
        new Date(startDate).getTime() &&
        new Date(delivery.departure_time).getTime() <= new Date(endDate).getTime()
        : true;

    return DateMatch && DriverMatch && StatusMatch;
  });

  const csvHeaders = [
    { label: "Delivery ID", key: "delivery_id" },
    { label: "Driver ID", key: "driver_id" },
    { label: "Truck ID", key: "truck_id" },
    { label: "Departure Time", key: "departure_time" },
    { label: "Status", key: "status" },
  ];

  const csvReport = {
    data: filteredDeliveries,
    headers: csvHeaders,
    filename: "DeliveryHistoryReport.csv",
  };

  const columns = [
    { name: "No", selector: (row, index) => index + 1, width: "60px" },
    {
      name: "Date",
      selector: (row) => new Date(row.departure_time).toLocaleDateString(),
      sortable: true,
      width: "150px",
    },
    {
      name: "Driver ID",
      selector: (row) => row.driver_id,
      sortable: true,
      width: "150px",
    },
    {
      name: "Truck ID",
      selector: (row) => row.truck_id,
      sortable: true,
      width: "150px",
    },
    {
      name: "Delivery ID",
      selector: (row) => row.delivery_id,
      sortable: true,
      width: "150px",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      width: "150px",
    },
    {
      name: "Action",
      cell: (row) => (
        <Button
          variant="contained"
          onClick={() => handleClick(row.delivery_id)}
          disabled={row.status === "delivered"}
        >
          {row.status === "delivered" ? (
            <IconProgressCheck stroke={1.5} size="1.6rem" />
          ) : (
            "Complete"
          )}
        </Button>
      ),
      width: "150px",
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#5D87FF",
        minHeight: "56px",
        borderTopRightRadius: "8px",
        borderTopLeftRadius: "8px",
      },
    },
    headCells: {
      style: {
        color: "#FFF",
        fontSize: "14px",
        fontWeight: "bold",
        "&:not(:last-of-type)": {
          borderRight: "1px solid #e0e0e0",
        },
      },
    },
  };

  return (
    <PageContainer
      title="Delivery History"
      description="this is delivery history page"
    >
      <DashboardCard>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2>Delivery History List</h2>
          <div>
            <CSVLink {...csvReport} style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary">
                Export
              </Button>
            </CSVLink>
          </div>
        </div>

        <Box
          display="flex"
          sx={{ width: "60%", alignItems: "center" }}
          gap={2}
          mb={2}
        >
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel>Filter by Driver</InputLabel>
            <Select
              value={driver}
              onChange={(e) => setDriver(e.target.value)}
              label="Filter by Driver"
            >
              <MenuItem value="">All Drivers</MenuItem>
              {allDrivers.map((d) => (
                <MenuItem key={d.driver_id} value={d.driver_id}>
                  {d.driver_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel>Filter by Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Filter by Status"
            >
              <MenuItem value="">All Status</MenuItem>
              {order_status.map((s) => (
                <MenuItem key={s} value={s}>
                  {s}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {loading ? (
          <Box>
            {[...Array(6)].map((_, index) => (
              <Box key={index} display="flex" alignItems="center" gap={2} p={1}>
                <Skeleton variant="text" width={40} />
                <Skeleton variant="text" width={150} />
                <Skeleton variant="text" width={130} />
                <Skeleton variant="text" width={120} />
                <Skeleton variant="text" width={160} />
                <Skeleton variant="text" width={100} />
                <Skeleton variant="text" width={110} />
                <Skeleton variant="text" width={90} />
              </Box>
            ))}
          </Box>
        ) : (
          <DataTable
            columns={columns}
            data={filteredDeliveries}
            pagination
            highlightOnHover
            striped
            customStyles={customStyles}
          />
        )}
      </DashboardCard>

      <Snackbar
        open={openToast}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </PageContainer>
  );
};

export default DeliverHistory;