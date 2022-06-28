import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import { Box, Grid } from "@mui/material";
import { ChoozAppBarProps } from "./interface";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/authentication/firebaseAuthentication";
import LogoText from "../images/chooz_icons/logoWhite_textWhite_horizontal.png";

const ChoozAppBar: React.FC<ChoozAppBarProps> = (props: ChoozAppBarProps) => {
  const [user, loading] = useAuthState(auth);

  return (
    <AppBar position="sticky" elevation={1}>
      <Box display="flex" justifyContent="space-between" padding={1}>
        <Button href="/" disableTouchRipple>
          <Box component="img" src={LogoText} width="125px" />
        </Button>

        {!loading && !user && (
          <Button href="/login/" sx={{ textTransform: "none" }}>
            <Typography color="white">Login</Typography>
          </Button>
        )}
        {!loading && user && (
          <Button
            href="/login/"
            onClick={() => signOut(auth)}
            sx={{ textTransform: "none" }}
          >
            <Typography color="white">Logout</Typography>
          </Button>
        )}
      </Box>
    </AppBar>
  );
};
export default ChoozAppBar;
