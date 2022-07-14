import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  Grid,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import { updateUID } from "../../database/api/DevApi";
import { toPng } from "html-to-image";
import { QRCode } from "react-qrcode-logo";
import ChoozIcon from "../images/chooz_icons/logoRed_bgWhiteCircular.png";

export const GenerateQRByLinkPanel: React.FC = () => {
  const printRef = React.useRef<HTMLDivElement>(null);

  const [open, setOpen] = React.useState(false);

  const [link, setLink] = React.useState("");

  const [city, setCity] = React.useState("");

  const [state, setState] = React.useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const downloadQR = () => {
    if (printRef.current === null) {
      console.log("It was null");
      return;
    }

    toPng(printRef.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "Chooz QR By Link.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: "30%",
        width: "auto",
      },
    },
  };

  const states = [
    "AL",
    "AK",
    "AS",
    "AZ",
    "AR",
    "CA",
    "CO",
    "CT",
    "DE",
    "DC",
    "FM",
    "FL",
    "GA",
    "GU",
    "HI",
    "ID",
    "IL",
    "IN",
    "IA",
    "KS",
    "KY",
    "LA",
    "ME",
    "MH",
    "MD",
    "MA",
    "MI",
    "MN",
    "MS",
    "MO",
    "MT",
    "NE",
    "NV",
    "NH",
    "NJ",
    "NM",
    "NY",
    "NC",
    "ND",
    "MP",
    "OH",
    "OK",
    "OR",
    "PW",
    "PA",
    "PR",
    "RI",
    "SC",
    "SD",
    "TN",
    "TX",
    "UT",
    "VT",
    "VI",
    "VA",
    "WA",
    "WV",
    "WI",
    "WY",
  ].sort(function (a, b) {
    return a.localeCompare(b); //using String.prototype.localCompare()
  });

  return (
    <Box display="flex" justifyContent="center" marginTop={5}>
      <Box display="flex" flexDirection="column" width="50%">
        <Typography sx={{ marginTop: 1 }}>Add general link</Typography>
        <Box display="flex">
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={() => {
              setLink(link + "https://");
            }}
          >
            Add: https://
          </Button>
          <Button
            variant="contained"
            sx={{ textTransform: "none", marginLeft: 1 }}
            onClick={() => {
              setLink(link + "choozmenu.com/");
            }}
          >
            Add: choozmenu.com/
          </Button>
          <Button
            variant="contained"
            sx={{ textTransform: "none", marginLeft: 1 }}
            onClick={() => {
              setLink(link + "m.choozmenu.com/");
            }}
          >
            Add: m.choozmenu.com/
          </Button>
        </Box>
        <Typography sx={{ marginTop: 1 }}>
          Add extensions (for m.choozmenu.com/)
        </Typography>
        <Box display="flex">
          <Button
            variant="contained"
            sx={{ textTransform: "none" }}
            onClick={() => {
              setLink(link + "menu/");
            }}
          >
            Add: menu/
          </Button>
          <Button
            variant="contained"
            sx={{ textTransform: "none", marginLeft: 1 }}
            onClick={() => {
              setLink(link + "welcome/");
            }}
          >
            Add: welcome/
          </Button>
          <Button
            variant="contained"
            sx={{ textTransform: "none", marginLeft: 1 }}
            onClick={() => {
              setLink(link + "list/");
            }}
          >
            Add: list/
          </Button>
        </Box>
        <Typography sx={{ marginTop: 1 }}>
          Add city info (for m.choozmenu.com/list/)
        </Typography>
        <Box display="flex">
          <TextField
            margin="dense"
            required
            id="city"
            placeholder="City"
            variant="standard"
            sx={{ width: "30%", height: 30 }}
            defaultValue={""}
            onChange={(e) => {
              setCity(e.target.value);
            }}
            value={city}
          />
          <Select
            variant="standard"
            id="state"
            sx={{ width: "10%", marginLeft: 2, height: 40 }}
            defaultValue={""}
            displayEmpty
            MenuProps={MenuProps}
            onChange={(e) => {
              setState(e.target.value);
            }}
            value={state}
          >
            <MenuItem disabled value="">
              <em>State</em>
            </MenuItem>
            {states.map((state, i) => (
              <MenuItem key={i} value={state}>
                {state}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            sx={{
              textTransform: "none",
              marginLeft: 4,
              height: 35,
              marginTop: 1,
            }}
            onClick={() => {
              setLink(
                link +
                  city.replace(" ", "_").toLowerCase() +
                  "-" +
                  state.toLowerCase()
              );
            }}
          >
            Add: city-state
          </Button>
        </Box>

        <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 4 }}>
          Link to Generate QR
        </Typography>
        <TextField
          margin="dense"
          id="target"
          variant="standard"
          placeholder="Enter the link to generate the QR"
          value={link}
          onChange={(e) => {
            setLink(e.target.value);
          }}
        />
        <Box display="flex" justifyContent="flex-end" marginTop={2}>
          <Button
            variant="outlined"
            sx={{ textTransform: "none" }}
            onClick={() => {
              setLink("");
              setCity("");
              setState("");
            }}
          >
            Clear
          </Button>
          <Button
            variant="contained"
            sx={{ textTransform: "none", marginLeft: 1 }}
            onClick={handleOpen}
          >
            Generate QR
          </Button>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          minHeight: "500px",
        }}
      >
        <DialogTitle>
          <Typography fontSize={22} fontWeight="bold" align="center">
            Generate QR
          </Typography>
        </DialogTitle>
        <DialogContent>
          <DialogContentText color="black">
            <Typography fontSize={20}>Link: {link}</Typography>
          </DialogContentText>
          <Grid container justifyContent="center">
            <Box
              marginTop={1}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              marginLeft={5}
              marginRight={5}
            >
              <div ref={printRef}>
                <QRCode
                  value={link}
                  logoImage={ChoozIcon}
                  logoHeight={80}
                  logoWidth={80}
                  eyeRadius={10}
                  qrStyle="dots"
                  size={300}
                />
              </div>

              <Button
                variant="outlined"
                sx={{
                  width: "90%",
                  marginLeft: "5%",
                  marginTop: "5%",
                  textTransform: "none",
                }}
                onClick={downloadQR}
              >
                Download Image
              </Button>
            </Box>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={{ textTransform: "none" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
