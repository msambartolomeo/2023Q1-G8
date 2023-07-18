import React from 'react';
import { Box, Button, Grid, Typography, TextField, Paper} from '@mui/material';

const DoctorPage: React.FC = () => {
  return (
    <Box textAlign="center">
        <Grid item xs={12}>
          <Paper>
          <Typography variant="h2" className="title">
              Pagina de doctor  
            </Typography>
            <Grid item xs={12} style={{ marginBottom: '1rem', marginTop: '1rem'}}>
              <TextField variant="outlined" className="textfield" label="Nombre de doctor" />
            </Grid>
            <Grid item xs={12}>
              <TextField variant="outlined" className="textfield" label="Nombre de paciente" />
            </Grid>
            <Grid style={{ marginTop: '2rem' }}>
              <Button variant="outlined">Ver hitorial</Button>
              <Button variant="outlined"  style={{ marginLeft: '2rem'}}>Cargar historial</Button>
            </Grid>
            
          </Paper>
        </Grid>
    </Box>
  );
};

export default DoctorPage;