
import React from 'react';
import { Box, Grid, Typography } from '@mui/material';
import './HomePage.css';

import doctor_image from "../assets/doctor_image.jpg"

const HomePage: React.FC = () => {
  return (
    <Box className="homePageContainer">
      <Grid container className="homePageContainer">
        <Grid item xs={10} md={6}>
          <Box className="contentContainer">
            <Typography variant="h1" className="title">
              Fuiste atendido por nosotros?
            </Typography>
            <Typography variant="subtitle1" className="subtitle">
              Consulta tu registro medico aqui!
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} className='doctorContain'>
          <img
            src={doctor_image}
            alt="Doctor"
            className="doctorImage"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;