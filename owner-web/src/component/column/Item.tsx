import React, { Component } from "react";
import { ItemProps } from "./interface";

export class Item extends React.Component<ItemProps> {
  render() {
    const { name } = this.props;

    return (
      <div>
        <header className="item">
          {name}
          <button
            className="button-remove"
            onClick={() => this.props.deleteButton(this.props.name)}
          >
            x
          </button>
        </header>
      </div>
    );
  }
}
