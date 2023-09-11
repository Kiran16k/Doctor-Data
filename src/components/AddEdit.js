import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";

import "./Table.css";

export default function AddEdit({
  type,
  data,
  updateJsonData,
  updateDoctorList,
}) {
  const [open, setOpen] = useState(false);
  const formDataInitial = {
    name: type === "edit" ? data.name : "",
    phone: type === "edit" ? data.phone : "",
  };
  const [formData, setFormData] = useState(formDataInitial);

  const handleOpen = () => {
    if (type === "add") {
      setFormData(formDataInitial);
    }
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const apiUrl = "https://64e31042bac46e480e781cda.mockapi.io/api/v1/doctor";
    const requestData = { name: formData.name, phone: formData.phone };

    try {
      if (type === "edit") {
        await axios.put(`${apiUrl}/${data.id}`, requestData);
        updateJsonData((prevData) =>
          prevData.map((doctor) =>
            doctor.id === data.id ? { ...doctor, requestData } : doctor
          )
        );
        updateDoctorList();
      } else if (type === "add") {
        await axios.post(apiUrl, requestData);
        updateDoctorList();
      }

      handleClose();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fields = [
    { label: "Doctor Name", name: "name" },
    { label: "Phone Number", name: "phone" },
  ];

  return (
    <div className="AddModal">
      {type === "edit" ? (
        <Button onClick={handleOpen} style={{ color: "black" }}>
          <EditIcon />
        </Button>
      ) : (
        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            variant="contained"
            onClick={handleOpen}
            style={{ color: "whitesmoke" }}
          >
            Add
          </Button>
        </div>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="wrapper">
          <div>
            <fieldset>
              <legend>
                <h3>{type === "edit" ? "Edit Doctor" : "Add Doctor"}</h3>
              </legend>
              <div>
                <form onSubmit={handleSubmit}>
                  {fields.map((field) => (
                    <TextField
                      className="TextField"
                      key={field.name}
                      style={{ margin: "1%" }}
                      required
                      id={`outlined-${field.name}`}
                      label={field.label}
                      type="text"
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                    />
                  ))}
                  <br />
                  <div style={{ margin: "1%" }}>
                    <Button
                      variant="contained"
                      type="submit"
                      style={{ marginRight: "2%" }}
                    >
                      {type === "edit" ? "Save" : "Add"}
                    </Button>
                    <Button
                      variant="contained"
                      type="button"
                      onClick={handleClose}
                    >
                      Close
                    </Button>
                  </div>
                </form>
              </div>
            </fieldset>
          </div>
        </div>
      </Modal>
    </div>
  );
}
