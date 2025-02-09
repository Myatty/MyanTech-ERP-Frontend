import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  TextField,
  DialogActions,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../../actions/userActions";
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
    phone: "",
    email: "",
    password: "",
    role: "",
    department: "",
  });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
    if (e.target.name == "department") {
      setDepartment(e.target.value);
    }
  };

  // // create new user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:4000/api/users", userData);
      setOpen(false);
      dispatch(fetchUsers());
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  console.log("data", userData);
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>User Registor Form</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", p: 4 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <Box>
              <h4>Name</h4>
              <TextField
                name="name"
                sx={{ width: 300 }}
                placeholder="Name"
                onChange={handleChange}
              />
            </Box>
            <Box>
              <h4>Phone</h4>
              <TextField
                name="phone"
                sx={{ width: 300 }}
                placeholder="Phone"
                onChange={handleChange}
              />
            </Box>
            <Box>
              <h4>Email</h4>
              <TextField
                name="email"
                sx={{ width: 300 }}
                placeholder="Email"
                onChange={handleChange}
              />
            </Box>
            <Box>
              <h4>Password</h4>
              <TextField
                name="password"
                type="password"
                sx={{ width: 300 }}
                placeholder="Password"
                onChange={handleChange}
              />
            </Box>
            <Box>
              <h4>Role</h4>
              <TextField
                name="role"
                type="Role"
                sx={{ width: 300 }}
                placeholder="Role"
                onChange={handleChange}
              />
            </Box>
            <Box>
              <h4>Department</h4>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel>Departments</InputLabel>
                <Select
                  name="department"
                  label="Department"
                  value={department}
                  onChange={handleChange}
                >
                  {departments.map((item) => (
                    <MenuItem key={item.id} value={item.name}>
                      <ListItemText primary={item.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <DialogActions>
              <Button
                variant="contained"
                onClick={() => {
                  setOpen(false);
                }}
              >
                Cancle
              </Button>
              <Button type="submit" variant="contained">
                Comfrim
              </Button>
            </DialogActions>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default UserDialog;
