import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv"; // For exporting CSV
import { fetchProducts } from "../../actions/productActions";
import {
  Button,
  TextField,
  MenuItem,
  Box,
  Skeleton,
  FormControl,
  InputLabel,
  Select,
  Typography,
} from "@mui/material";
import { IconPencil, IconTrash } from "@tabler/icons-react";

import DialogBox from "./component/dilogBox";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";

const Product = () => {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.products);

  const [open, setOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search term
  const [categoryFilter, setCategoryFilter] = useState(""); // Category filter

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleProductCreated = () => {
    dispatch(fetchProducts());
  };



  // Get unique categories from products
  const uniqueCategories = [
    ...new Set(products?.map((product) => product.category) || []),
  ];

  // Filtered products based on search & category
  const filteredProducts = (products || []).filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter ? product.category === categoryFilter : true)
  );

  // CSV configuration
  const csvHeaders = [
    { label: "Item Name", key: "name" },
    { label: "Brand", key: "brand" },
    { label: "Category", key: "category" },
    { label: "Product Segment", key: "product_segment" },
    { label: "Serial Number", key: "serial_number" },
    { label: "Unit Price", key: "price" },
    { label: "Quantity", key: "stock_quantity" },
  ];

  const csvReport = {
    data: filteredProducts,
    headers: csvHeaders,
    filename: "ProductReport.csv",
  };

  const handleEdit = (row) => {
    alert(`Edit product ID: ${row._id || row.id}`);
  };

  // DataTable columns
  const columns = [
    { name: "No", selector: (row, index) => index + 1, width: "60px" },
    {
      name: "Item Name",
      selector: (row) => row.name,
      sortable: true,
      width: "180px",
    },
    {
      name: "Brand",
      selector: (row) => row.brand,
      sortable: true,
      width: "140px",
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
      width: "140px",
    },
    {
      name: "Product Segment",
      selector: (row) => row.product_segment,
      sortable: true,
      width: "160px",
    },
    {
      name: "Serial Number",
      selector: (row) => row.serial_number,
      sortable: true,
      width: "100px",
    },
    {
      name: "Unit Price",
      selector: (row) => row.price,
      sortable: true,
      width: "120px",
      sortFunction: (a, b) => parseFloat(a.price) - parseFloat(b.price),
    },
    {
      name: "Qty",
      selector: (row) => row.stock_quantity,
      sortable: true,
      width: "100px",
    },
    {
      name: "Action",
      cell: (row) => (
        <>
          <IconPencil
            stroke={1.5}
            size="1.3rem"
            style={{ cursor: "pointer", color: "blue", marginRight: "10px" }}
            onClick={() => handleEdit(row)}
          />
          <IconTrash
            stroke={1.5}
            size="1.3rem"
            style={{ cursor: "pointer", color: "red" }}
            onClick={() => handleEdit(row)}
          />
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // Custom styles for DataTable
  const customStyles = {
    headRow: {
      style: {
        backgroundColor: "#5D87FF",
        minHeight: "56px",
        borderTopRightRadius: "8px",
        borderTopLeftRadius: "8px",
      },
    },
    headCells: {
      style: {
        color: "#FFF",
        fontSize: "14px",
        fontWeight: "bold",
        "&:not(:last-of-type)": {
          borderRight: "1px solid #e0e0e0",
        },
      },
    },
  };

  const handleSelectedRowsChange = (state) => {
    setSelectedRows(state.selectedRows);
  };

  // Simple error message
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <PageContainer title="Product Page" description="this is product page">
      <DashboardCard>
        {/* TOP SECTION with Heading, Total Products, and Export */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: "20px",
            flexWrap: "wrap", // in case screen is small
          }}
        >
          {/* Display total and filtered counts */}
          <Box
            sx={{
              backgroundColor: "#F0F0F0",
              p: 2,
              borderRadius: 2,
              minWidth: "200px",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Total Products: {filteredProducts?.length || 0}
            </Typography>
          </Box>

          {/* SEARCH & CATEGORY FILTER SECTION */}
          <Box display="flex" sx={{ width: "50%" }} gap={2} mb={2}>
            {/* Search Box */}
            <TextField
              size="small"
              label="Search Product"
              variant="outlined"
              fullWidth
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            {/* Category Dropdown */}
            <FormControl variant="outlined" size="small" fullWidth>
              <InputLabel>Filter by Category</InputLabel>
              <Select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                label="Filter by Category"
              >
                <MenuItem value="">All Categories</MenuItem>
                {uniqueCategories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <CSVLink {...csvReport} style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary">
                Export
              </Button>
            </CSVLink>
          </Box>
        </div>

        {/* SHOW SKELETON WHILE LOADING */}
        {loading ? (
          <Box>
            {[...Array(6)].map((_, index) => (
              <Box key={index} display="flex" alignItems="center" gap={2} p={1}>
                <Skeleton variant="text" width={40} />
                <Skeleton variant="text" width={150} />
                <Skeleton variant="text" width={130} />
                <Skeleton variant="text" width={120} />
                <Skeleton variant="text" width={160} />
                <Skeleton variant="text" width={100} />
                <Skeleton variant="text" width={110} />
                <Skeleton variant="text" width={90} />
              </Box>
            ))}
          </Box>
        ) : (
          <DataTable
            columns={columns}
            data={filteredProducts} // use the filtered data
            pagination
            highlightOnHover
            striped
            selectableRows
            onSelectedRowsChange={handleSelectedRowsChange}
            subHeaderAlign="center"
            customStyles={customStyles}
          />
        )}

        <DialogBox
          open={open}
          setOpen={setOpen}
          onProductCreated={handleProductCreated}
        />
      </DashboardCard>
    </PageContainer>
  );
};

export default Product;
