import React, { Component } from "react";
import { ColumnProps, ColumnState, UserDataAPI } from "./interface";
import { Item } from "./Item";
import axios from "axios";

import { Button, Container, Box, ThemeProvider } from "@mui/material";
import { ItemBox, MenuBox } from "./MUITest";

export class Column extends React.Component<ColumnProps, ColumnState> {
  constructor(props: ColumnProps) {
    super(props);

    this.state = {
      items: [],
    };

    console.log("Constructing Column..."); /////////////////////////////////////////////////////////////////////////////////////
  }

  handleAddClick = () => {
    console.log("AddClick"); ////////////////////////////////////////////////////////////////////////////////////////////

    console.log("Fetching Data..."); ////////////////////////////////////////////////////////////////////////////////////
    axios
      .get(`https://reqres.in/api/users/${this.state.items.length + 1}`)
      .then((response) => {
        const userDataAPI = response.data as UserDataAPI;

        this.setState((state) => {
          console.log("Before Adding Item: ", state.items);
          const items = state.items.concat({
            id: state.items.length,
            name: userDataAPI.data.first_name,
            deleteButton: this.handleMinusClick,
          });
          console.log("After Adding Item: ", items); ////////////////////////////////////////////////////////////////////
          return {
            items,
          };
        });
      });
  };

  handleMinusClick = (id: number) => {
    console.log("MinusClick on: ", id); //////////////////////////////////////////////////////////////////////////////////

    const array = this.state.items;

    console.log("Before Removing Item: ", array); ///////////////////////////////////////////////////////////////////////

    let newArray = array.filter(function logic(element) {
      console.log(element.id, "---", id);
      return element.id !== id;
    });
    for (let i = 0; i < newArray.length; i++) {
      console.log("For loop update: ", newArray[i].id, " to ", i); ///////////////////////////////////////////////////////
      newArray[i].id = i;
    }
    console.log("After Removing Item: ", newArray); ///////////////////////////////////////////////////////////////////////

    this.setState(() => {
      return {
        items: newArray,
      };
    });
  };

  render() {
    console.log("Rendering..."); //////////////////////////////////////////////////////////////////////////////////////////
    const { title } = this.props;
    const listItems = this.state.items.map((item) => (
      <li key={item.name}>{item.name}</li>
    ));

    return (
      <>
        <Box
          sx={{
            display: "grid",
            gap: 1,
            gridTemplateColumns: "repeat(1, 1fr)",
          }}
        >
          <MenuBox>
            1
            {this.state.items.map((item) => (
              <Item
                key={item.id}
                id={item.id}
                name={item.name}
                deleteButton={this.handleMinusClick}
              />
            ))}
          </MenuBox>
        </Box>
        {/* <header className="menu-header">{title}</header>

        <ul>
          {this.state.items.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              deleteButton={this.handleMinusClick}
            />
          ))}
        </ul>
         */}
        <button className="button-add" onClick={this.handleAddClick}>
          Add
        </button>
      </>
    );
  }
}
