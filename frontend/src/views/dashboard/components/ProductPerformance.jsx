import React from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import DashboardCard from "../../../components/shared/DashboardCard";

const products = [
  {
    product_id: 1,
    name: "iPhone 14 Pro",
    category: "Phones",
    brand: "Apple",
    price: 1450,
    stock_quantity: 12,
  },
  {
    product_id: 2,
    name: "Galaxy S23",
    category: "Phones",
    brand: "Samsung",
    price: 1299,
    stock_quantity: 8,
  },
  {
    product_id: 3,
    name: "ThinkPad X1",
    category: "Laptops",
    brand: "Lenovo",
    price: 1999,
    stock_quantity: 5,
  },
  {
    product_id: 4,
    name: "MacBook Air M2",
    category: "Laptops",
    brand: "Apple",
    price: 1799,
    stock_quantity: 7,
  },
];

const ProductPerformance = () => {
  return (
    <DashboardCard title="Top Products">
      <Box sx={{ overflow: "auto", width: { xs: "280px", sm: "auto" } }}>
        <Table
          aria-label="simple table"
          sx={{
            whiteSpace: "nowrap",
            mt: 2,
          }}
        >
          <TableHead>
            <TableRow>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Product ID
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Name
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Category
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="subtitle2" fontWeight={600}>
                  Brand
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Price
                </Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="subtitle2" fontWeight={600}>
                  Stock
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.product_id}>
                <TableCell>
                  <Typography sx={{ fontSize: "15px", fontWeight: "500" }}>
                    {product.product_id}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    {product.name}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    fontWeight={400}
                  >
                    {product.category}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    color="textSecondary"
                    variant="subtitle2"
                    fontWeight={400}
                  >
                    {product.brand}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">${product.price}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography variant="h6">{product.stock_quantity}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </DashboardCard>
  );
};

export default ProductPerformance;
