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
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import LoginButton from "./LoginButton";
  
  export const NavBar: FC= () => {
    const navigate = useNavigate();
  
  
    return (
      <Box sx={{ flexGrow: 1, mb: 8}}>
        <AppBar position="fixed">
          <Toolbar>
            <Container maxWidth="xl">
              <Grid container justifyContent="space-between">
                <Grid item>
                  <Stack direction="row" spacing={2}>
                    <Button variant="contained" onClick={() => {navigate("/")}}>
                        <Typography variant="h5" sx={{ fontStyle: "italic" }}>
                          Logo
                        </Typography>
                    </Button>
                    <Button variant="contained" onClick={() => {navigate("/doctor/pacients")}}>
                      <Typography>Pagina doctor</Typography>
                    </Button>
                    <Button variant="contained" onClick={() => {navigate("/history")}}>
                      <Typography>Visualizar archivo</Typography>
                    </Button>
                  </Stack>
                </Grid>
                <Grid item>
                    <Stack direction="row" spacing={2}>
                      <LoginButton />
                    </Stack>
                </Grid>
              </Grid>
            </Container>
          </Toolbar>
        </AppBar>
      </Box>
    );
  };