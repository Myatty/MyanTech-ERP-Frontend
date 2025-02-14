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
import axios from "axios";
import { useNavigate } from "react-router";
const apiUrl = import.meta.env.VITE_APP_API_URL;

const ReturnDialog = ({ open, onClose, orderItems, onConfirm }) => {
  const [returnItems, setReturnItems] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (open) {
      setReturnItems(
        orderItems.map((item) => ({
          ...item,
          returnQty: item.quantity,
          returnReason: "",
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
  const handleConfirm = async () => {
    const selectedReturns = returnItems.map((item) => ({
      order_item_id: item.order_item_id,
      quantity: item.returnQty,
      return_reason: item.returnReason,
    }));

    try {
      await axios.post(`${apiUrl}/api/returns`, selectedReturns);
      onConfirm(selectedReturns);
      onClose();
      navigate("/sales/history");
    } catch (error) {
      console.error("Error posting return items:", error);
    }
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
                      <MenuItem value="damage">damage</MenuItem>
                      <MenuItem value="wrong_item">wrong_item</MenuItem>
                      <MenuItem value="other">other</MenuItem>
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
