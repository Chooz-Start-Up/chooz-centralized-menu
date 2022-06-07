import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import { Grid } from "@mui/material";
import { ChoozAppBarProps } from "./interface";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

const ChoozAppBar: React.FC<ChoozAppBarProps> = (props: ChoozAppBarProps) => {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  return (
    <AppBar position="static">
      <Grid>
        <Toolbar disableGutters>
          <Grid container paddingLeft={3}>
            <Typography
              variant="h4"
              noWrap
              component="a"
              href="/preview/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <AdbIcon
                fontSize="large"
                sx={{ display: { xs: "none", md: "flex" }, mr: 1 }}
              />
              Chooz
            </Typography>
          </Grid>

          {!loading && !user && (
            <Grid container paddingRight={3} justifyContent="flex-end">
              <Button href="/login/">
                <Typography color="white">Login</Typography>
              </Button>
            </Grid>
          )}
          {!loading && user && (
            <Grid container paddingRight={3} justifyContent="flex-end">
              <Button
                href="/preview/"
                onClick={() => signOut(auth)}
                sx={{ p: 0 }}
              >
                <Typography color="white">Logout</Typography>
              </Button>
            </Grid>
          )}
        </Toolbar>
      </Grid>
    </AppBar>
  );
};
export default ChoozAppBar;
