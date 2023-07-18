import { FC, useEffect, useState } from "react";
import { getHistory } from "../hooks/getHistory";
import jwt_decode from 'jwt-decode';
import { idTokenInfo } from "../components/CallBack";
import { CircularProgress, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import * as base64 from 'base64-js';

const FileReader: FC = () => {
    const [email, setEmail] = useState("");
    const [doctorId, setDoctorId] = useState<string | undefined>();
    const navigate = useNavigate();
    const { pacientEmail } = useParams();

    useEffect(() => {
        const idToken = localStorage.getItem("idToken");
        if(!idToken){
            navigate('/401');
        }
        var idTokenInfo = jwt_decode(idToken!) as idTokenInfo;
        if(pacientEmail){
            setEmail(pacientEmail);
            const emailBytes = new TextEncoder().encode(idTokenInfo.email);
            const base64Email = base64.fromByteArray(emailBytes).toString();
            setDoctorId(base64Email);
        }else{
            setEmail(idTokenInfo.email);
        }
    },[])

    const { error, pdfData } = getHistory(email, doctorId);

    return(
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "85vh",
                width: "100vw",
            }}
        >
            {pdfData ? (
                <embed src={pdfData} type="application/pdf" width="70%" height="100%" />
            ) : <CircularProgress sx={{position: "absolute", top: "50%", right: "50%"}} size="lg" />}
            {error === 404 && !pdfData && 
            <Typography variant="h5">El hospital aún no subio su historial medico. Cuando lo haga, le será notificado via mail</Typography>
            }
        </div>
    );
}

export default FileReader;
