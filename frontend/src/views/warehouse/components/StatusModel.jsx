import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";
const StatusModel = ({
  open,
  setOpen,
  setSelectedStatus,
  setReturOrders,
  setAnchorEl,
  retunOrders,
  obj,
  setObj,
}) => {
  //fetch avariable drivers & trucks / service centers
  const [driver, setDriver] = useState(0);
  const [truck, setTruck] = useState(0);
  const [center, setCenter] = useState(0);

  //func for assign
  const handleClick = async () => {
    // //you have to keep code under this comment before try in fetch try
    if (obj.status) {
      setSelectedStatus(obj.status); // Set selected value;
      const filterData = retunOrders.map((item) =>
        item.return_id === obj.return_id
          ? { ...item, status: obj.status }
          : item
      );
      setReturOrders(filterData);
    }
    setAnchorEl(null);
    setOpen(false);
    setObj({
      driver_id: null,
      truck_id: null,
      service_center_id: null,
      return_id: null,
      status: "",
      order_id: null,
      order_item_id: null,
    });
    setDriver(0), setTruck(0), setCenter(0);
    try {
      await axios.post(
        //replace with correct endpoint
        `http://localhost:4000/api/return`,
        obj
      );
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };
  //delete drivers,trucks,serviceCenters when real data get
  const drivers = [
    { id: 1, name: "U Ba" },
    { id: 2, name: "U Zaw" },
    { id: 3, name: "U Mg" },
  ];
  const trucks = [
    { id: 1, name: "YGN/567" },
    { id: 2, name: "YGN/87" },
    { id: 3, name: "YGN/287" },
  ];
  const serviceCenters = [
    { id: 1, name: "ICT Com" },
    { id: 2, name: "Dell Service Center" },
    { id: 3, name: "Access Spectrum Co.Ltd" },
  ];
  console.log("Obj", obj);
  return (
    <>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>Assign Truch for {obj.status}</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", p: 4 }}>
          <Box
            sx={{
              mt: 4,
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
            }}
          >
            {/* drivers dropdown */}
            <FormControl variant="outlined" size="small" sx={{ width: 200 }}>
              <InputLabel>Drivers</InputLabel>
              <Select
                value={driver}
                onChange={(e) => {
                  setDriver(e.target.value),
                    setObj({ ...obj, driver_id: e.target.value });
                }}
                label="Drivers"
              >
                {drivers.map((d) => (
                  <MenuItem key={d.id} value={d.id}>
                    {d.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {/* trucks dropdown */}
            <FormControl variant="outlined" size="small" sx={{ width: 200 }}>
              <InputLabel>Trucks</InputLabel>
              <Select
                value={truck}
                onChange={(e) => {
                  setTruck(e.target.value),
                    setObj({ ...obj, truck_id: e.target.value });
                }}
                label="Trucks"
              >
                {trucks.map((t) => (
                  <MenuItem key={t.id} value={t.id}>
                    {t.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {obj.status === "Service_Center" && (
              <FormControl
                variant="outlined"
                size="small"
                sx={{ width: 200, mt: 4 }}
              >
                <InputLabel>Service Centers</InputLabel>
                <Select
                  value={center}
                  onChange={(e) => {
                    setCenter(e.target.value),
                      setObj({ ...obj, service_center_id: e.target.value });
                  }}
                  label="Trucks"
                >
                  {serviceCenters.map((c) => (
                    <MenuItem key={c.id} value={c.id}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
            <DialogActions sx={{ width: 200, mt: 4 }}>
              <Button onClick={() => setOpen(false)}>Cancel</Button>
              <Button variant="contained" onClick={handleClick}>
                Assign
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default StatusModel;
