import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import { Typography } from "@mui/material";
import TextField from "@mui/material/TextField";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  backgroundColor: "white",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditModal({ doctorData, updateJsonData }) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setName("");
    setPhone("");
  };
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const submitForm = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://64e31042bac46e480e781cda.mockapi.io/api/v1/doctor/${doctorData.id}`,
        {
          name,
          phone,
        }
      )
      .then((res) => {
        console.log(res);
        updateJsonData((prevData) =>
          prevData.map((doctor) =>
            doctor.id === doctorData.id ? { ...doctor, name, phone } : doctor
          )
        );
        axios
          .get("https://64e31042bac46e480e781cda.mockapi.io/api/v1/doctor")
          .then((response) => {
            console.log(response);
            updateJsonData(response.data);
          })
          .catch((error) => {
            console.error("Error fetching JSON data:", error);
          });
        handleClose();
      })
      .catch((error) => {
        console.error("Error editing doctor:", error);
      });
  };
  return (
    <div>
      <Button onClick={handleOpen} style={{ color: "black" }}>
        <EditIcon />
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div style={style}>
          <div>
            <fieldset>
              <legend>
                <h3>Edit Doctor</h3>
              </legend>
              <div>
                <form onSubmit={submitForm}>
                  <Typography>ID:{doctorData.id}</Typography>
                  <TextField
                    style={{ margin: "1%" }}
                    required
                    id="outlined-required"
                    label="Doctor Name"
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                  />
                  <br />
                  <TextField
                    style={{ margin: "1%" }}
                    required
                    id="outlined-required"
                    label="Phone Number"
                    type="text"
                    name="phone"
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                  <br />
                  <div style={{ margin: "1%" }}>
                    <Button
                      variant="contained"
                      type="submit"
                      style={{ marginRight: "2%" }}
                    >
                      Save
                    </Button>
                    <Button
                      variant="contained"
                      type="button"
                      onClick={handleClose}
                    >
                      Cancel
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
