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
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const SaleHistoryPage = () => {
  const dispatch = useDispatch();
  const [selecteddate, setSelectedDate] = useState(new Date());
  //const { loading, orders, error } = useSelector((state) => state.orders);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [status, setStatus] = useState(""); // Category filter state
  const [ids, setIds] = useState(0); // Category filter state
  //delete loading & orders when real data get
  const loading = false;
  const orders = [
    {
      order_date: "Wed Feb 10 2025 15:40:56 GMT+0630",
      order_id: 30,
      customer: "Su Su",
      product_name: "Apple Mac",
      qty: 5,
      totalPrice: 5000,
      status: "Pending",
    },
    {
      order_date: "Wed Feb 10 2025 15:40:56 GMT+0630",
      order_id: 20,
      customer: "Kyaw Kyaw",
      product_name: "Hp Omen 25L",
      qty: 10,
      totalPrice: 10000,
      status: "Pending",
    },
    {
      order_date: "Wed Feb 11 2025 15:40:56 GMT+0630",
      order_id: 10,
      customer: "Tun Tun",
      product_name: "Hp Omen 25L",
      qty: 4,
      totalPrice: 4000,
      status: "Delivering",
    },
    {
      order_date: "Wed Feb 11 2025 15:40:56 GMT+0630",
      order_id: 50,
      customer: "Hla Hla",
      product_name: "Acer",
      qty: 2,
      totalPrice: 1000,
      status: "Delivered",
    },
  ];

  useEffect(() => {
    // dispatch(fetchOrders());
  }, []);

  const handleEdit = (row) => {
    alert(`Edit product ID: ${row._id || row.id}`);
  };

  // Get status from order
  const orderStatus = [...new Set(orders?.map((order) => order.status) || [])];

  // Get orderId from order
  const orderIds = [...new Set(orders?.map((order) => order.order_id) || [])];

  // Filtered orders based on date & status & orderId
  const filteredOrders = orders?.filter(
    (order) =>
      (selecteddate
        ? new Date(order.order_date).toLocaleDateString() ===
          new Date(selecteddate).toLocaleDateString()
        : true) &&
      (status ? order.status === status : true) &&
      (ids ? order.order_id === ids : true)
  );
  console.log("date", selecteddate);
  //
  const csvHeaders = [
    { label: "Item Name", key: "name" },
    { label: "Brand", key: "brand" },
    { label: "Category", key: "category" },
    { label: "Product Segment", key: "product_segment" },
    { label: "Serial Number", key: "serial_number" },
    { label: "Unit Price", key: "price" },
    { label: "Quantity", key: "stock_quantity" },
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
      name: "Order_id",
      selector: (row) => row.order_id,
      sortable: true,
      width: "140px",
    },
    {
      name: "Customer",
      selector: (row) => row.customer,
      sortable: true,
      width: "140px",
    },
    {
      name: "Product_Name",
      selector: (row) => row.product_name,
      sortable: true,
      width: "160px",
    },
    {
      name: "Quantity",
      selector: (row) => row.qty,
      sortable: true,
      width: "120px",
    },
    {
      name: "Total_Price",
      selector: (row) => row.totalPrice,
      sortable: true,
      width: "130px",
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
      width: "100px",
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

        {/* Date & order_id & status Filter Section */}
        <Box
          display="flex"
          sx={{ width: "80%", alignItems: "center" }}
          gap={2}
          mb={2}
        >
          {/* Date */}
          <Box sx={{ mx: 2, display: "flex", width: 300 }}>
            <Typography sx={{ mr: 2, fontWeight: "bold" }}>Date</Typography>
            <DatePicker
              selected={selecteddate}
              onChange={(date) => {
                setSelectedDate(date);
              }}
            />
          </Box>

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
              label="Filter by order_id"
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
