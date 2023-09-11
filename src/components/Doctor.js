import React, { useState, useEffect } from "react";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import AddEdit from "./AddEdit";
import "./Table.css";
import TableData from "./TableContainer";

export default function Doctor() {
  const [jsonData, setJsonData] = useState([]);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const updateDoctorList = async () => {
    try {
      const response = await axios.get(
        "https://64e31042bac46e480e781cda.mockapi.io/api/v1/doctor"
      );
      setJsonData(response.data);
    } catch (error) {
      console.error("Error fetching JSON data:", error);
    }
  };

  useEffect(() => {
    updateDoctorList();
  }, []);

  const handleDelete = (id) => {
    setSelectedDoctorId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `https://64e31042bac46e480e781cda.mockapi.io/api/v1/doctor/${selectedDoctorId}`
      );
      setJsonData((prevData) =>
        prevData.filter((doctor) => doctor.id !== selectedDoctorId)
      );
      updateDoctorList();
      setDeleteDialogOpen(false);
      setSelectedDoctorId(null);
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setSelectedDoctorId(null);
  };

  return (
    <fieldset style={{ border: "none" }}>
      <div className="DoctorHeading">
        <h1>Doctors</h1>
        <AddEdit type="add" updateDoctorList={updateDoctorList} />
      </div>
      <TableData
        jsonData={jsonData}
        handleDelete={handleDelete}
        setJsonData={setJsonData}
        updateDoctorList={updateDoctorList}
      />
      <Dialog
        open={deleteDialogOpen}
        onClose={cancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Doctor?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this doctor?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </fieldset>
  );
}
