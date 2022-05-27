import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { Box, Button, Grid, IconButton, ThemeProvider } from "@mui/material/";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ClearIcon from "@mui/icons-material/Clear";
import { ItemProps, UserDataAPI } from "./interface";
import axios from "axios";
import { Container } from "@mui/system";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return <MenuTabs value={value} handleChange={handleChange} />;
}

export interface MenuTabsProps {
  value: any;
  handleChange: any;
}

export interface MenuTabsState {
  items: CategoryItemProps[];
}

export interface CategoryItemProps {
  id: number;
  name: string;
  handleDeleteClick(id: number): any;
}

export class MenuTabs extends React.Component<MenuTabsProps, MenuTabsState> {
  constructor(props: MenuTabsProps) {
    super(props);

    this.state = {
      items: [],
    };
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
            handleDeleteClick: this.handleDeleteClick,
          });
          console.log("After Adding Item: ", items); ////////////////////////////////////////////////////////////////////
          return {
            items,
          };
        });
      });
  };

  handleDeleteClick = (id: number) => {
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
    const { value, handleChange } = this.props;
    return (
      <>
        <Grid container spacing={0} bgcolor={"#ffebee"}>
          <Grid item xs={3}>
            <Box>
              <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: "divider" }}
              >
                {this.state.items.map((item) => (
                  <Tab label={item.name} {...a11yProps(item.id)} />
                ))}

                <Button onClick={this.handleAddClick}>
                  <AddCircleOutlineIcon />
                </Button>
              </Tabs>
              {this.state.items.map((item, index) => (
                <IconButton
                  aria-label="delete"
                  size="small"
                  sx={{
                    position: "relative",
                    top: -80 - 48 * (this.state.items.length - 1 - index),
                    right: -330 + 34 * index,
                  }}
                  onClick={() => this.handleDeleteClick(item.id)}
                >
                  <ClearIcon />
                </IconButton>
              ))}
            </Box>
          </Grid>
          <Grid item xs={3}>
            {this.state.items.map((item) => (
              <TabPanel value={value} index={item.id}>
                {item.name}
              </TabPanel>
            ))}
          </Grid>
          <Grid item xs={3}>
            Item
          </Grid>
          <Grid item xs={3}>
            Item Description
          </Grid>
        </Grid>
      </>
    );
  }
}

// class DeleteButton extends React.Component<CategoryItemProps> {
//   render() {
//     const { id, name, handleDeleteClick } = this.props;
//     return (
//       <Box sx={{ height: 50 }}>
//         <Tab label={name} {...a11yProps(id)} />
//         <Container>
//           <IconButton
//             aria-label="delete"
//             size="small"
//             sx={{ position: "relative", bottom: "40px", left: "80px" }}
//             onClick={() => handleDeleteClick(id)}
//           >
//             <ClearIcon />
//           </IconButton>
//         </Container>
//       </Box>
//     );
//   }
// }
