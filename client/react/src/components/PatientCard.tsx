import { Button, Grid, Paper, Typography } from "@mui/material";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import PatientItem from "./PatientItem";

type Props ={
    pacientInfo: string;
    doctorId: string;
}
const PatientCard: FC<Props> = ({pacientInfo, doctorId}) => {
    const navigate = useNavigate();

    return(
        <Grid item component={Paper} elevation={5} margin={1.2} xs={12} sx={{ borderRadius: 2, minHeight: 40}} padding={1} >
            <Grid item xs={12} marginBottom={3.5}><Typography variant="body1" align="center">Email del paciente: {atob(pacientInfo)}</Typography></Grid>
            <PatientItem b64EmailId={pacientInfo} b64DoctorId={doctorId} />
            <Grid item xs={12} ><Button size="small" fullWidth variant="contained" onClick={() => navigate(`/history/${pacientInfo}`)}>Ver historial</Button></Grid>
        </Grid>
    );
}

export default PatientCard;