import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { IconProgressCheck } from "@tabler/icons-react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Menu,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
} from "@mui/material";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import { fetchInvoice, updateInvoice } from "../../actions/invoiceStatusAction";

const FinanceInvoice = () => {
  const dispatch = useDispatch();
  const allInvoices = useSelector((state) => state.invoiceStatus.invoices);
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState({ invoice_id: null, status: "" });
  const [anchorEl, setAnchorEl] = useState(null);

  const statusOptions = ["Pending", "Suspended", "Paid"];

  useEffect(() => {
    dispatch(fetchInvoice());
  }, [dispatch]);

  useEffect(() => {
    setInvoices(allInvoices);
  }, [allInvoices]);

  // Filter invoices based on order no, status, and invoice date range.
  // We assume each invoice has an "invoice_date" property.
  const filteredInvoice = invoices.filter((invoice) => {
    if (invoice.status == null) return;
    const orderMatch = orderId ? invoice.order_id === orderId : true;
    const statusMatch = status ? invoice.status === status : true;
    const dateMatch =
      (startDate ? new Date(invoice.invoice_date) >= startDate : true) &&
      (endDate ? new Date(invoice.invoice_date) <= endDate : true);
    return orderMatch && statusMatch && dateMatch;
  });

  // Card report counts
  const totalAmount = filteredInvoice.reduce(
    (acc, inv) => Number(acc) + Number(inv.amount),
    0
  );
  const suspendedCount = filteredInvoice.filter(
    (inv) => inv.status.toLowerCase() === "suspended"
  ).length;
  const paidCount = filteredInvoice.filter(
    (inv) => inv.status.toLowerCase() === "paid"
  ).length;
  const pendingCount = filteredInvoice.filter(
    (inv) => inv.status.toLowerCase() === "pending"
  ).length;

  // Unique order IDs and status values for dropdown filters.
  const orderIds = [...new Set(invoices.map((invoice) => invoice.order_id))];
  const invoiceStatusList = [
    ...new Set(invoices.map((invoice) => invoice.status)),
  ];

  // Opens the status menu and saves the row data to update later.
  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setData({ invoice_id: row.inv, status: row.status });
  };

  // When a status option is chosen (or menu closed) update the invoice via Redux.
  const handleClose = async (newStatus) => {
    setAnchorEl(null);
    if (newStatus) {
      dispatch(updateInvoice({ ...data, status: newStatus }));
    }
  };

  const completeIcon = <IconProgressCheck stroke={1.5} size="1.6rem" />;

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "warning";
      case "suspended":
        return "error";
      case "paid":
        return "success";
      default:
        return "default";
    }
  };

  const columns = [
    {
      name: "Inv Date",
      selector: (row) =>
        row.invoice_date ? new Date(row.invoice_date).toLocaleDateString() : "",
      sortable: true,
      width: "120px",
    },
    {
      name: "Invoice",
      selector: (row) => "INV#" + row.inv,
      sortable: true,
    },
    {
      name: "Order No",
      selector: (row) => "Order#" + row.order_id,
      sortable: true,
    },
    {
      name: "Customer",
      selector: (row) => row.customer_name,
      sortable: true,
    },
    {
      name: "Contact No",
      selector: (row) => row.contact_no,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
      right: true,
    },
    {
      name: "Status",
      selector: (row) => (
        <Chip
          label={row.status.charAt(0).toUpperCase() + row.status.slice(1)}
          color={getStatusColor(row.status)}
        />
      ),
      sortable: true,
    },
    {
      name: "Action",
      cell: (row) =>
        row.status.toLowerCase() === "paid" ? (
          <Button>{completeIcon}</Button>
        ) : (
          <Button variant="contained" onClick={(e) => handleClick(e, row)}>
            Change
          </Button>
        ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
      width: "130px",
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
    <PageContainer title="Invoice Page" description="Manage invoices">
      <DashboardCard>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2>Invoice List</h2>
        </div>

        {/* Card Reports */}
        <Grid container spacing={2} sx={{ mb: 2 }}>
          <Grid item xs={12} sm={3}>
            <Card variant="outlined" sx={{ backgroundColor: "#BBDEFB" }}>
              <CardContent>
                <Typography variant="subtitle1">Total Amount</Typography>
                <Typography variant="h5">
                  {totalAmount.toLocaleString()} MMK
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card variant="outlined" sx={{ backgroundColor: "#C8E6C9" }}>
              <CardContent>
                <Typography variant="subtitle1">Paid</Typography>
                <Typography variant="h5">{paidCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card variant="outlined" sx={{ backgroundColor: "#FFF9C4" }}>
              <CardContent>
                <Box>
                  <Typography variant="subtitle1">Pending</Typography>
                  <Typography variant="h5">{pendingCount}</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Card variant="outlined" sx={{ backgroundColor: "#FFCCBC" }}>
              <CardContent>
                <Typography variant="subtitle1">Suspended</Typography>
                <Typography variant="h5">{suspendedCount}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filter Controls */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            mb: 2,
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", gap: 2 }}>
            {/* Filter by order no */}
            <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Filter by order no</InputLabel>
              <Select
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                label="Filter by order no"
              >
                <MenuItem value="">All Order no</MenuItem>
                {orderIds.map((o) => (
                  <MenuItem key={o} value={o}>
                    {o}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Filter by status */}
            <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
              <InputLabel>Filter by status</InputLabel>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                label="Filter by status"
              >
                <MenuItem value="">All Status</MenuItem>
                {invoiceStatusList.map((s) => (
                  <MenuItem key={s} value={s}>
                    {s}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            {/* Invoice Date Start */}
            <Box>
              <Typography variant="caption" display="block">
                Invoice Start Date
              </Typography>
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="MM/dd/yyyy"
                placeholderText="Start Date"
                className="custom-datepicker"
              />
            </Box>

            {/* Invoice Date End */}
            <Box>
              <Typography variant="caption" display="block">
                Invoice End Date
              </Typography>
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="MM/dd/yyyy"
                placeholderText="End Date"
                className="custom-datepicker"
              />
            </Box>
          </Box>
        </Box>

        {/* Data table with built-in pagination */}
        <DataTable
          columns={columns}
          data={filteredInvoice}
          pagination
          highlightOnHover
          pointerOnHover
          striped
          responsive
          customStyles={customStyles}
        />

        {/* Change status Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={() => handleClose(null)}
        >
          {statusOptions.map((option) => (
            <MenuItem key={option} onClick={() => handleClose(option)}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </DashboardCard>
    </PageContainer>
  );
};

export default FinanceInvoice;
