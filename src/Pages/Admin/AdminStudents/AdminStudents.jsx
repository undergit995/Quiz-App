import { Button, Box, TablePagination } from "@mui/material";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { enqueueSnackbar, SnackbarProvider } from "notistack";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { replace, useNavigate, useNavigation } from "react-router-dom";
import { SecondaryButton } from "../../../Components/styledComponents/Buttons";
import { deleteStudents, getStudents } from "../../../Redux/Redux";
import {useTheme} from '@mui/material'

export default function AdminStudents() {
  const columns = [
    { id: "name", label: "Name", minWidth: 170 },
    { id: "email", label: "Email", minWidth: 100 },
    {
      id: "authentication",
      label: "Authentication",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
    {
      id: "action",
      label: "Action",
      minWidth: 170,
      align: "right",
      format: (value) => value.toLocaleString("en-US"),
    },
  ];

  function createData(name, email, authentication, action) {
    return { name, email, authentication, action };
  }
  const theme = useTheme();

  let studentList = useSelector((state) => state.student?.student || []);
  const dispatch = useDispatch();

  let navigate = useNavigate();

  function handleEdit(params) {
    navigate(`/admindashboard/editstudents/${params}`);
  }
  const rows = studentList.map((i) =>
    createData(
      `${i.name}`,
      `${i.email}`,
      `${i.isVerfied ? "Verified" : "Not Verified"}`,
      `${i._id}`,
    ),
  );

  console.log(studentList);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  let header = {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  };

  async function handleDelete(params) {
    try {
      await axios.delete(
        `https://quiz-backend-cw2w.onrender.com/admin/deleteStudent/${params}`,
        header,
      );
      dispatch(deleteStudents(params));
    } catch (error) {
      enqueueSnackbar("Server Error", { variant: "error" });
    }
  }

  async function name(params) {
    try {
      const res = await axios.get(
        `https://quiz-backend-cw2w.onrender.com/admin/students`,
        header,
      );
      console.log(res.data);
      dispatch(getStudents(res.data));
    } catch (error) {
      enqueueSnackbar("Server Error", { variant: "error" });
    }
  }
  React.useEffect(() => {
    name();
  }, []);
  return (
    <Box>
      <SnackbarProvider />

      <Paper sx={{ width: "80vw", overflow: "hidden", margin: "auto", mt: 2 }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.email}
                    >
                      {columns.map((column) => {
                        const value = row[column.id];
                        if (column.id == "action") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <SecondaryButton
                                onClick={() => handleEdit(value)}
                              >
                                Edit
                              </SecondaryButton>
                              <SecondaryButton
                                onClick={() => handleDelete(value)}
                              >
                                Delete
                              </SecondaryButton>
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === "number"
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            '& .MuiSelect-select':{
              fontWeight:'bold',
              '&: hover':{
                color:'#5eff00'
              }
            }
          }}
        />
      </Paper>
      <Button
        sx={{
          border: `1px solid ${theme.colorSchemes.dark.palette.primary.main}`,
          borderRadius: 12,
          mt: 1,
        }}
        onClick={() => {
          navigate(`/admindashboard/editstudents/add`);
        }}
      >
        Add Student
      </Button>
    </Box>
  );
}
