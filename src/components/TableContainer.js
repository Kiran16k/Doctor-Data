import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import ModalComponent from "./Modal";
import React from "react";

const TableData = ({
  jsonData,
  handleDelete,
  setJsonData,
  updateDoctorList,
}) => {
  return (
    <div>
      <TableContainer className="TableContainer" component={Paper}>
        <Table
          className="Table"
          sx={{ minWidth: 650 }}
          aria-label="simple table"
        >
          <TableHead className="TableHeadCell">
            <TableRow className="TableRow">
              <TableCell>ID</TableCell>
              <TableCell>Doctor Name</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jsonData.map((row) => (
              <TableRow
                className="TableRow"
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell className="TableCellData" component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell className="TableCellData" component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell className="TableCellData" component="th" scope="row">
                  {row.phone}
                </TableCell>
                <TableCell className="TableCellData">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <DeleteIcon onClick={() => handleDelete(row.id)} />
                    <ModalComponent
                      type="edit"
                      data={row}
                      updateJsonData={setJsonData}
                      updateDoctorList={updateDoctorList}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default TableData;
