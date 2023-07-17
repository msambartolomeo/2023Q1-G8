import { FC } from "react";
import { axiosInstance } from "../api/axios";
import ReactS3Uploader from "react-s3-uploader";
import * as base64 from 'base64-js';
import { ListItemText } from "@mui/material";


type Props = {
    b64EmailId: string
    b64DoctorId: string
}
const PatientItem: FC<Props> = ({ b64EmailId, b64DoctorId }) => {
    const decodedEmailBytes = Array.from(base64.toByteArray(atob(b64EmailId)));
    const email = new TextDecoder().decode(new Uint8Array(decodedEmailBytes));

    function getSignedUrl(file: any, callback: any) {
        axiosInstance.put(`/doctors/${b64DoctorId}/patients/${b64EmailId}/history`, { key: file.name })
            .then(data => {
                callback(data);
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <>
            <ListItemText primary={email} />
            <ReactS3Uploader getSignedUrl={getSignedUrl} />
        </>
    )
}

export default PatientItem;