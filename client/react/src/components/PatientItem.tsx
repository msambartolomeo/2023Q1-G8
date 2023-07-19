import { FC, useState } from "react";
import { axiosInstance } from "../api/axios";
import ReactS3Uploader from "react-s3-uploader";
import { Alert, Snackbar } from "@mui/material";


type Props = {
    b64EmailId: string
    b64DoctorId: string
}
const PatientItem: FC<Props> = ({ b64EmailId, b64DoctorId }) => {

    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);

    function getSignedUrl(file: any, callback: any) {
        const body = { path: file.name };
        axiosInstance.put(`/doctors/${b64DoctorId}/patients/${b64EmailId}/history`, body)
        .then(data => {
            callback(data.data);
        })
        .catch(error => {
            console.error(error);
        });
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        if(event){}
        setOpen(false);
    };

    const handleCloseError = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
          return;
        }
        if(event){}
        setOpenError(false);
    };

    const handleSuccessResponse = () => {
        setOpen(true);
    }

    const handleErrorResponse = () => {
        setOpenError(true);
    }

    return (
        <>
            <ReactS3Uploader
                getSignedUrl={getSignedUrl}
                onFinish={handleSuccessResponse}
                onError={handleErrorResponse}
                accept="application/pdf"
                uploadRequestHeaders={{}}
            />
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Historial cargado con exito.
                </Alert>
            </Snackbar>
            <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
                <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
                    Hubo un error al cargar el historial. Intente nuevamente.
                </Alert>
        </Snackbar>
        </>
    )
}

export default PatientItem;