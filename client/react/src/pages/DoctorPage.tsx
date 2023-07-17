import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { idTokenInfo } from "../components/CallBack";
import { doctorUserPool_id } from "../constantx";
import jwt_decode from 'jwt-decode';
import * as base64 from 'base64-js';
import { axiosInstance } from "../api/axios";
import { AxiosResponse } from "axios";
import { List, ListItem } from "@mui/material";
import PatientItem from "../components/PatientItem";


const DoctorPage: FC = () => {
    const navigate = useNavigate();
    const [b64DcotorId, setDoctorId] = useState<string>("");
    const [pacients, setPacients] = useState([]);

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
        axiosInstance.get(`/users/${b64DcotorId}/history`).then((response: AxiosResponse) => {
            setPacients(response.data)
            console.log(response.data);
        }).catch((error) => { console.log(error) })
    }, [b64DcotorId])


    const patientsList = pacients.map((item) => {
        return (
            <ListItem key={item}>
                <PatientItem b64EmailId={item} b64DoctorId={b64DcotorId} />
            </ListItem>
        )
    })


    return (
        <div>
            <h1>Lista de pacientes</h1>
            <List>
                {patientsList}
            </List>
        </div>
    )

}

export default DoctorPage;