
import React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <Box className="homePageContainer">
      <Grid container>
        <Grid item xs={10} md={6}>
          <Box className="contentContainer">
            <Typography variant="h1" className="title">
              Have you attended our hospital?
            </Typography>
            <Typography variant="subtitle1" className="subtitle">
              You can check your medical history right here.
            </Typography>
            <Button variant="outlined">Check my history</Button>
          </Box>
        </Grid>
        <Grid item xs={12} md={5} className='doctorContain'>
          <img
            src="../src/assets/Medicos/doctor_image.jpg"
            alt="Doctor"
            className="doctorImage"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;