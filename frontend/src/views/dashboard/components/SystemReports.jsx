import React, { useEffect, useState } from "react";
import { Grid, Typography, Avatar, Box } from "@mui/material";
import DashboardCard from "../../../components/shared/DashboardCard";
// Import whichever Tabler icons you like
import {
  IconClipboardList,
  IconTruckDelivery,
  IconPackage,
  IconReceipt2,
  IconUser,
  IconCash,
  IconClipboardCheck,
  IconTruckReturn,
} from "@tabler/icons-react";

const SystemReports = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    pendingOrders: 0,
    deliveriesCompleted: 0,
    returnOrders: 0,
    totalInvoices: 0,
    totalCustomers: 0,
    totalRevenue: 0,
    totalProducts: 0,
  });

  useEffect(() => {
    setStats({
      totalOrders: 135,
      pendingOrders: 17,
      deliveriesCompleted: 102,
      returnOrders: 4,
      totalInvoices: 80,
      totalCustomers: 56,
      totalRevenue: 8093000,
      totalProducts: 120,
    });
    const fetchStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:4000/api/dashboard/stats"
        );
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };
    fetchStats();
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <DashboardCard>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="subtitle2">Total Orders</Typography>
              <Typography variant="h4" fontWeight="700">
                {stats.totalOrders}
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: "primary" }}>
              <IconClipboardList />
            </Avatar>
          </Box>
        </DashboardCard>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <DashboardCard>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="subtitle2">Pending Orders</Typography>
              <Typography variant="h4" fontWeight="700">
                {stats.pendingOrders}
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: "secondary" }}>
              <IconClipboardCheck />
            </Avatar>
          </Box>
        </DashboardCard>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <DashboardCard>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="subtitle2">Completed Deliveries</Typography>
              <Typography variant="h4" fontWeight="700">
                {stats.deliveriesCompleted}
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: "success" }}>
              <IconTruckDelivery />
            </Avatar>
          </Box>
        </DashboardCard>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <DashboardCard>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="subtitle2">Return Orders</Typography>
              <Typography variant="h4" fontWeight="700">
                {stats.returnOrders}
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: "warning" }}>
              <IconTruckReturn />
            </Avatar>
          </Box>
        </DashboardCard>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <DashboardCard>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="subtitle2">Invoices</Typography>
              <Typography variant="h4" fontWeight="700">
                {stats.totalInvoices}
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: "info" }}>
              <IconReceipt2 />
            </Avatar>
          </Box>
        </DashboardCard>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <DashboardCard>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="subtitle2">Customers</Typography>
              <Typography variant="h4" fontWeight="700">
                {stats.totalCustomers}
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: "secondary" }}>
              <IconUser />
            </Avatar>
          </Box>
        </DashboardCard>
      </Grid>

      <Grid item xs={12} sm={6} md={3}>
        <DashboardCard>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="subtitle2">Revenue (MMK)</Typography>
              <Typography variant="h4" fontWeight="700">
                {stats.totalRevenue.toLocaleString()}
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: "primary" }}>
              <IconCash />
            </Avatar>
          </Box>
        </DashboardCard>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <DashboardCard>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              <Typography variant="subtitle2">Total Products</Typography>
              <Typography variant="h4" fontWeight="700">
                {stats.totalProducts.toLocaleString()}
              </Typography>
            </Box>
            <Avatar sx={{ bgcolor: "primary" }}>
              <IconPackage />
            </Avatar>
          </Box>
        </DashboardCard>
      </Grid>
    </Grid>
  );
};

export default SystemReports;
