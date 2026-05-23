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
import { deleteTrainers, getTrainers } from "../../Redux/Redux";
import { SecondaryButton } from "../../Components/styledComponents/Buttons";
import { Link, replace, useNavigate, useNavigation } from "react-router-dom";

export default function AdminTrainers() {
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
let trainerList = useSelector((state) => state.trainer.trainer);
  console.log("tari",trainerList);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleEdit(params) {
    // navigate(`/admindashboard/trainers/:id`);
  }
  const rows = trainerList.map((i) =>
    createData(
      `${i.name}`,
      `${i.email}`,
      `${i.isVerfied ? "Verified" : "Not Verified"}`,
      `${i._id}`,
    ),
  );
  

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

  async function name(params) {
    try {
      const res = await axios.get(`${"http://localhost:8000"}/admin/trainers`, header);
      dispatch(getTrainers(res.data));
    } catch (error) {
      enqueueSnackbar("Server Error", { variant: "error" });
    }
  }
  async function handleDelete(params) {
    try {      
        await axios.delete(`http://localhost:8000/admin/deleteTrainer/${params}`,header)
        dispatch(deleteTrainers(params))
    } catch (error) {
      console.log(error.message);
        enqueueSnackbar('Server Error',{variant:'error'})
    }
  }
  React.useEffect(() => {

    name();
  }, []);

  return (
    <Box>
      <SnackbarProvider />

      <Paper sx={{ width: "100%", overflow: "hidden" ,mt:1 }}>
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
                        if (column.id === "action") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <Link to={`/admindashboard/edittrainers/${value}`} state={value}>
                              <SecondaryButton >
                                Edit
                              </SecondaryButton></Link>
                              <SecondaryButton
                                onClick={()=>handleDelete(value)                                  
                                }
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
            '& .css-wnzfoq-MuiNativeSelect-root-MuiSelect-select-MuiInputBase-input.css-wnzfoq-MuiNativeSelect-root-MuiSelect-select-MuiInputBase-input.css-wnzfoq-MuiNativeSelect-root-MuiSelect-select-MuiInputBase-input':{
              fontWeight:'bloder',
              '&: hover':{
                color:'#5eff00'
              }
            }
          }}  
        />
      </Paper>
      <Link to={`/admindashboard/edittrainers/add`} >
      <Button onClick={()=>{}}>Add Trainer</Button>
      </Link>
    </Box>
  );
}
