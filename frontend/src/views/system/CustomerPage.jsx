import React, { useEffect, useState } from "react";
import {
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  TablePagination,
  TextField,
  Skeleton,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import { IconPencil, IconTrash } from "@tabler/icons-react";

import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "src/components/shared/DashboardCard";
import CustomerDialog from "./components/CustomerDialog";

import { useDispatch, useSelector } from "react-redux";
import { fetchCustomers } from "../../actions/customerActions";

const Customer = () => {
  const dispatch = useDispatch();
  const { loading, customers, error } = useSelector((state) => state.customers);

  // Dialog open/close
  const [open, setOpen] = useState(false);

  // Text search by "name"
  const [searchTerm, setSearchTerm] = useState("");

  // Region filter
  const [selectedRegion, setSelectedRegion] = useState("All");

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  // Handlers for opening the Create Customer dialog
  const handleOpenDialog = () => {
    setOpen(true);
  };

  // Search filter handler
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  // Region filter handler
  const handleRegionChange = (e) => {
    setSelectedRegion(e.target.value);
    setPage(0);
  };

  // Pagination handlers
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Error display
  if (error) {
    return <div>Error: {error}</div>;
  }

  // --- REGION FILTER ---
  // If "All" is selected, do not filter by region. Otherwise, match exact region.
  const regionFilteredCustomers =
    selectedRegion === "All"
      ? customers
      : customers.filter((c) => c.region === selectedRegion);

  // --- NAME SEARCH FILTER ---
  const filteredCustomers = regionFilteredCustomers.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- PAGINATION ---
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedCustomers =
    rowsPerPage > 0
      ? filteredCustomers.slice(startIndex, endIndex)
      : filteredCustomers;

  // Create a list of unique regions. Include "All" at the front for convenience.
  const uniqueRegions = [
    "All",
    ...new Set(customers.map((customer) => customer.region).filter(Boolean)),
  ];

  // --- CSV EXPORT ---
  const handleExportCSV = () => {
    /*
      You can decide whether to export:
        1) Only the filtered list (filteredCustomers)
        2) The entire customer list (customers)
      Below, we export the currently filtered list.
    */
    const dataToExport = filteredCustomers;

    // CSV Header
    const headers = [
      "No",
      "Name",
      "Contact #1",
      "Contact #2",
      "Address",
      "Township",
      "Region",
    ];

    // Build CSV rows
    const rows = dataToExport.map((customer, index) => [
      index + 1,
      customer.name,
      customer.contact_number1,
      customer.contact_number2,
      customer.address,
      customer.township,
      customer.region,
    ]);

    // Combine headers and rows into a CSV string
    let csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      rows.map((row) => row.join(",")).join("\n");

    // Download the CSV file
    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.setAttribute("download", "customers.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <PageContainer
      title="Customer Page"
      description="This is the Customer page"
    >
      <DashboardCard>
        {/* TOP SECTION: Stats and Controls */}
        <Box
          display="flex"
          alignItems={{ xs: "flex-start", sm: "center" }}
          flexDirection={{ xs: "column", sm: "row" }}
          justifyContent="space-between"
          gap={2}
          marginBottom={2}
        >
          {/* Left: Stats */}
          <Box
            sx={{
              backgroundColor: "#F0F0F0",
              padding: "16px",
              borderRadius: "8px",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Total Customers: {filteredCustomers.length}
            </Typography>
          </Box>

          {/* Right: Filters & Buttons */}
          <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
            {/* Region Filter */}
            <FormControl size="small">
              <InputLabel>Region Filter</InputLabel>
              <Select
                label="Region Filter"
                value={selectedRegion}
                onChange={handleRegionChange}
                sx={{ minWidth: 150 }}
              >
                {uniqueRegions.map((region) => (
                  <MenuItem key={region} value={region}>
                    {region}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Name Search */}
            <TextField
              label="Search by Name"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearch}
            />

            {/* Create Customer */}
            <Button variant="contained" onClick={handleOpenDialog}>
              Create New Customer
            </Button>

            {/* Export CSV */}
            <Button variant="outlined" onClick={handleExportCSV}>
              Export
            </Button>
          </Box>
        </Box>

        {/* TABLE SECTION */}
        {loading ? (
          /* SKELETON LOADING STATE */
          <TableContainer
            component={Paper}
            sx={{ borderRadius: 2, overflow: "hidden" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  {[
                    "No",
                    "Name",
                    "Contact #1",
                    "Contact #2",
                    "Address",
                    "Township",
                    "Region",
                    "Action",
                  ].map((header) => (
                    <TableCell
                      key={header}
                      sx={{
                        fontWeight: "bold",
                        fontSize: 13.5,
                        bgcolor: "primary.main",
                        color: "#fff",
                      }}
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {[...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    {Array.from({ length: 8 }).map((__, idx) => (
                      <TableCell key={idx}>
                        <Skeleton variant="text" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          /* REAL TABLE WHEN NOT LOADING */
          <TableContainer
            component={Paper}
            sx={{ borderRadius: 2, overflow: "hidden" }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="customer table">
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: 13.5,
                      bgcolor: "primary.main",
                      color: "#fff",
                    }}
                  >
                    No
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: 13.5,
                      bgcolor: "primary.main",
                      color: "#fff",
                    }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: 13.5,
                      bgcolor: "primary.main",
                      color: "#fff",
                    }}
                  >
                    Contact #1
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: 13.5,
                      bgcolor: "primary.main",
                      color: "#fff",
                    }}
                  >
                    Contact #2
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: 13.5,
                      bgcolor: "primary.main",
                      color: "#fff",
                    }}
                  >
                    Address
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: 13.5,
                      bgcolor: "primary.main",
                      color: "#fff",
                    }}
                  >
                    Township
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: 13.5,
                      bgcolor: "primary.main",
                      color: "#fff",
                    }}
                  >
                    Region
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: "bold",
                      fontSize: 13.5,
                      bgcolor: "primary.main",
                      color: "#fff",
                    }}
                    align="center"
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedCustomers.map((customer, index) => {
                  const isOddRow = index % 2 !== 0;
                  return (
                    <TableRow
                      key={customer.id}
                      sx={{
                        backgroundColor: isOddRow ? "action.hover" : "inherit",
                      }}
                    >
                      {/* Sequential number (e.g. 1, 2, 3, ... across pages) */}
                      <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                      <TableCell>{customer.name}</TableCell>
                      <TableCell>{customer.contact_number1}</TableCell>
                      <TableCell>{customer.contact_number2}</TableCell>
                      <TableCell>{customer.address}</TableCell>
                      <TableCell>{customer.township}</TableCell>
                      <TableCell>{customer.region}</TableCell>
                      <TableCell align="center">
                        <IconPencil
                          strokeWidth={1.5}
                          size="1.3rem"
                          color="blue"
                          style={{ cursor: "pointer", marginRight: 12 }}
                          // onClick={() => handleEdit(customer)}
                        />
                        <IconTrash
                          strokeWidth={1.5}
                          color="red"
                          size="1.3rem"
                          style={{ cursor: "pointer" }}
                          // onClick={() => handleDelete(customer.id)}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>

              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={8} // match total columns
                    count={filteredCustomers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: {
                        "aria-label": "rows per page",
                      },
                      native: true,
                    }}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        )}

        {/* Dialog for creating/editing customers */}
        <CustomerDialog open={open} setOpen={setOpen} />
      </DashboardCard>
    </PageContainer>
  );
};

export default Customer;
