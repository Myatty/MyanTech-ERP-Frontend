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
const UserDialog = ({
  open,
  setOpen,
  department,
  setDepartment,
  departments,
}) => {
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>User Registor Form</DialogTitle>
        <DialogContent sx={{ display: "flex", flexDirection: "column", p: 4 }}>
          <Box>
            <h4>Name</h4>
            <TextField
              sx={{ width: 300 }}
              placeholder="Name"
              onChange={(evt) => {
                //   setData({ ...data, name: evt.target.value });
              }}
            />
          </Box>
          <Box>
            <h4>Phone</h4>
            <TextField
              sx={{ width: 300 }}
              placeholder="Phone"
              onChange={(evt) => {
                //   setData({ ...data, name: evt.target.value });
              }}
            />
          </Box>
          <Box>
            <h4>Email</h4>
            <TextField
              sx={{ width: 300 }}
              placeholder="Email"
              onChange={(evt) => {
                //   setData({ ...data, name: evt.target.value });
              }}
            />
          </Box>
          <Box>
            <h4>Password</h4>
            <TextField
              type="password"
              sx={{ width: 300 }}
              placeholder="Password"
              onChange={(evt) => {
                //   setData({ ...data, name: evt.target.value });
              }}
            />
          </Box>
          <Box>
            <h4>Role</h4>
            <TextField
              type="Role"
              sx={{ width: 300 }}
              placeholder="Role"
              onChange={(evt) => {
                //   setData({ ...data, name: evt.target.value });
              }}
            />
          </Box>
          <Box>
            <h4>Department</h4>
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Departments</InputLabel>
              <Select
                label="Department"
                value={department}
                onChange={(e) => setDepartment(Number(e.target.value))}
              >
                {departments.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    <ListItemText primary={item.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              setOpen(false);
            }}
          >
            Cancle
          </Button>
          <Button variant="contained" onClick={() => {}}>
            Comfrim
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default UserDialog;
