import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Box,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../../actions/userActions";
import axios from "axios";
const apiUrl = import.meta.env.VITE_APP_API_URL;

const UserDialog = ({
  open,
  setOpen,
  department,
  setDepartment,
  departments,
}) => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    name: "",
    phone_number: "",
    email: "",
    password: "",
    role_name: "",
    dept_name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "department") {
      setDepartment(value);
      setUserData((prev) => ({
        ...prev,
        dept_name: value,
      }));
    }
  };

  // Create new user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${apiUrl}/api/users`, userData);
      setOpen(false);
      dispatch(fetchUsers());
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
      <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.25rem" }}>
        User Registration
      </DialogTitle>

      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent dividers sx={{ pb: 2 }}>
          <Grid container spacing={2}>
            {/* Name */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Name"
                name="name"
                fullWidth
                variant="outlined"
                value={userData.name}
                onChange={handleChange}
              />
            </Grid>

            {/* Phone */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Phone"
                name="phone_number"
                fullWidth
                variant="outlined"
                value={userData.phone_number}
                onChange={handleChange}
              />
            </Grid>

            {/* Email */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Email"
                name="email"
                fullWidth
                variant="outlined"
                type="email"
                value={userData.email}
                onChange={handleChange}
              />
            </Grid>

            {/* Password */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Password"
                name="password"
                fullWidth
                variant="outlined"
                type="password"
                value={userData.password}
                onChange={handleChange}
              />
            </Grid>

            {/* Department */}
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel id="department-label">Department</InputLabel>
                <Select
                  labelId="department-label"
                  label="Department"
                  name="department"
                  value={department}
                  onChange={handleChange}
                >
                  {departments.map((item) => (
                    <MenuItem key={item.id} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            {/* Role */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Role"
                name="role_name"
                fullWidth
                variant="outlined"
                value={userData.role_name}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>

        <DialogActions sx={{ p: 2 }}>
          <Button
            variant="outlined"
            onClick={() => setOpen(false)}
            sx={{ mr: 1 }}
          >
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Confirm
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default UserDialog;
