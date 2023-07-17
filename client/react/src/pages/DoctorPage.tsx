import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { idTokenInfo } from "../components/CallBack";
import { doctorUserPool_id } from "../constantx";
import jwt_decode from 'jwt-decode';
import * as base64 from 'base64-js';
import { axiosInstance } from "../api/axios";
import { AxiosResponse } from "axios";


const DoctorPage: FC = () => {
    const navigate  = useNavigate();
    const [b64DcotorId, setDoctorId] = useState<string | undefined>();
    const [pacients, setPacients] = useState();

    useEffect(() => {
        const idToken = localStorage.getItem('idToken');
        if(idToken === null){
            navigate('/401');
        }
        var tokenInfo = jwt_decode(idToken!) as idTokenInfo;
        const parts = tokenInfo.iss.split("/");
        const userPoolId = parts[parts.length - 1];
        if(userPoolId !== doctorUserPool_id){
           navigate('/401')
        }
        const emailBytes = new TextEncoder().encode(tokenInfo.email);
        const base64Email = base64.fromByteArray(emailBytes).toString();
        setDoctorId(base64Email);
    },[])

    useEffect(() => {
        axiosInstance.get(`/users/${b64DcotorId}/history`).then((response: AxiosResponse) => {
            setPacients(response.data)
            console.log(response.data);
        }).catch((error) => {console.log(error)})
    },[b64DcotorId])


    return(
        <div>
            <h1>Doctor Page</h1>
        </div>
    );
}

export default DoctorPage;