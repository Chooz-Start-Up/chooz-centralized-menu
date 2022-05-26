import React, { Component } from "react";
import { ColumnProps, ColumnState, UserDataAPI } from "./interface";
import { Item } from "./Item";
import axios from "axios";

export class Column extends React.Component<ColumnProps, ColumnState> {
  constructor(props: ColumnProps) {
    super(props);

    this.state = {
      items: [],
    };

    console.log("constructor");
  }

  handleAddClick = () => {
    console.log("AddClick");

    console.log("Fetching Data...");
    axios
      .get(`https://reqres.in/api/users/${this.state.items.length + 1}`)
      .then((response) => {
        const userDataAPI = response.data as UserDataAPI;

        this.setState((state) => {
          console.log("Before Adding Item: ", state.items);
          const items = state.items.concat({
            name: userDataAPI.data.first_name,
            deleteButton: this.handleMinusClick,
          });
          console.log("After Adding Item: ", items);
          return {
            items,
          };
        });
      });
  };

  handleMinusClick = (name: string) => {
    console.log("MinusClick on: ", name);

    const array = this.state.items;

    console.log("Before Removing Item: ", array);

    let newArray = array.filter(function logic(element) {
      console.log(element.name !== name);
      return element.name !== name;
    });
    console.log("After Removing Item: ", newArray);

    this.setState(() => {
      return {
        items: newArray,
      };
    });
  };

  render() {
    console.log("Rendering...");
    const { title } = this.props;
    const listItems = this.state.items.map((item) => (
      <li key={item.name}>{item.name}</li>
    ));

    return (
      <div>
        <header className="menu-header">{title}</header>
        <ul>
          {this.state.items.map((item) => (
            <Item name={item.name} deleteButton={this.handleMinusClick} />
          ))}
        </ul>
        <button className="button-add" onClick={this.handleAddClick}>
          Add1
        </button>
      </div>
    );
  }
}
