import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import Slide from "@mui/material/Slide";
import { IconFileInvoice, IconCheck, IconX } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// MUI Slide Transition
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function InvoiceDialog() {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false); // New Loading State
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Confirm Invoice Generation
  const handleConfirm = async () => {
    setLoading(true); // Show loader
    try {
      // Assuming the backend API is something like this:
      await axios.post("http://localhost:4000/api/invoice", {
        orderId: 198, // This should be dynamic based on your app
      });

      // Dispatch Redux action if needed
      dispatch({ type: "INVOICE_CREATED", payload: 198 });

      // Navigate to /sales/history after successful API call
      navigate("/sales/history");
    } catch (error) {
      console.error("Error creating invoice:", error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <React.Fragment>
      <Button
        variant="contained"
        sx={{
          ml: 2,
          backgroundColor: "#1976D2",
          "&:hover": { backgroundColor: "#1565C0" },
        }}
        startIcon={<IconFileInvoice size={20} />}
        onClick={handleClickOpen}
      >
        Create Invoice
      </Button>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="invoice-dialog-description"
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "12px",
            padding: "20px",
            backgroundColor: "#F8FAFC",
          },
        }}
      >
        <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconFileInvoice size={24} color="#1565C0" />
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            Confirm Invoice Creation
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box
            sx={{
              textAlign: "center",
              padding: "10px",
              backgroundColor: "#E3F2FD",
              borderRadius: "8px",
            }}
          >
            <Typography variant="body1">
              Are you sure you want to generate an invoice for this order?
            </Typography>
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", paddingBottom: "15px" }}>
          <Button
            variant="contained"
            color="error"
            onClick={handleClose}
            startIcon={<IconX size={18} />}
            sx={{ borderRadius: "8px" }}
            disabled={loading} // Disable while loading
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="success"
            onClick={handleConfirm}
            startIcon={
              loading ? <CircularProgress size={18} /> : <IconCheck size={18} />
            }
            sx={{ borderRadius: "8px" }}
            disabled={loading} // Disable while loading
          >
            {loading ? "Processing..." : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
