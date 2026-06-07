import React from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";

export default function CustomTable({
  columns = [],
  rows = [],
  open,
  view,
  publish,
  actions,
  rowsPerPageOptions = [10, 25, 100],
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align || "left"}
                  style={{ minWidth: column.minWidth || 100 }}
                >
                  {column.label}
                </TableCell>
              ))}
              {open && <TableCell align="center">Questions</TableCell>}
              {publish && <TableCell align="center">Publish</TableCell>}
              {view && <TableCell align="center">View Results</TableCell>}
              {actions && <TableCell align="center">Actions</TableCell>}
            </TableRow>
          </TableHead>

          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow hover key={index}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align || "left"}>
                        {column.render ? column.render(value, row) : value}
                      </TableCell>
                    );
                  })}
                  {open && <TableCell align="center">{open(row)}</TableCell>}
                  {publish && (
                    <TableCell align="center">{publish(row)}</TableCell>
                  )}
                  {view && <TableCell align="center">{view(row)}</TableCell>}

                  {actions && (
                    <TableCell align="center">{actions(row)}</TableCell>
                  )}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
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
  );
}
