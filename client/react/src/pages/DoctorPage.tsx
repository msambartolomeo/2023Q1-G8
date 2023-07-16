import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { idTokenInfo } from "../components/CallBack";
import { doctorUserPool_id } from "../constantx";
import jwt_decode from 'jwt-decode';


const DoctorPage: FC = () => {
    const navigate  = useNavigate();
    useEffect(() => {
        const idToken = localStorage.getItem('idToken');
        if(idToken === null){
            navigate('/401');
        }
        var tokenInfo = jwt_decode(idToken!) as idTokenInfo;
        console.log(tokenInfo)
        const parts = tokenInfo.iss.split("/");
        const userPoolId = parts[parts.length - 1];
        if(userPoolId !== doctorUserPool_id){
           navigate('/401')
        }
    },[])


    return(
        <div>
            <h1>Doctor Page</h1>
        </div>
    );
}

export default DoctorPage;