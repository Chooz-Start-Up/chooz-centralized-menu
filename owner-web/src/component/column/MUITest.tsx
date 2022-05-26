import * as React from "react";
import Box, { BoxProps } from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import Fab from "@mui/material/Fab";

export function ItemBox(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "#fff",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "2px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.500",
        p: 2,
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        textAlign: "center",
        width: "150px",
        height: "20px",
        ...sx,
      }}
      {...other}
    />
  );
}

export function MenuBox(props: BoxProps) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        bgcolor: (theme) =>
          theme.palette.mode === "dark" ? "#101010" : "#fff",
        color: (theme) =>
          theme.palette.mode === "dark" ? "grey.300" : "grey.800",
        border: "2px solid",
        borderColor: (theme) =>
          theme.palette.mode === "dark" ? "grey.800" : "grey.500",
        p: 2,
        borderRadius: 2,
        fontSize: "0.875rem",
        fontWeight: "700",
        textAlign: "center",
        width: "150px",
        height: "20px",
        ...sx,
      }}
      {...other}
    />
  );
}

export class Test extends React.Component {
  render() {
    return (
      <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Avatar with text and icon
        </Typography>
        <List>
          <Fab variant="extended">
            <ListItem
              secondaryAction={
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText primary="Single-line item" />
            </ListItem>
          </Fab>
        </List>
      </Grid>
    );
  }
}
