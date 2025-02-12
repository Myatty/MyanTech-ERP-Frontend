import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Button,
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
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

const DeliverHistory = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([]);
  const [driver, setDriver] = useState("");
  const [status, setStatus] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setOrders(allOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const handleClick = async (orderId) => {
    const changeStatus = orders.map((item) =>
      item.order_id === orderId ? { ...item, status: "Delivered" } : item
    );
    setOrders(changeStatus);
    try {
      await axios.post(`http://localhost:4000/api/status`, [orderId]);
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };

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
      await axios.post(`http://localhost:4000/api/status`, allOrderIds);
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };

  const drivers = [...new Set(orders?.map((order) => order.driver) || [])];
  const order_status = [...new Set(orders?.map((order) => order.status) || [])];

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

  const csvHeaders = [
    { label: "Order ID", key: "order_id" },
    { label: "Customer Name", key: "customer_name" },
    { label: "Status", key: "status" },
    { label: "Order Date", key: "order_date" },
    { label: "Township", key: "township" },
    { label: "Region", key: "region" },
    { label: "Driver", key: "driver" },
    { label: "Truck No", key: "truck" },
  ];

  const csvReport = {
    data: filteredOrders,
    headers: csvHeaders,
    filename: "DeliveryHistoryReport.csv",
  };

  const columns = [
    { name: "No", selector: (row, index) => index + 1, width: "60px" },
    {
      name: "Date",
      selector: (row) => new Date(row.order_date).toLocaleDateString(),
      sortable: true,
      width: "150px",
    },
    {
      name: "Driver",
      selector: (row) => row.driver,
      sortable: true,
      width: "150px",
    },
    {
      name: "Truck No",
      selector: (row) => row.truck,
      sortable: true,
      width: "150px",
    },
    {
      name: "Order No",
      selector: (row) => row.order_id,
      sortable: true,
      width: "150px",
    },
    {
      name: "Customer",
      selector: (row) => row.customer_name,
      sortable: true,
      width: "150px",
    },
    {
      name: "Township",
      selector: (row) => row.township,
      sortable: true,
      width: "150px",
    },
    {
      name: "Region",
      selector: (row) => row.region,
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
          onClick={() => handleClick(row.order_id)}
          disabled={row.status === "Delivered"}
        >
          {row.status === "Delivered" ? (
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
              {drivers.map((d) => (
                <MenuItem key={d} value={d}>
                  {d}
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
            data={filteredOrders}
            pagination
            highlightOnHover
            striped
            customStyles={customStyles}
          />
        )}
      </DashboardCard>
    </PageContainer>
  );
};

export default DeliverHistory;
