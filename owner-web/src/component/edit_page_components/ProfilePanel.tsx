import React from "react";
import {
  Box,
  Button,
  Grid,
  Paper,
  ThemeProvider,
  Typography,
  TextField,
  Divider,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";
import AdbIcon from "@mui/icons-material/Adb";
import { ProfilePanelProps } from "./interface";

class ProfilePanel extends React.Component<ProfilePanelProps> {
  constructor(props: ProfilePanelProps) {
    super(props);
  }

  render() {
    return <>Page not implemented yet</>;
  }
}

export default ProfilePanel;
