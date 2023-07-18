import { FC } from "react";
import { axiosInstance } from "../api/axios";
import ReactS3Uploader from "react-s3-uploader";
import { ListItemText } from "@mui/material";


type Props = {
    b64EmailId: string
    b64DoctorId: string
}
const PatientItem: FC<Props> = ({ b64EmailId, b64DoctorId }) => {
    console.log("email", b64EmailId, b64EmailId.length)
    console.log("doctor", b64DoctorId, b64DoctorId.length)

    const email = atob(b64EmailId)
    console.log("consegui el email!!!!!", email);

    function getSignedUrl(file: any, callback: any) {
        const body = { path: file.name };
        console.log("body", body);
        axiosInstance.put(`/doctors/${b64DoctorId}/patients/${b64EmailId}/history`, body)
            .then(data => {
                console.log("data:", data.data);
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