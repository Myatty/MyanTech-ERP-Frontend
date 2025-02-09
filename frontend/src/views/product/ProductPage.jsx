import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv"; // For exporting CSV
import { fetchProducts } from "../../actions/productActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import DialogBox from "./component/dilogBox";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import Skeleton from "@mui/material/Skeleton";
import Box from "@mui/material/Box";
import { FormControl, InputLabel, Select } from "@mui/material";

const ProductPage = () => {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.products);
  const [open, setOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Search term state
  const [categoryFilter, setCategoryFilter] = useState(""); // Category filter state

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handleProductCreated = () => {
    dispatch(fetchProducts());
  };

  const handleEdit = (row) => {
    alert(`Edit product ID: ${row._id || row.id}`);
  };

  // Get unique categories from products
  const uniqueCategories = [
    ...new Set(products?.map((product) => product.category) || []),
  ];

  // Filtered products based on search & category
  const filteredProducts = products?.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter ? product.category === categoryFilter : true)
  );

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
    },
    {
      name: "Quantity",
      selector: (row) => row.stock_quantity,
      sortable: true,
      width: "100px",
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleEdit(row)}
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{ ml: 1 }}
            color="error"
            onClick={() => handleEdit(row)}
          >
            Delete
          </Button>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const handleSelectedRowsChange = (state) => {
    setSelectedRows(state.selectedRows);
  };

  return (
    <PageContainer title="Product Page" description="this is product page">
      <DashboardCard>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2>Product List</h2>
          <div>
            <CSVLink {...csvReport} style={{ textDecoration: "none" }}>
              <Button variant="contained" color="primary">
                Export
              </Button>
            </CSVLink>
          </div>
        </div>

        {/* Search & Category Filter Section */}
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
        </Box>

        {/* Show Skeleton while Loading */}
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
            data={filteredProducts} // Use filtered data
            pagination
            highlightOnHover
            striped
            selectableRows
            onSelectedRowsChange={handleSelectedRowsChange}
            subHeaderAlign="center"
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

export default ProductPage;
