/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import axios from "axios";
import "./changePassword.scss";
import { Alert, Snackbar } from "@mui/material";
import React from "react";

export default function ChangePassword() {
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  function handleChangePassword() {
    const data = {
      oldPassword,
      newPassword,
    };

    axios
      .post("http://127.0.0.1:3000/api/v1/users/change-password", data, {
        headers: { token: localStorage.getItem("token") },
      })
      .then((res) => {
        setAlertMessage("Please check your email for confirmation!");
        setAlertOpen(true);
        handleClick();
        console.log("res", res);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }
  return (
    <div className="container">
      <h2>Password Change</h2>
      <br />
      <input
        value={oldPassword}
        onChange={(e) => {
          setOldPassword(e.target.value);
        }}
        type="password"
        placeholder="Old Password"
      />
      <br /> <br />
      <input
        value={newPassword}
        onChange={(e) => {
          setNewPassword(e.target.value);
        }}
        type="password"
        placeholder="New Password"
      />
      <br /> <br />
      <button
        onClick={() => {
          handleChangePassword();
        }}
        style={{ border: "1px solid black" }}
      >
        Change Password
      </button>
      {alertOpen && (
        <Alert severity="info" onClose={() => setAlertOpen(false)}>
          {alertMessage}
        </Alert>
      )}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Congratulations, you have successfully changed your password!
        </Alert>
      </Snackbar>
    </div>
  );
}
