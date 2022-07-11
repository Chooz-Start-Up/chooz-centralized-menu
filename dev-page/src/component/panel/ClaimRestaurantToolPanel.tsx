import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Alert, Button, Fade, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { updateUID } from "../../database/api/DevApi";

export const ClaimRestaurantToolPanel: React.FC = () => {
  const [targetUID, setTargetUID] = useState("");
  const [sourceUID, setSourceUID] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = () => {
    updateUID(targetUID, sourceUID).then(
      (msg) => {
        setSuccessMessage(msg);
        setErrorMessage("");
      },
      (msg) => {
        setSuccessMessage("");
        setErrorMessage(msg);
      }
    );
  };

  return (
    <>
      <Fade
        in={successMessage !== ""}
        exit={false}
        mountOnEnter
        unmountOnExit
        timeout={300}
        onEntered={() => {
          setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
          }, 8000);
        }}
      >
        <Alert severity="success" sx={{ justifyContent: "center" }}>
          {successMessage}
        </Alert>
      </Fade>
      <Fade
        in={errorMessage !== ""}
        exit={false}
        mountOnEnter
        unmountOnExit
        timeout={300}
        onEntered={() => {
          setTimeout(() => {
            setSuccessMessage("");
            setErrorMessage("");
          }, 8000);
        }}
      >
        <Alert severity="error" sx={{ justifyContent: "center" }}>
          {errorMessage}
        </Alert>
      </Fade>

      <Box display="flex" padding={5} justifyContent="center" height="60vh">
        <Box display="flex" flexDirection="column" width="40%">
          <TextField
            margin="dense"
            id="target"
            label={"ID to Claim (UID)"}
            variant="standard"
            placeholder="General description for all items in the category"
            onChange={(e) => {
              setTargetUID(e.target.value);
            }}
          />
          <TextField
            margin="dense"
            id="Source"
            label={"Owner ID (UID)"}
            variant="standard"
            placeholder="General description for all items in the category"
            onChange={(e) => {
              setSourceUID(e.target.value);
            }}
          />
          <Box display="flex" justifyContent="flex-end" marginTop={5}>
            <Button
              variant="contained"
              onClick={onSubmit}
              sx={{ textTransform: "none" }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
