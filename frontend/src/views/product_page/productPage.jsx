import React from "react";
import { Typography } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useState } from "react";
import DialogBox from "./component/dilogBox";

const ProductPage = () => {
  const [open, setOpen] = useState(false);
  const rows = [
    {
      name: "Apple MacBook Pro14-inch",
      brand: "Apple",
      category: "Laptop",
      segment: "Consumer",
      serialNumber: "MBP14-2025-A1B2C3D4E5",
      price: 1800,
      qty: 15,
    },
    {
      name: "Microsoft Surface Studio",
      brand: "Microsoft",
      category: "Laptop",
      segment: "Consumer",
      serialNumber: "MSF-STUDIO-5678XYZ123",
      price: 850,
      qty: 20,
    },
  ];

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
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="center">{row.brand}</TableCell>
                    <TableCell align="center">{row.category}</TableCell>
                    <TableCell align="center">{row.segment}</TableCell>
                    <TableCell align="center">{row.serialNumber}</TableCell>
                    <TableCell align="center">{row.price}</TableCell>
                    <TableCell align="center">{row.qty}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <DialogBox open={open} setOpen={setOpen} />
        </>
      </DashboardCard>
    </PageContainer>
  );
};

export default ProductPage;
