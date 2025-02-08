import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../actions/productActions';
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import Button from "@mui/material/Button";
import DialogBox from "./component/dilogBox";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";

const ProductPage = () => {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.products);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleProductCreated = () => {
    dispatch(fetchProducts());
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <PageContainer title="Product Page" description="this is product page">
      <DashboardCard title="Product Page">
        <>
          <Button
            sx={{ mb: 2 }}
            variant="contained"
            onClick={() => {
              setOpen(true);
            }}
          >
            Create New Product
          </Button>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: "bold", fontSize: 15 }}>
                    Item Name
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", fontSize: 15 }}
                  >
                    Brand
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", fontSize: 15 }}
                  >
                    Category
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", fontSize: 15 }}
                  >
                    Product Segment
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", fontSize: 15 }}
                  >
                    Serial Number
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", fontSize: 15 }}
                  >
                    Unit Price
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", fontSize: 15 }}
                  >
                    Quantity
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow
                    key={product.serial_number}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {product.name}
                    </TableCell>
                    <TableCell align="center">{product.brand}</TableCell>
                    <TableCell align="center">{product.category}</TableCell>
                    <TableCell align="center">{product.product_segment}</TableCell>
                    <TableCell align="center">{product.serial_number}</TableCell>
                    <TableCell align="center">{product.price}</TableCell>
                    <TableCell align="center">{product.stock_quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <DialogBox open={open} setOpen={setOpen} onProductCreated={handleProductCreated} />
        </>
      </DashboardCard>
    </PageContainer>
  );
};

export default ProductPage;