import React, { Component } from "react";
import { ItemProps } from "./interface";

export class Item extends React.Component<ItemProps> {
  render() {
    const { name } = this.props;
    console.log("Item prop is: ", this.props.name, "---", this.props.id);
    return (
      <div>
        <header className="item">
          {name}
          <button
            className="button-remove"
            onClick={() => this.props.deleteButton(this.props.id)}
          >
            x
          </button>
        </header>
      </div>
    );
  }
}
