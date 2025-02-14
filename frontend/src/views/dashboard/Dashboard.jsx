import React from "react";
import { Grid, Box } from "@mui/material";
import PageContainer from "src/components/container/PageContainer";

// components
import SalesOverview from "./components/SalesOverview";
import YearlyBreakup from "./components/YearlyBreakup";
import RecentTransactions from "./components/RecentTransactions";
import ProductPerformance from "./components/ProductPerformance";
import MonthlyEarnings from "./components/MonthlyEarnings";
import SystemReports from "./components/SystemReports";
import SlowProductPerformance from "./components/SlowProductPerformance";
import ProfitProductPerformance from "./components/ProfitProductPerformance";

const Dashboard = () => {
  return (
    <PageContainer title="Dashboard" description="this is Dashboard">
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <SystemReports />
          </Grid>
          <Grid item xs={12} lg={8}>
            <SalesOverview />
          </Grid>
          <Grid item xs={12} lg={4}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <YearlyBreakup />
              </Grid>
              <Grid item xs={12}>
                <MonthlyEarnings />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <SlowProductPerformance />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProfitProductPerformance />
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Dashboard;
