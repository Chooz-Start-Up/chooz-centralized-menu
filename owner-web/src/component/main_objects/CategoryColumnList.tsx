import * as React from "react";
import { Grid, List, ListItem, ListItemButton } from "@mui/material/";
import { CategoryColumnListProps, CategoryColumnListState } from "./interface";

export class CategoryColumnList extends React.Component<
  CategoryColumnListProps,
  CategoryColumnListState
> {
  constructor(props: CategoryColumnListProps) {
    super(props);
  }
  render() {
    const { menuIndex } = this.props;
    return <>Hello from Index {menuIndex}</>;
  }
}
