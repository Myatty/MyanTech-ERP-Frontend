import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DataTable from "react-data-table-component";
import { CSVLink } from "react-csv"; // For exporting CSV
import { fetchProducts } from "../../actions/productActions";
import Button from "@mui/material/Button";
import DialogBox from "./component/dilogBox";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";

const ProductPage = () => {
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.products);

  const [open, setOpen] = useState(false);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleProductCreated = () => {
    dispatch(fetchProducts());
  };

  // Simple handler to show how you might respond to an Edit button
  const handleEdit = (row) => {
    alert(`Edit product ID: ${row._id || row.id}`);
    // Or open an edit dialog, navigate to an edit page, etc.
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Data for react-data-table-component
  const data = products || [];

  // Example: generate CSV column headers from your columns array
  // Or define them manually, if you prefer
  const csvHeaders = [
    { label: "Item Name", key: "name" },
    { label: "Brand", key: "brand" },
    { label: "Category", key: "category" },
    { label: "Product Segment", key: "product_segment" },
    { label: "Serial Number", key: "serial_number" },
    { label: "Unit Price", key: "price" },
    { label: "Quantity", key: "stock_quantity" },
  ];

  // CSVLink config
  const csvReport = {
    data,
    headers: csvHeaders,
    filename: "ProductReport.csv",
  };

  // Define columns (including an "Actions" column for Edit)
  const columns = [
    // This first column is not necessary for checkboxes;
    // we leave it if you still want a "No." column.
    {
      name: "No",
      selector: (row, index) => index + 1,
      width: "60px",
    },
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
        <Button variant="outlined" size="small" onClick={() => handleEdit(row)}>
          Edit
        </Button>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  // Callback whenever selected rows change
  const handleSelectedRowsChange = (state) => {
    setSelectedRows(state.selectedRows);
  };

  return (
    <PageContainer title="Product Page" description="this is product page">
      <DashboardCard title="Product List">
        {/* Create New Product button at the top-right */}
        <Button
          sx={{ float: "right" }}
          variant="contained"
          onClick={() => setOpen(true)}
        >
          Create New Product
        </Button>
        <CSVLink {...csvReport} style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ mr: 2, float: "right" }}
          >
            Export
          </Button>
        </CSVLink>
        {/* DataTable with subHeader for the Export button */}
        <DataTable
          columns={columns}
          data={data}
          pagination
          highlightOnHover
          striped
          // Enable row selection (checkboxes)
          selectableRows
          onSelectedRowsChange={handleSelectedRowsChange}
          // Add a subHeader and center it
          subHeader
          subHeaderAlign="center"
        />

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
