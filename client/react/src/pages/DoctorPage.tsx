import { ChangeEvent, FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { idTokenInfo } from "../components/CallBack";
import { doctorUserPool_id } from "../constantx";
import jwt_decode from 'jwt-decode';
import * as base64 from 'base64-js';
import { axiosInstance } from "../api/axios";
import { AxiosResponse } from "axios";
import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, Snackbar, TextField, Typography } from "@mui/material";
import PatientCard from "../components/PatientCard";
import UploadFileModal from "../components/UploadFileModal";


const DoctorPage: FC = () => {
    const navigate = useNavigate();
    const [b64DoctorId, setDoctorId] = useState<string>();
    const [pacients, setPacients] = useState<string[]>([]);
    const [modal, setOpenModal] = useState(false);
    const [newPatient, setNewPatient] = useState("");
    const [alert, setAlert] = useState(false);

    const handleModalOpen = () => {
        setOpenModal(!modal)
    }

    useEffect(() => {
        const idToken = localStorage.getItem('idToken');
        if (idToken === null) {
            navigate('/401');
        }
        var tokenInfo = jwt_decode(idToken!) as idTokenInfo;
        const parts = tokenInfo.iss.split("/");
        const userPoolId = parts[parts.length - 1];
        if (userPoolId !== doctorUserPool_id) {
            navigate('/401')
        }
        const emailBytes = new TextEncoder().encode(tokenInfo.email);
        const base64Email = base64.fromByteArray(emailBytes).toString();
        setDoctorId(base64Email);
    }, [])

    useEffect(() => {
        if (b64DoctorId) {
            axiosInstance.get(`/doctors/${b64DoctorId}/patients`).then((response: AxiosResponse) => {
                setPacients(response.data)
            }).catch((error) => { console.log(error) })
        }
    }, [b64DoctorId, alert])

    const createPatient = async (newPatient: string) => {
        try {
            if( newPatient === ""){
                return;
            }
            const response = await axiosInstance.post("/users", {newPatient});
            if(response.status === 201){
                setAlert(true);
            }
        }catch(error){
            console.log(error)
        }
    }

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewPatient(event.target.value);
    };

    const handleClose = () => {
        setAlert(false);
    }

    return (
        <div style={{width: "100vw", height: "90vh"}}>
            <Dialog open={modal}>
                <DialogTitle>Crear paciente</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Por favor ingresar el mail del paciente
                    </DialogContentText>
                    <TextField
                        margin="dense"
                        id="name"
                        label="Email Address"
                        type="email"
                        fullWidth
                        variant="standard"
                        value={newPatient}
                        onChange={handleEmailChange}
                    />
                </DialogContent>
                <Snackbar open={alert} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Paciente creado con exito
                </Alert>
                </Snackbar>
                <DialogActions>
                    <Button onClick={() => createPatient(newPatient)} variant="outlined" color="success">Crear paciente</Button>
                    <Button onClick={handleModalOpen}variant="outlined" color="error">Cancelar</Button>
                </DialogActions>
            </Dialog>
            <Grid container sx={{width:"100%"}} justifyContent="center">
                <Grid item xs={11} component={Paper} sx={{minHeight: 80, borderRadius: 4, display: "flex", justifyContent: "space-between", alignItems: "center"}} elevation={8} padding={1.2} marginBottom={15}>
                    <Typography variant="h4">Pacientes</Typography>
                    <Button variant="contained" color="secondary" onClick={handleModalOpen}>Crear Paciente</Button>
                </Grid>
                <Grid item xs={11} component={Box} sx={{borderRadius: 4, minHeight: 550, border: "solid"}}>
                    <Grid item xs={12}>
                        <Typography variant="h5" align="center">Lista de pacientes</Typography>                    
                    </Grid>
                    {pacients.map((pacient: string) => 
                    <Grid item xs={12} sm={12} md={3.5} lg={3.5} xl={3.5}>
                        {b64DoctorId &&
                            <PatientCard pacientInfo={pacient} doctorId={b64DoctorId} />
                        }
                    </Grid>)}
                </Grid>
            </Grid>
        </div>
    )

}

export default DoctorPage;