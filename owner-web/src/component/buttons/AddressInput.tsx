import {
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import { AddressInputProps } from "./interface";

export const AddressInput: React.FC<AddressInputProps> = (
  props: AddressInputProps
) => {
  const parsedAddress = props.address.split("\n", 4);
  const [street, setStreet] = useState(
    parsedAddress.length === 4
      ? parsedAddress[0].indexOf("Food Truck") !== -1
        ? parsedAddress[0].substring("Food Truck - ".length)
        : parsedAddress[0]
      : ""
  );
  const [city, setCity] = useState(
    parsedAddress.length === 4 ? parsedAddress[1] : ""
  );
  const [state, setState] = useState(
    parsedAddress.length === 4 ? parsedAddress[2] : ""
  );
  const [zipcode, setZipcode] = useState(
    parsedAddress.length === 4 ? parsedAddress[3] : ""
  );

  const [isFoodTruck, setIsFoodTruck] = useState(
    parsedAddress.length === 4
      ? parsedAddress[0].indexOf("Food Truck") !== -1
        ? true
        : false
      : false
  );

  useEffect(() => {
    updateAddress();
  }, [street, city, state, zipcode, isFoodTruck]);

  const updateAddress = () => {
    if (validateInputs() && !isFoodTruck) {
      props.onAddressChange(
        street + "\n" + city + "\n" + state + "\n" + zipcode
      );
    } else if (validateInputs() && isFoodTruck) {
      props.onAddressChange(
        "Food Truck - " + street + "\n" + city + "\n" + state + "\n" + zipcode
      );
    } else {
      props.onAddressChange("");
    }
  };

  const validateInputs = (): boolean => {
    if (street !== "" && city !== "" && state !== "" && zipcode !== "") {
      return true;
    }
    return false;
  };

  const onStreetChange = (event: any) => {
    setStreet(event.target.value);
  };

  const onCityChange = (event: any) => {
    setCity(event.target.value);
  };

  const onStateChange = (event: any) => {
    setState(event.target.value);
  };

  const onZipcodeChange = (event: any) => {
    setZipcode(event.target.value);
  };

  const onIsFoodTruckChange = (event: any) => {
    setIsFoodTruck(event.target.checked);
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
    <Box>
      <Box display="flex">
        <Typography variant="h6" align="left" sx={{ marginTop: 2 }}>
          Address
        </Typography>
        <FormControlLabel
          control={
            <Checkbox onChange={onIsFoodTruckChange} checked={isFoodTruck} />
          }
          label="Food Truck"
          sx={{ marginLeft: 2, marginTop: 1.5 }}
        />
      </Box>

      <TextField
        margin="dense"
        required
        id="street"
        label={isFoodTruck ? "Location Description" : "Street"}
        variant="standard"
        fullWidth
        defaultValue={street}
        onChange={onStreetChange}
        error={street === ""}
        helperText={street === "" ? "Street cannot be empty." : ""}
      />
      <TextField
        margin="dense"
        required
        id="city"
        label="City"
        variant="standard"
        sx={{ width: "45%" }}
        defaultValue={city}
        onChange={onCityChange}
        error={city === ""}
        helperText={city === "" ? "City cannot be empty." : ""}
      />
      <Select
        variant="standard"
        id="state"
        sx={{ width: "45%", marginLeft: "10%", marginTop: 3 }}
        defaultValue={state}
        displayEmpty
        MenuProps={MenuProps}
        onChange={onStateChange}
        error={state === ""}
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
      <TextField
        margin="dense"
        required
        id="zipcode"
        label="Zip Code"
        variant="standard"
        sx={{ width: "45%" }}
        defaultValue={zipcode}
        onChange={onZipcodeChange}
        error={zipcode === ""}
        helperText={zipcode === "" ? "Zip code cannot be empty." : ""}
      />
    </Box>
  );
};
