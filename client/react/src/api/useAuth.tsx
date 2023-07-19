import { createContext, useEffect, useState } from "react";
import { accessTokenInfo, idTokenInfo } from "../components/CallBack";
import jwt_decode from 'jwt-decode';
import { doctorUserPool_id, pacientUserPool_id } from "../constantx";


export interface Authentication {
    username: string;
    client_id: string;
    role: string;
    content:  {idTokenInfo: idTokenInfo, accessTokenInfo: accessTokenInfo} | undefined;
}

export interface AuthContextValue {
    auth: Authentication;
    setAuth: (newAuth: Authentication) => void;
    handleUpdateAuth: () => void;
    buildAuth: (accessToken: string, id_token: string) => Authentication;
}

export const emptyAuth: Authentication = {
    username: "",
    client_id: "",
    role: "",
    content: undefined,
}

const authContext: AuthContextValue = {
    auth: emptyAuth,
    setAuth: () => null,
    handleUpdateAuth: () => null,
    buildAuth: () => emptyAuth
}

const AuthContext = createContext(authContext);

interface Props {
    children: React.ReactNode;
}

const extractUPID = (id_tokenInfo: idTokenInfo) =>{
    const parts = id_tokenInfo.iss.split("/");
    const userPoolId = parts[parts.length - 1];
    return userPoolId;
}

const determineRole = (userPoolId: string) =>{
    if(userPoolId === pacientUserPool_id) {
        return "pacient"
    }else if(userPoolId === doctorUserPool_id){
        return "doctor"
    }
    return "";
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
    const [auth, setAuth] = useState(emptyAuth);
    const [updateAuth, setUpdateAuth] = useState(false);

    const handleUpdateAuth = () => setUpdateAuth(!updateAuth);

    const buildAuth = (access_token: string, id_token: string) => {
        var accessTokenInfo = jwt_decode(access_token) as accessTokenInfo;
        var idTokenInfo = jwt_decode(id_token) as idTokenInfo;
        const role = determineRole(extractUPID(idTokenInfo));
        const authentication = {
            username: accessTokenInfo.username,
            client_id: accessTokenInfo.client_id,
            content: {idTokenInfo, accessTokenInfo},
            role: role
        }
        return authentication;
    }

    useEffect(() => {
        const id_token = localStorage.getItem('idToken');
        const access_token = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if(id_token === null || access_token === null || refreshToken === null){
            setAuth(emptyAuth);
        }else{
            if(access_token !== null && id_token !== null){
                var accessTokenInfo = jwt_decode(access_token) as accessTokenInfo;
                var idTokenInfo = jwt_decode(id_token) as idTokenInfo;
                const role = determineRole(extractUPID(idTokenInfo));
                const authentication = {
                    username: accessTokenInfo.username,
                    client_id: accessTokenInfo.client_id,
                    content: {idTokenInfo, accessTokenInfo},
                    role: role
                }
                setAuth(authentication);
            }
        }
    }, [updateAuth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth, handleUpdateAuth, buildAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
