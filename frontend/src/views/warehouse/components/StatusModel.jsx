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
import { fetchDrivers } from "../../../actions/driverActions";
import { useDispatch, useSelector } from "react-redux";
import { fetchTrucks } from "../../../actions/truckActions";
const apiUrl = import.meta.env.VITE_APP_API_URL;
import { fetchServiceCenter } from "../../../actions/serviceCentersAction";
import { fetchReturnInfo } from "../../../actions/returnInfoActions";

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
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDrivers());
    dispatch(fetchTrucks());
    dispatch(fetchServiceCenter());
  }, [dispatch]);

  const [driver, setDriver] = useState("");
  const [truck, setTruck] = useState("");
  const [center, setCenter] = useState("");

  const drivers = useSelector((state) => state.drivers.drivers);
  const trucks = useSelector((state) => state.trucks.trucks);
  const serviceCenters = useSelector(
    (state) => state.serviceCenter.serviceCenters
  );

  //func for assign
  const handleClick = async () => {
    if (obj.status) {
      setSelectedStatus(obj.status);
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
      if (obj.status === "service") {
        await axios.put(`${apiUrl}/api/returns/assign-service`, obj);
      } else {
        await axios.put(`${apiUrl}/api/returns/assign-pickup`, obj);
      }
      dispatch(fetchReturnInfo());
      dispatch(fetchDrivers());
      dispatch(fetchTrucks());
    } catch (error) {
      console.error("Error changing status:", error);
    }
  };

  const centers = serviceCenters?.results || [];

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
                  <MenuItem key={d.driver_id} value={d.driver_id}>
                    {d.driver_name}
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
                  <MenuItem key={t.truck_id} value={t.truck_id}>
                    {t.license_plate}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {obj.status === "service" && (
              <FormControl
                variant="outlined"
                size="small"
                sx={{ width: 200, mt: 4 }}
              >
                <InputLabel>Service Centers</InputLabel>
                <Select
                  value={center || ""}
                  onChange={(e) => {
                    setCenter(e.target.value),
                      setObj({ ...obj, service_center_id: e.target.value });
                  }}
                  label="Service Centers"
                >
                  {centers.map((c) => (
                    <MenuItem
                      key={c.service_center_id}
                      value={c.service_center_id}
                    >
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
