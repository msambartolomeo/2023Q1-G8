import { useEffect, useState } from "react";
import * as base64 from 'base64-js';
import { axiosInstance } from "../api/axios";

export const getHistory = (email: string) => {
    const [error, setError] = useState();

    useEffect(() => {
        const emailBytes = new TextEncoder().encode(email);
        const base64Email = base64.fromByteArray(emailBytes).toString();
        (async () => {
            try{                
                const response = await axiosInstance.post(`/users/${base64Email}/history`);
                console.log(response.data.url.toString());
                window.location.href=response.data.url.toString();
            }catch(error: any){
                if (error.response && error.response.status) {
                    setError(error.response.status);
                }
            }
        })();
    },[email]);

    return {
        error
    };
}