import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";

import React from "react";
import { DateTimeInputProps, DateTimeInputState } from "./interface";

class DateTimeInput extends React.Component<
  DateTimeInputProps,
  DateTimeInputState
> {
  constructor(props: DateTimeInputProps) {
    super(props);

    let splittedTime: string[] = this.parseTimeString(this.props.timeString);

    let isDateClosed = false;

    if (splittedTime[1] === "Closed") {
      isDateClosed = true;
    }

    this.state = {
      date: splittedTime[0],
      isClosed: isDateClosed,
      startTime: splittedTime[1],
      closeTime: splittedTime[2],
    };
  }

  parseTimeString = (str: string): string[] => {
    let splitted = str.split(" ", 6);

    let splittedStrTime: string[] = [];

    if (splitted[1] !== "Closed") {
      let openHourStr: string = "";
      if (splitted[2] === "PM" && +splitted[1].split(":", 1)[0] !== 12) {
        let openHour: number = +splitted[1].split(":", 1);
        openHour += 12;
        openHourStr =
          openHour.toString().padStart(2, "0") +
          ":" +
          splitted[1].split(":", 2)[1];
      } else if (+splitted[1].split(":", 1)[0] === 12 && splitted[2] === "AM") {
        openHourStr = "00:" + splitted[1].split(":", 2)[1];
      } else {
        openHourStr = splitted[1];
      }

      let closeHourStr: string = "";
      if (splitted[2] === "PM" && +splitted[1].split(":", 1)[0] !== 12) {
        let closeHour: number = +splitted[1].split(":", 1);
        closeHour += 12;
        closeHourStr = closeHour + ":" + splitted[1].split(":", 2)[1];
      } else if (+splitted[1].split(":", 1)[0] === 12 && splitted[2] === "AM") {
        closeHourStr = "00:" + splitted[1].split(":", 2)[1];
      } else {
        closeHourStr = splitted[1];
      }

      splittedStrTime = [splitted[0], openHourStr, closeHourStr];
    } else {
      splittedStrTime = [splitted[0], "Closed", "Closed"];
    }

    return splittedStrTime;
  };

  generateTimeString = (): string => {
    let generatedTimeString: string = this.state.date;

    if (!this.state.isClosed) {
      let splittedStartTime = this.state.startTime.split(":", 2);
      let openHour: number = +splittedStartTime[0];
      if (openHour > 12) {
        openHour -= 12;
        generatedTimeString +=
          " " +
          openHour.toString().padStart(2, "0") +
          ":" +
          splittedStartTime[1] +
          " PM";
      } else if (openHour === 12) {
        generatedTimeString += " 12:" + splittedStartTime[1] + " PM";
      } else if (openHour === 0) {
        generatedTimeString += " 12:" + splittedStartTime[1] + " AM";
      } else {
        generatedTimeString +=
          " " +
          openHour.toString().padStart(2, "0") +
          ":" +
          splittedStartTime[1] +
          " AM";
      }

      generatedTimeString += " -";

      let splittedCloseTime = this.state.closeTime.split(":", 2);
      let closeHour: number = +splittedCloseTime[0];
      if (closeHour > 12) {
        closeHour -= 12;
        generatedTimeString +=
          " " +
          closeHour.toString().padStart(2, "0") +
          ":" +
          splittedCloseTime[1] +
          " PM";
      } else if (closeHour === 12) {
        generatedTimeString += " 12:" + splittedCloseTime[1] + " PM";
      } else if (closeHour === 0) {
        generatedTimeString += " 12:" + splittedCloseTime[1] + " AM";
      } else {
        generatedTimeString +=
          " " +
          closeHour.toString().padStart(2, "0") +
          ":" +
          splittedCloseTime[1] +
          " AM";
      }
    } else {
      generatedTimeString += " Closed";
    }

    return generatedTimeString;
  };

  onIsClosedChange = (event: any) => {
    this.setState(
      () => {
        // return { isClosed: event.target.checked, startTime: "", closeTime: "" };
        return { isClosed: event.target.checked };
      },
      () => {
        this.props.updateTimeString(this.generateTimeString());
      }
    );
  };

  onOpenTimeChange = (event: any) => {
    this.setState(
      () => {
        return { startTime: event.target.value };
      },
      () => {
        this.props.updateTimeString(this.generateTimeString());
      }
    );
  };

  onCloseTimeChange = (event: any) => {
    this.setState(
      () => {
        return { closeTime: event.target.value };
      },
      () => {
        this.props.updateTimeString(this.generateTimeString());
      }
    );
  };

  render() {
    const {} = this.props;
    return (
      <>
        <Typography variant="h6">
          {this.state.date}
          <FormControlLabel
            control={
              <Checkbox
                onChange={this.onIsClosedChange}
                checked={this.state.isClosed}
              />
            }
            label="Closed"
            sx={{ marginLeft: 2 }}
          />
        </Typography>

        <TextField
          disabled={this.state.isClosed}
          margin="normal"
          id="time"
          label="Open Time"
          type="time"
          value={this.state.startTime}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
          sx={{ width: 175 }}
          onChange={this.onOpenTimeChange}
        />
        <TextField
          disabled={this.state.isClosed}
          margin="normal"
          id="time"
          label="Close Time"
          type="time"
          value={this.state.closeTime}
          InputLabelProps={{
            shrink: true,
          }}
          inputProps={{
            step: 300, // 5 min
          }}
          sx={{ width: 175, marginLeft: "11%" }}
          onChange={this.onCloseTimeChange}
        />
      </>
    );
  }
}

export default DateTimeInput;
