import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import DashboardCard from "../../../components/shared/DashboardCard";
const apiUrl = import.meta.env.VITE_APP_API_URL;

const ProfitProductPerformance = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfitProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(`${apiUrl}/api/report/profitproduct`);
        setProducts(res.data.results); // results array
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProfitProducts();
  }, []);

  return (
    <DashboardCard title="Top Selling Products">
      {loading ? (
        <Box display="flex" justifyContent="center" p={2}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Typography color="error" p={2}>
          Error: {error}
        </Typography>
      ) : (
        <Box sx={{ overflow: "auto" }}>
          <Table aria-label="top selling products">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    No
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Product Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Qty Sold
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2" fontWeight={600}>
                    Total Revenue
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {products.map(
                (item, index) =>
                  index < 10 && (
                    <TableRow key={item.product_id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{item.product_name}</TableCell>
                      <TableCell align="center">
                        {item.total_quantity_sold}
                      </TableCell>
                      <TableCell align="right">
                        {Number(item.total_revenue).toLocaleString()} MMK
                      </TableCell>
                    </TableRow>
                  )
              )}
            </TableBody>
          </Table>
        </Box>
      )}
    </DashboardCard>
  );
};

export default ProfitProductPerformance;
