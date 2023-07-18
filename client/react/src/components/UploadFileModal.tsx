import { Alert, Dialog, DialogContent, DialogContentText, DialogTitle, Snackbar } from "@mui/material";
import { FC, useState } from "react";
import { axiosInstance } from "../api/axios";
import ReactS3Uploader from "react-s3-uploader";

type Props ={
    modal: boolean;
    patientEmail: string;
    doctorEmail: string,
    handleClose: () => void;
}

const UploadFileModal: FC<Props> = ({modal, patientEmail, doctorEmail, handleClose}) => {
    const [alert, setAlert] = useState(false);
    const [error, setError] = useState(false);

    const handleCloseSuccess = () => {
        setAlert(false);
    }

    const handleCloseError = () => {
        setError(false);
    }

    function getSignedUrl(file: any, callback: any) {
        const body = { path: file.name };
        axiosInstance.put(`/doctors/${doctorEmail}/patients/${patientEmail}/history`, body)
        .then(data => {
            callback(data.data);
        })
        .catch(error => {
            console.error(error);
        });
    }

    const handleSuccessResponse = () => {
        setAlert(true);
        handleClose()
    }

    const handleErrorResponse = () => {
        setError(true);
    }

    return (
        <Dialog open={modal} onClose={handleClose}>
                <DialogTitle>Suba el historial medico</DialogTitle>
                <DialogContent>
                    <DialogContentText marginBottom={5}>
                        Por favor adjunte el archivo PDF del paciente a continuación
                    </DialogContentText>
                    <ReactS3Uploader
                        getSignedUrl={getSignedUrl}
                        onFinish={handleSuccessResponse}
                        onError={handleErrorResponse}
                        accept="application/pdf"
                        uploadRequestHeaders={{}}
                    />
                </DialogContent>
                <Snackbar open={alert} autoHideDuration={6000} onClose={handleCloseSuccess}>
                <Alert onClose={handleCloseSuccess} severity="success" sx={{ width: '100%' }}>
                    Registro subido con exito
                </Alert>
                </Snackbar>
                <Snackbar open={error} autoHideDuration={6000} onClose={handleCloseError}>
                <Alert onClose={handleCloseError} severity="success" sx={{ width: '100%' }}>
                    Error al subir registro. Intente nuevamente
                </Alert>
                </Snackbar>
        </Dialog>
    );
}

export default UploadFileModal;