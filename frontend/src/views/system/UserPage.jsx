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
import { useState } from "react";
import PageContainer from "src/components/container/PageContainer";
import DashboardCard from "../../components/shared/DashboardCard";
import UserDialog from "./component/UserDialog";
import { IconPencil, IconTrash } from "@tabler/icons-react";
const User = () => {
  const [open, setOpen] = useState(false);
  const [department, setDepartment] = useState(0);
  const departments = [
    { id: 1, name: "Sale" },
    { id: 2, name: "Warehouse" },
    { id: 3, name: "Finance" },
  ];
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
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="center">{row.id}</TableCell>
                    <TableCell align="center">{row.name}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{row.Ph_no}</TableCell>
                    <TableCell align="center">{row.role}</TableCell>
                    {/* <TableCell align="center">{IconPencil}</TableCell>
                    <TableCell align="center">{IconTrash}</TableCell> */}
                  </TableRow>
                ))}
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
