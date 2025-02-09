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
} from "@mui/material";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import UserDialog from "./component/UserDialog";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../actions/userActions";

const User = () => {
  const dispatch = useDispatch();
  const { loading, users, error } = useSelector((state) => state.users);

  const [open, setOpen] = useState(false);
  const [department, setDepartment] = useState("");

  // Search term state
  const [searchTerm, setSearchTerm] = useState("");

  // Pagination states
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Example departments array
  const departments = [
    { id: 1, name: "Sale" },
    { id: 2, name: "Warehouse" },
    { id: 3, name: "Finance" },
  ];

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // Handlers
  const handleOpenDialog = () => {
    setOpen(true);
  };
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setPage(0); // Reset to first page on new search
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Helper to get department name
  const getDepartmentName = (deptId) => {
    const dept = departments.find((d) => d.id === deptId);
    return dept ? dept.name : "N/A";
  };

  // If there's an error, display it
  if (error) {
    return <div>Error: {error}</div>;
  }

  // Filter the data by search term
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Slice the data for pagination
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedUsers =
    rowsPerPage > 0 ? filteredUsers.slice(startIndex, endIndex) : filteredUsers;

  return (
    <PageContainer title="User Page" description="this is user page">
      <DashboardCard>
        {/* Header with Title, Search Box, and Create Button */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 16,
            alignItems: "center",
          }}
        >
          <h2 style={{ margin: 0 }}>User List</h2>

          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <TextField
              label="Search by Name"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Button variant="contained" onClick={handleOpenDialog}>
              Create New User
            </Button>
          </div>
        </div>

        {loading ? (
          /* 
            SKELETON LOADING STATE
            We render a table layout but replace cell content with Skeletons 
          */
          <TableContainer
            component={Paper}
            sx={{ borderRadius: 2, overflow: "hidden" }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      fontSize: 13.5,
                      bgcolor: "primary.main",
                      color: "#fff",
                    }}
                  >
                    ID
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
                    E-mail
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      fontSize: 13.5,
                      bgcolor: "primary.main",
                      color: "#fff",
                    }}
                  >
                    Phone
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      fontSize: 13.5,
                      bgcolor: "primary.main",
                      color: "#fff",
                    }}
                  >
                    Department
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      fontSize: 13.5,
                      bgcolor: "primary.main",
                      color: "#fff",
                    }}
                  >
                    Role
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      fontSize: 13.5,
                      bgcolor: "primary.main",
                      color: "#fff",
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {[...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell align="center">
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton variant="text" />
                    </TableCell>
                    <TableCell align="center">
                      <Skeleton variant="text" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          /* 
            REAL TABLE WHEN NOT LOADING 
          */
          <TableContainer
            component={Paper}
            sx={{ borderRadius: 2, overflow: "hidden" }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="user table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      fontSize: 13.5,
                      bgcolor: "primary.main",
                      color: "#fff",
                    }}
                  >
                    ID
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
                    E-mail
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      fontSize: 13.5,
                      bgcolor: "primary.main",
                      color: "#fff",
                    }}
                  >
                    Phone
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      fontSize: 13.5,
                      bgcolor: "primary.main",
                      color: "#fff",
                    }}
                  >
                    Department
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      fontSize: 13.5,
                      bgcolor: "primary.main",
                      color: "#fff",
                    }}
                  >
                    Role
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      fontWeight: "bold",
                      fontSize: 13.5,
                      bgcolor: "primary.main",
                      color: "#fff",
                    }}
                  >
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {paginatedUsers.map((row, index) => {
                  // For alternating row background color:
                  const isOddRow = index % 2 !== 0;
                  return (
                    <TableRow
                      key={row.employee_id}
                      sx={{
                        backgroundColor: isOddRow ? "action.hover" : "inherit",
                      }}
                    >
                      <TableCell align="center">{row.employee_id}</TableCell>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell align="center">{row.phone_number}</TableCell>
                      <TableCell align="center">
                        {getDepartmentName(row.department_id)}
                      </TableCell>
                      <TableCell align="center">{row.role_name}</TableCell>
                      <TableCell align="center">
                        <IconPencil
                          strokeWidth={1.5}
                          size="1.3rem"
                          color="green"
                          style={{ cursor: "pointer", marginRight: 12 }}
                        />
                        <IconTrash
                          strokeWidth={1.5}
                          color="red"
                          size="1.3rem"
                          style={{ cursor: "pointer" }}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>

              {/* MUI's pagination in the TableFooter */}
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "All", value: -1 },
                    ]}
                    colSpan={7} // match total number of columns
                    count={filteredUsers.length}
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

        {/* Dialog for creating new users */}
        <UserDialog
          open={open}
          setOpen={setOpen}
          department={department}
          setDepartment={setDepartment}
          departments={departments}
        />
      </DashboardCard>
    </PageContainer>
  );
};

export default User;
