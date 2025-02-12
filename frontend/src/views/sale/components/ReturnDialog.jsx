import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from "@mui/material";
import { IconTrash } from "@tabler/icons-react";

const ReturnDialog = ({ open, onClose, orderItems, onConfirm }) => {
  const [returnItems, setReturnItems] = useState([]);

  // Reset state when orderItems changes (i.e., when dialog is reopened)
  useEffect(() => {
    if (open) {
      setReturnItems(
        orderItems.map((item) => ({
          ...item,
          returnQty: item.quantity, // Default to full quantity
          returnReason: "", // Reason for return
        }))
      );
    }
  }, [open, orderItems]);

  // Handle quantity change
  const handleQtyChange = (index, value) => {
    const updatedItems = [...returnItems];
    updatedItems[index].returnQty = Math.min(
      Number(value),
      updatedItems[index].quantity
    );
    setReturnItems(updatedItems);
  };

  // Handle reason change
  const handleReasonChange = (index, value) => {
    const updatedItems = [...returnItems];
    updatedItems[index].returnReason = value;
    setReturnItems(updatedItems);
  };

  // Remove item from the dialog
  const handleRemoveItem = (index) => {
    const updatedItems = returnItems.filter((_, i) => i !== index);
    setReturnItems(updatedItems);
  };

  // Handle confirm return
  const handleConfirm = () => {
    const selectedReturns = returnItems.map((item) => ({
      product_id: item.product_id,
      returnQty: item.returnQty,
      returnReason: item.returnReason,
    }));
    onConfirm(selectedReturns);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold", fontSize: "1.25rem" }}>
        Return Products
      </DialogTitle>
      <DialogContent dividers sx={{ pb: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right" width={200}>
                Return Quantity
              </TableCell>
              <TableCell width={250}>Reason</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {returnItems.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.product_name}</TableCell>
                <TableCell align="right">{item.quantity}</TableCell>
                <TableCell align="right">
                  <TextField
                    type="number"
                    value={item.returnQty}
                    onChange={(e) => handleQtyChange(index, e.target.value)}
                    inputProps={{ min: 0, max: item.quantity }}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <FormControl fullWidth>
                    <InputLabel>Reason</InputLabel>
                    <Select
                      value={item.returnReason}
                      onChange={(e) =>
                        handleReasonChange(index, e.target.value)
                      }
                      label="Reason"
                    >
                      <MenuItem value="Damaged">Damaged</MenuItem>
                      <MenuItem value="Wrong Item">Wrong Item</MenuItem>
                      <MenuItem value="Other">Other</MenuItem>
                    </Select>
                  </FormControl>
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleRemoveItem(index)}>
                    <IconTrash color="red" stroke={1.5} size="1.3rem" />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleConfirm} variant="contained" color="primary">
          Confirm Return
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReturnDialog;
