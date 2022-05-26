import React, { Component } from "react";
import { ItemProps } from "./interface";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { ItemBox } from "./MUITest";

export class Item extends React.Component<ItemProps> {
  render() {
    const { name } = this.props;
    return (
      <>
        <ItemBox key={this.props.id}>
          <div>{name}</div>
          <IconButton
            aria-label="delete"
            sx={{ position: "relative", bottom: "28px", left: "70px" }}
            onClick={() => this.props.deleteButton(this.props.id)}
          >
            <DeleteIcon />
          </IconButton>
        </ItemBox>
      </>
    );
  }
}
