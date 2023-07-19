import {
  AppBar,
  Box,
  Button,
  Grid,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import LoginButton from "./LoginButton";
import AuthContext, { emptyAuth } from "../api/useAuth";
import logo from "../assets/logo.png"

export const NavBar: FC = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);

  const logOut = () => {
    localStorage.removeItem('idToken');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAuth(emptyAuth);
    navigate('/')
  }

  return (
    <Box sx={{ flexGrow: 1, mb: 8 }}>
      <AppBar position="fixed">
        <Toolbar>
          <Container maxWidth="xl">
            <Grid container justifyContent="space-between">
              <Grid item>
                <Stack direction="row" spacing={2}>
                  <Button variant="contained" onClick={() => { navigate("/") }}>
                    <img src={logo} alt="logo" height={"45px"} />
                  </Button>
                  {auth.role === "doctor" &&
                    <Button variant="contained" onClick={() => { navigate("/doctor/pacients") }}>
                      <Typography>Pagina doctor</Typography>
                    </Button>}
                  {auth.role === "pacient" &&
                    <Button variant="contained" onClick={() => { navigate("/history") }}>
                      <Typography>Visualizar archivo</Typography>
                    </Button>}
                </Stack>
              </Grid>
              <Grid item>
                <Stack direction="row" spacing={2}>
                  {auth === emptyAuth && <LoginButton />}
                  {auth !== emptyAuth &&
                    <Button variant="contained" onClick={logOut}>
                      <Typography height={"45px"} style={{ lineHeight: '45px' }}>Logout</Typography>
                    </Button>}
                </Stack>
              </Grid>
            </Grid>
          </Container>
        </Toolbar>
      </AppBar>
    </Box >
  );
};