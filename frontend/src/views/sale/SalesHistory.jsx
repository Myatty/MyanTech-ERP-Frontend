import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv"; // For exporting CSV
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { FormControl, InputLabel, Select } from "@mui/material";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { fetchOrders } from "../../actions/orderActions";

const SaleHistoryPage = () => {
  const dispatch = useDispatch();
  const { loading, orders, error } = useSelector((state) => state.orders);
  const [selectedRows, setSelectedRows] = useState([]);
  const [status, setStatus] = useState(""); // Category filter state
  const [ids, setIds] = useState(""); // Initialize with an empty string

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  useEffect(() => {
    console.log("Fetched Orders:", orders); // Debugging log
  }, [orders]);

  const handleEdit = (row) => {
    alert(`Edit product ID: ${row.order_id}`);
  };

  // Get status from order
  const orderStatus = [...new Set(orders?.map((order) => order.status) || [])];

  // Get orderId from order
  const orderIds = [...new Set(orders?.map((order) => order.order_id) || [])];

  // Filtered orders based on status & orderId
  const filteredOrders = orders?.filter((order) => {
    const statusMatch = status ? order.status === status : true;
    const idMatch = ids ? order.order_id === Number(ids) : true;

    return statusMatch && idMatch;
  });

  console.log("Filtered Orders:", filteredOrders); // Debugging log

  const csvHeaders = [
    { label: "Order ID", key: "order_id" },
    { label: "Customer ID", key: "customer_id" },
    { label: "Order Date", key: "order_date" },
    { label: "Status", key: "status" },
    { label: "Total Amount", key: "total_amount" },
  ];

  const csvReport = {
    data: filteredOrders,
    headers: csvHeaders,
    filename: "SaleHistoryReport.csv",
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
      name: "Order ID",
      selector: (row) => row.order_id,
      sortable: true,
      width: "140px",
    },
    {
      name: "Customer ID",
      selector: (row) => row.customer_id,
      sortable: true,
      width: "140px",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      width: "100px",
    },
    {
      name: "Total Amount",
      selector: (row) => row.total_amount,
      sortable: true,
      width: "130px",
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <IconPencil
            stroke={1.5}
            size="1.3rem"
            style={{ cursor: "pointer", color: "blue", marginRight: "10px" }}
            onClick={() => handleEdit(row)}
          />

          <IconTrash
            stroke={1.5}
            size="1.3rem"
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => handleEdit(row)}
          />
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#5D87FF", // Change this to your desired color
        minHeight: "56px",
        borderTopRightRadius: "8px",
        borderTopLeftRadius: "8px",
      },
    },
    headCells: {
      style: {
        color: "#FFF", // Text color
        fontSize: "14px",
        fontWeight: "bold",
        "&:not(:last-of-type)": {
          borderRight: "1px solid #e0e0e0",
        },
      },
    },
  };

  const handleSelectedRowsChange = (state) => {
    setSelectedRows(state.selectedRows);
  };

  return (
    <PageContainer title="Sale History" description="this is product page">
      <DashboardCard>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2>Sale History List</h2>
          <div>
            <CSVLink {...csvReport} style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary">
                Export
              </Button>
            </CSVLink>
          </div>
        </div>

        {/* Status & order_id Filter Section */}
        <Box
          display="flex"
          sx={{ width: "80%", alignItems: "center" }}
          gap={2}
          mb={2}
        >
          {/* status Dropdown */}
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel>Filter by Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              label="Filter by Status"
            >
              <MenuItem value="">All Categories</MenuItem>
              {orderStatus.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* order_Id Dropdown */}
          <FormControl variant="outlined" size="small" fullWidth>
            <InputLabel>Filter by order_id</InputLabel>
            <Select
              value={ids}
              onChange={(e) => setIds(e.target.value)}
              label="Filter by Order ID"
            >
              <MenuItem value="">All Order_Id</MenuItem>
              {orderIds.map((id) => (
                <MenuItem key={id} value={id}>
                  {id}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {/* Show Skeleton while Loading */}
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
            data={filteredOrders} // Use filtered data
            pagination
            highlightOnHover
            striped
            selectableRows
            onSelectedRowsChange={handleSelectedRowsChange}
            subHeaderAlign="center"
            customStyles={customStyles}
          />
        )}
      </DashboardCard>
    </PageContainer>
  );
};

export default SaleHistoryPage;