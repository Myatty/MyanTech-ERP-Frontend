import {
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import UserDialog from "./component/UserDialog";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "../../actions/userActions";

const User = () => {
  const dispatch = useDispatch();
  const { loading, users, error } = useSelector((state) => state.users);
  const [open, setOpen] = useState(false);

  const [department, setDepartment] = useState("");
  const departments = [
    { id: 1, name: "Sale" },
    { id: 2, name: "Warehouse" },
    { id: 3, name: "Finance" },
  ];

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const rows = [
    {
      id: 1,
      name: "Aung Aung",
      Ph_no: "0923463562",
      email: "aung@gmail.com",
      pw: "2346572",
      role: "Sale",
    },
    {
      id: 2,
      name: "Aye Aye",
      Ph_no: "093454463",
      email: "aye@gmail.com",
      pw: "67875464",
      role: "Finance",
    },
  ];
  return (
    <>
      <PageContainer title="User Page" description="this is user page">
        <DashboardCard title="User Page">
          <Button
            variant="contained"
            sx={{ mb: 4 }}
            onClick={() => {
              setOpen(true);
            }}
          >
            Create New User
          </Button>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", fontSize: 13.5 }}
                  >
                    id
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", fontSize: 13.5 }}
                  >
                    Name
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", fontSize: 13.5 }}
                  >
                    E-mail
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", fontSize: 13.5 }}
                  >
                    Phone
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold", fontSize: 13.5 }}
                  >
                    Role
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((row) => {
                  const editIcon = <IconPencil stroke={1.5} size="1.3rem" />;
                  const deleteIcon = <IconTrash stroke={1.5} size="1.3rem" />;

                  return (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell align="center">{row.id}</TableCell>
                      <TableCell align="center">{row.name}</TableCell>
                      <TableCell align="center">{row.email}</TableCell>
                      <TableCell align="center">{row.Ph_no}</TableCell>
                      <TableCell align="center">{row.role}</TableCell>
                      <TableCell align="center">{editIcon}</TableCell>
                      <TableCell align="center">{deleteIcon}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <UserDialog
            open={open}
            setOpen={setOpen}
            department={department}
            setDepartment={setDepartment}
            departments={departments}
          />
        </DashboardCard>
      </PageContainer>
    </>
  );
};
export default User;
