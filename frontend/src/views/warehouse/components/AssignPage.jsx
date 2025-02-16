import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {
  Paper,
  Button,
  Snackbar,
  Alert,
  Skeleton,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";
import { IconTrash } from "@tabler/icons-react";
const apiUrl = import.meta.env.VITE_APP_API_URL;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#5D87FF",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {},
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

const AssignTruck = ({
  assignOrderId,
  orders,
  setAssignOrderId,
  setSelectOrderId,
  selectOrderId,
  driver_info,
  trucks,
}) => {
  const [driver, setDriver] = useState("");
  const [truck, setTruck] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [openToast, setOpenToast] = useState(false);
  const [loading, setLoading] = useState(false);

  //func for clicking delete icon
  const handleDelete = (orderId) => {
    const deleteAssignOrder = assignOrderId.filter((a) => a !== orderId);
    const deleteSelectOrder = selectOrderId.filter((s) => s !== orderId);
    setAssignOrderId(deleteAssignOrder);
    setSelectOrderId(deleteSelectOrder);
  };

  //func for clicking Assign Truck
  const handleAssign = async () => {
    if (!driver || !truck) {
      console.error("Missing driverId or truckId");
      setSnackbarMessage("Missing driverId or truckId");
      setSnackbarSeverity("error");
      setOpenToast(true);
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        `${apiUrl}/api/deliveries`,
        {
          order_ids: assignOrderId,
        },
        {
          params: {
            driverId: driver,
            truckId: truck,
          },
        }
      );
      // Show success toast
      setSnackbarMessage("Truck assigned successfully!");
      setSnackbarSeverity("success");
      setOpenToast(true);
      // Route to the same page
      window.location.reload();
    } catch (error) {
      console.error("Error Assigning Truck:", error);
      setSnackbarMessage("Error assigning truck");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Box sx={{ position: "sticky", top: 70, zIndex: 1 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Order No</StyledTableCell>
                <StyledTableCell align="left">Customer</StyledTableCell>
                <StyledTableCell align="left">Township</StyledTableCell>
                <StyledTableCell align="left">Region</StyledTableCell>
                <StyledTableCell align="left"> Address</StyledTableCell>
                <StyledTableCell align="left"> Contact No</StyledTableCell>
                <StyledTableCell align="left"> </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignOrderId.map((assignId) => {
                const od = orders.find((of) => of.order_id === assignId);
                const deleteIcon = <IconTrash stroke={1.5} size="1.3rem" />;
                return (
                  <StyledTableRow key={od.order_id}>
                    <StyledTableCell>Order#{od.order_id}</StyledTableCell>
                    <StyledTableCell align="left">
                      {od.customer_name}
                    </StyledTableCell>
                    <StyledTableCell align="left">
                      {od.township}
                    </StyledTableCell>
                    <StyledTableCell align="left">{od.region}</StyledTableCell>
                    <StyledTableCell align="left">{od.address}</StyledTableCell>
                    <StyledTableCell align="left">
                      {od.contact_number}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{ color: "red", cursor: "pointer" }}
                      onClick={() => {
                        handleDelete(od.order_id);
                      }}
                    >
                      {deleteIcon}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
            </TableBody>
          </Table>
          <Box sx={{ p: 2, display: "flex", gap: 2, justifyContent: "end" }}>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Trucks</InputLabel>
              <Select
                value={truck}
                onChange={(e) => setTruck(e.target.value)}
                label="Filter by Township"
              >
                <MenuItem value="">All Trucks</MenuItem>
                {trucks.map((t) => (
                  <MenuItem key={t.truck_id} value={t.truck_id}>
                    {t.license_plate}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl variant="outlined" size="small" sx={{ minWidth: 180 }}>
              <InputLabel>Drivers</InputLabel>
              <Select
                value={driver}
                onChange={(e) => setDriver(e.target.value)}
                label="Drivers"
              >
                <MenuItem value="">All Drivers</MenuItem>
                {driver_info.map((d) => (
                  <MenuItem key={d.driver_id} value={d.driver_id}>
                    {d.driver_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              size="small"
              onClick={handleAssign}
              disabled={loading}
            >
              {loading ? <Skeleton width={80} /> : "Assign Truck"}
            </Button>
          </Box>
        </TableContainer>
      </Box>
      <Snackbar
        open={openToast}
        autoHideDuration={3000}
        onClose={() => setOpenToast(false)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setOpenToast(false)}
          severity={snackbarSeverity}
          sx={{
            width: "100%",
            backgroundColor:
              snackbarSeverity === "success" ? "#4A90E2" : undefined,
            color: "#fff",
            fontWeight: "bold",
            borderRadius: "8px",
          }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AssignTruck;
