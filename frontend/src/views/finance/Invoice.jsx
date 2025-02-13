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
import { Paper } from "@mui/material/";
import { IconProgressCheck } from "@tabler/icons-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Menu,
  Button,
  Typography,
  TextField,
} from "@mui/material";
import axios from "axios";
import { fetchInvoice, updateInvoice } from "../../actions/invoiceStatusAction";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#4570EA",
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

const FinanceInvoice = () => {
  const dispatch = useDispatch();
  const allInvoices = useSelector((state) => state.invoiceStatus.invoices);
  const [orderId, setOrderId] = useState(0);
  const [status, setStatus] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [data, setData] = useState({ invoice_id: null, status: "" });
  // const allInvoicess = [
  //   {
  //     inv: "INV#12",
  //     order_id: "ORDER#12",
  //     customer_name: "Su Su",
  //     contact_no: "09647556",
  //     amount: 200000,
  //     status: "Pending",
  //   },
  //   {
  //     inv: "INV#13",
  //     order_id: "ORDER#13",
  //     customer_name: "Mg Mg",
  //     contact_no: "09456677",
  //     amount: 350000,
  //     status: "Suspended",
  //   },
  //   {
  //     inv: "INV#14",
  //     order_id: "ORDER#14",
  //     customer_name: "Hla Hla",
  //     contact_no: "092344556",
  //     amount: 400000,
  //     status: "Paid",
  //   },
  //   {
  //     inv: "INV#15",
  //     order_id: "ORDER#15",
  //     customer_name: "Ma Ma",
  //     contact_no: "093764378",
  //     amount: 150000,
  //     status: "Pending",
  //   },
  //   {
  //     inv: "INV#16",
  //     order_id: "ORDER#16",
  //     customer_name: "Zaw Zaw",
  //     contact_no: "09343566",
  //     amount: 300000,
  //     status: "Pending",
  //   },
  // ];

  useEffect(() => {
    dispatch(fetchInvoice());
  }, [dispatch]);

  useEffect(() => {
    setInvoices(allInvoices);
  }, [allInvoices]);

  //codes for clicking change status button
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");

  const statusOptions = ["Pending", "Suspended", "Paid"];

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = async (status) => {
    //you must keep code under this comment before try in fetch try
    if (status) {
      setSelectedStatus(status); // Set selected value;
      // const filterData = invoices.map((item) =>
      //   item.inv === data.inv ? { ...item, status: status } : item
      // );
      // setInvoices(filterData);
    }
    setAnchorEl(null);
    //call fetch
    dispatch(updateInvoice({ ...data, status: status }));
  };

  // Get orderId from order
  const orderIds = [
    ...new Set(invoices?.map((invoice) => invoice.order_id) || []),
  ];
  // Get status from order
  const invoice_status = [
    ...new Set(invoices?.map((invoice) => invoice.status) || []),
  ];

  // Filtered invoices based on order_id & status
  const filteredInvoice = invoices?.filter((invoice) => {
    const OrderIdMatch = orderId ? invoice.order_id === orderId : true;
    const StatusMatch = status ? invoice.status === status : true;

    return OrderIdMatch && StatusMatch;
  });

  return (
    <>
      <PageContainer title="Product Page" description="this is product page">
        <DashboardCard>
          <h2>Invoice Lists</h2>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              my: 4,
              alignItems: "center",
              width: 500,
            }}
          >
            {/* order_id dropdown*/}
            <FormControl variant="outlined" size="small" sx={{ width: 200 }}>
              <InputLabel>Filter by order no</InputLabel>
              <Select
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                label="Filter by drivers"
              >
                <MenuItem value="">All Order no</MenuItem>
                {orderIds.map((o) => (
                  <MenuItem key={o} value={o}>
                    {o}
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
                <MenuItem value="">All Status</MenuItem>
                {invoice_status.map((o) => (
                  <MenuItem key={o} value={o}>
                    {o}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Invoice</StyledTableCell>
                  <StyledTableCell>Order no</StyledTableCell>
                  <StyledTableCell>Customer</StyledTableCell>
                  <StyledTableCell>Contact No</StyledTableCell>
                  <StyledTableCell>Amount</StyledTableCell>
                  <StyledTableCell>Status</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredInvoice.map((inv) => {
                  const completeIcon = (
                    <IconProgressCheck stroke={1.5} size="1.6rem" />
                  );
                  return (
                    <StyledTableRow key={inv.inv}>
                      <StyledTableCell>{inv.inv}</StyledTableCell>
                      <StyledTableCell>{inv.order_id}</StyledTableCell>
                      <StyledTableCell>{inv.customer_name}</StyledTableCell>
                      <StyledTableCell>{inv.contact_no}</StyledTableCell>
                      <StyledTableCell>{inv.amount}</StyledTableCell>
                      <StyledTableCell>{inv.status}</StyledTableCell>
                      <StyledTableCell align="center">
                        {inv.status === "paid" ? (
                          <Button>{completeIcon}</Button>
                        ) : (
                          <div>
                            <Button
                              variant="contained"
                              onClick={(e) => {
                                handleClick(e),
                                  setData({
                                    ...data,
                                    invoice_id: inv.inv,
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
                              {statusOptions.map((option) => {
                                return (
                                  <MenuItem
                                    key={option}
                                    onClick={() => handleClose(option)}
                                  >
                                    {option}
                                  </MenuItem>
                                );
                              })}
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
        </DashboardCard>
      </PageContainer>
    </>
  );
};
export default FinanceInvoice;
