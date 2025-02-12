import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, Button } from "@mui/material/";
import { FormControl, InputLabel, Select, MenuItem, Box } from "@mui/material";
import axios from "axios";
import { IconTrash } from "@tabler/icons-react";

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
  //fetch drivers , trucks , delivering driverIds & truckIds

  const [driver, setDriver] = useState(0);
  const [truck, setTruck] = useState(0);

  //func for clicking delete icon
  const handleDelete = (orderId) => {
    const deleteAssignOrder = assignOrderId.filter((a) => a !== orderId);
    const deleteSelectOrder = selectOrderId.filter((s) => s !== orderId);
    setAssignOrderId(deleteAssignOrder);
    setSelectOrderId(deleteSelectOrder);
  };
  //func for clicking Assign Truck
  const handleAssign = async () => {
    try {
      await axios.post(
        //replace with correct endpoint
        `http://localhost:4000/api/assign?driverId=${driver}&truckId=${truck}`,
        assignOrderId
      );
    } catch (error) {
      console.error("Error creating product:", error);
    }
  };

  //delete deliveringDriverIds & deliveringTruckIds when real data get
  const deliveringDriverIds = [1, 3];
  const deliveringTruckIds = [2];

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
                  <StyledTableRow>
                    <StyledTableCell>{od.order_id}</StyledTableCell>
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
                  <MenuItem
                    key={t.truck_id}
                    value={t.license_plate}
                    disabled={
                      deliveringTruckIds.find((dt) => dt === t.id)
                        ? true
                        : false
                    }
                  >
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
                {driver_info.map(
                  (d) => (
                    console.log(`d`, d),
                    (
                      <MenuItem
                        key={d.driver_id}
                        value={d.driver_name}
                        // disabled={
                        //   deliveringDriverIds.find((dd) => dd === d.id)
                        //     ? true
                        //     : false
                        // }
                      >
                        {d.driver_name}
                      </MenuItem>
                    )
                  )
                )}
              </Select>
            </FormControl>
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                handleAssign();
              }}
            >
              Assign Truck
            </Button>
          </Box>
        </TableContainer>
      </Box>
    </>
  );
};
export default AssignTruck;
