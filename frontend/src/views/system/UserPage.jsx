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
} from "@mui/material";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { CSVLink } from "react-csv";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import UserDialog from "./components/UserDialog";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../actions/userActions";

const User = () => {
  const dispatch = useDispatch();
  const { loading, users, error } = useSelector((state) => state.users);

  const [open, setOpen] = useState(false);
  const [department, setDepartment] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [roleFilter, setRoleFilter] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
    setPage(0);
  };

  const handleRoleFilter = (e) => {
    setRoleFilter(e.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getDepartmentName = (deptId) => {
    const dept = departments.find((d) => d.id === deptId);
    return dept ? dept.dept_name : "N/A";
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  const uniqueRoles = [
    "All",
    ...new Set(users.map((user) => user.role_name).filter(Boolean)),
  ];

  const filteredUsers = users.filter((user) => {
    const matchesName = user.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRole =
      roleFilter && roleFilter !== "All" ? user.role_name === roleFilter : true;

    return matchesName && matchesRole;
  });

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedUsers =
    rowsPerPage > 0 ? filteredUsers.slice(startIndex, endIndex) : filteredUsers;

  const csvHeaders = [
    { label: "ID", key: "employee_id" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Phone", key: "phone_number" },
    {
      label: "Department",
      key: "department_id",
    },
    { label: "Role", key: "role_name" },
  ];

  const csvData = filteredUsers.map((user) => ({
    ...user,
    department_id: getDepartmentName(user.department_id),
  }));

  const csvReport = {
    data: csvData,
    headers: csvHeaders,
    filename: "UserReport.csv",
  };

  return (
    <PageContainer title="User Page" description="this is user page">
      <DashboardCard>
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 16,
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <h2>User List</h2>
          {/* Right side actions */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            {/* Role Filter */}
            <FormControl variant="outlined" size="small">
              <InputLabel>Role Filter</InputLabel>
              <Select
                label="Role Filter"
                value={roleFilter}
                onChange={handleRoleFilter}
                style={{ width: 150 }}
              >
                {uniqueRoles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Search Box */}
            <TextField
              label="Search by Name"
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={handleSearch}
            />

            {/* Create Button */}
            <Button variant="contained" onClick={handleOpenDialog}>
              Create New User
            </Button>

            {/* CSV Export */}
            <CSVLink {...csvReport} style={{ textDecoration: "none" }}>
              <Button variant="outlined">Export</Button>
            </CSVLink>
          </div>
        </div>

        {loading ? (
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
                      <TableCell align="center">{row.dept_name}</TableCell>
                      <TableCell align="center">{row.role_name}</TableCell>
                      <TableCell align="center">
                        <IconPencil
                          strokeWidth={1.5}
                          size="1.3rem"
                          color="blue"
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
