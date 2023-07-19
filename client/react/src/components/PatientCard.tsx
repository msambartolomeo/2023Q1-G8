import { Button, Grid, Paper, Typography } from "@mui/material";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadFileModal from "./UploadFileModal";

type Props ={
    pacientInfo: string;
    doctorId: string;
}
const PatientCard: FC<Props> = ({pacientInfo, doctorId}) => {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);

    const handleClose = () => {setOpenModal(!openModal);} 

    return(
        <Grid item component={Paper} elevation={5} margin={1.2} xs={12} sx={{ borderRadius: 2, minHeight: 40}} padding={1} >
            <UploadFileModal modal={openModal} handleClose={handleClose} doctorEmail={doctorId}  patientEmail={pacientInfo} />
            <Grid item xs={12} marginBottom={3.5}><Typography variant="body1" align="center">Email del paciente: {atob(pacientInfo)}</Typography></Grid>
            <Grid item xs={12} sx={{display: "flex", justifyContent: "space-between"}}>
                <Button size="small" fullWidth variant="contained" onClick={() => navigate(`/history/${pacientInfo}`)}>Ver historial</Button>
                <Button size="small" fullWidth variant="contained" color="secondary" onClick={handleClose}>Editar historial</Button>
            </Grid>
        </Grid>
    );
}

export default PatientCard;