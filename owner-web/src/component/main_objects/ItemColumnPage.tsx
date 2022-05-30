import * as React from "react";
import { Grid, List, ListItem, ListItemButton } from "@mui/material/";
import { ItemColumnListProps, ItemColumnPageProps } from "./interface";
import ColumnListItemButton from "../buttons/ColumnListItemButton";
import AddButtonWithDialog from "../buttons/AddButtonWithDialog";

export class ItemColumnPage extends React.Component<ItemColumnPageProps> {
  render() {
    return (
      <>
        <Grid item xs={12}>
          Page
        </Grid>
      </>
    );
  }
}
