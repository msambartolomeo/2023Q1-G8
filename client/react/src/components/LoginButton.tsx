import Button from '@mui/material/Button';
import { FC, useState } from "react";
import { doctorUserPool_loginURL, pacientUserPool_loginURL } from '../constantx';
import { Grid, Modal, Typography } from '@mui/material';

const LoginButton: FC = () => {

  const [modal, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(!modal);
  }

  const handlePacientLogin = () => {
    window.location.href= pacientUserPool_loginURL;
  };

  const handleDoctorLogin = () => {
    window.location.href= doctorUserPool_loginURL;
  };

  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    alignItems: "center",
    borderRadius: 5,
    width: 500,
    height: 200,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
  };

  return(
    <>
      <Button variant="contained" onClick={handleModalOpen}>Ingresar</Button>
      <Modal
        open={modal}
        onClose={handleModalOpen}
      >
        <Grid sx={{ ...style}}>
          <Grid item xs={12} marginBottom={7}><Typography variant="h5" align="center" id="parent-modal-title">Ingresar como</Typography></Grid>
          <Grid item xs={12} sx={{display:"flex", justifyContent:"space-evenly"}}>
            <Button variant="contained" onClick={handleDoctorLogin}>Medico</Button>
            <Button variant="contained" onClick={handlePacientLogin}>Paciente</Button>
          </Grid>
        </Grid>
      </Modal>
    </>
  );
}

export default LoginButton;