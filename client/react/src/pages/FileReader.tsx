import { FC, useEffect, useState } from "react";
import { getHistory } from "../hooks/getHistory";
import jwt_decode from 'jwt-decode';
import { idTokenInfo } from "../components/CallBack";
import { CircularProgress, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const FileReader: FC = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const { pacientEmail } = useParams();

    useEffect(() => {
        const idToken = localStorage.getItem("idToken");
        if(!idToken){
            navigate('/401');
        }
        if(pacientEmail){
            setEmail(pacientEmail);
        }else{
            var idTokenInfo = jwt_decode(idToken!) as idTokenInfo;
            setEmail(idTokenInfo.email);
        }
    },[])

    const { error, pdfData } = getHistory(email);

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
