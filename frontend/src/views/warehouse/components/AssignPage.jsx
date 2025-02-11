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

const AssignTruck = ({
  assignOrderId,
  orders,
  setAssignOrderId,
  setSelectOrderId,
  selectOrderId,
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

  //delete drivers when real data get
  const drivers = [
    {
      id: 1,
      name: "U Ba",
      contact: "09345435",
    },
    {
      id: 2,
      name: "U Mg",
      contact: "09354663",
    },
    {
      id: 3,
      name: "U Hla",
      contact: "09435346",
    },
  ];
  //delete trucks when real data get
  const trucks = [
    {
      id: 1,
      name: "9458gffg",
    },
    {
      id: 2,
      name: "43546retf",
    },
    {
      id: 3,
      name: "g45tfg",
    },
  ];
  //delete deliveringDriverIds & deliveringTruckIds when real data get
  const deliveringDriverIds = [1, 3];
  const deliveringTruckIds = [2];

  return (
    <>
      <Box>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell>Order_Id</StyledTableCell>
                <StyledTableCell align="right">Customer</StyledTableCell>
                <StyledTableCell align="right">Township</StyledTableCell>
                <StyledTableCell align="right">Region</StyledTableCell>
                <StyledTableCell align="right"> Address</StyledTableCell>
                <StyledTableCell align="right"> Contact no</StyledTableCell>
                <StyledTableCell align="right"> </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {assignOrderId.map((assignId) => {
                const od = orders.find((of) => of.order_id === assignId);
                const deleteIcon = <IconTrash stroke={1.5} size="1.3rem" />;
                return (
                  <StyledTableRow>
                    <StyledTableCell>{od.order_id}</StyledTableCell>
                    <StyledTableCell align="right">
                      {od.customer_name}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {od.township}
                    </StyledTableCell>
                    <StyledTableCell align="right">{od.region}</StyledTableCell>
                    <StyledTableCell align="right">
                      {od.address}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {od.contact_number}
                    </StyledTableCell>
                    <StyledTableCell
                      sx={{ color: "red" }}
                      onClick={() => {
                        handleDelete(od.order_id);
                      }}
                    >
                      {deleteIcon}
                    </StyledTableCell>
                  </StyledTableRow>
                );
              })}
              <TableRow>
                <TableCell colSpan={3}></TableCell>
                <TableCell>
                  {/*Drivers Dropdown*/}
                  <FormControl variant="outlined" size="small" fullWidth>
                    <InputLabel>Drivers</InputLabel>
                    <Select
                      value={driver}
                      onChange={(e) => setDriver(e.target.value)}
                      label="Drivers"
                    >
                      <MenuItem value="">All Drivers</MenuItem>
                      {drivers.map((d) => (
                        <MenuItem
                          key={d.id}
                          value={d.id}
                          disabled={
                            deliveringDriverIds.find((dd) => dd === d.id)
                              ? true
                              : false
                          }
                        >
                          {d.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>

                <TableCell>
                  {/*Trucks Dropdrown*/}
                  <FormControl variant="outlined" size="small" fullWidth>
                    <InputLabel>Trucks</InputLabel>
                    <Select
                      value={truck}
                      onChange={(e) => setTruck(e.target.value)}
                      label="Filter by Township"
                    >
                      <MenuItem value="">All Trucks</MenuItem>
                      {trucks.map((t) => (
                        <MenuItem
                          key={t.id}
                          value={t.id}
                          disabled={
                            deliveringTruckIds.find((dt) => dt === t.id)
                              ? true
                              : false
                          }
                        >
                          {t.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => {
                      handleAssign();
                    }}
                  >
                    Assign Truck
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};
export default AssignTruck;
