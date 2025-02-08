import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
const DialogBox = ({ open, setOpen }) => {
  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Create New Product</DialogTitle>
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
            <h4>Brand</h4>
            <TextField
              sx={{ width: 300 }}
              placeholder="Brand"
              onChange={(evt) => {
                //   setData({ ...data, name: evt.target.value });
              }}
            />
          </Box>
          <Box>
            <h4>Category</h4>
            <TextField
              sx={{ width: 300 }}
              placeholder="Category"
              onChange={(evt) => {
                //   setData({ ...data, name: evt.target.value });
              }}
            />
          </Box>
          <Box>
            <h4>Product Segment</h4>
            <TextField
              sx={{ width: 300 }}
              placeholder="Product Segment"
              onChange={(evt) => {
                //   setData({ ...data, name: evt.target.value });
              }}
            />
          </Box>
          <Box>
            <h4>Serial Number</h4>
            <TextField
              sx={{ width: 300 }}
              placeholder="Serial Number"
              onChange={(evt) => {
                //   setData({ ...data, name: evt.target.value });
              }}
            />
          </Box>
          <Box>
            <h4>Price</h4>
            <TextField
              sx={{ width: 300 }}
              placeholder="Price"
              onChange={(evt) => {
                //   setData({ ...data, name: evt.target.value });
              }}
            />
          </Box>
          <Box>
            <h4>Quantity</h4>
            <TextField
              sx={{ width: 300 }}
              placeholder="Quantity"
              onChange={(evt) => {
                //   setData({ ...data, name: evt.target.value });
              }}
            />
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
export default DialogBox;
