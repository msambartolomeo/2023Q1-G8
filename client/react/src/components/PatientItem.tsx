import { FC } from "react";
import { axiosInstance } from "../api/axios";
import ReactS3Uploader from "react-s3-uploader";
import { ListItemText } from "@mui/material";


type Props = {
    b64EmailId: string
    b64DoctorId: string
}
const PatientItem: FC<Props> = ({ b64EmailId, b64DoctorId }) => {

    const email = atob(b64EmailId);

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

    return (
        <>
            <ListItemText primary={email} />
            <ReactS3Uploader
                getSignedUrl={getSignedUrl}
                accept="application/pdf"
                uploadRequestHeaders={{}}
            />
        </>
    )
}

export default PatientItem;