import { useEffect, useState } from "react";
import * as base64 from 'base64-js';
import axios, { AxiosError, AxiosResponse } from "axios";
import { axiosInstance } from "../api/axios";

export const getHistory = (email: string, doctorId?: string) => {
    const [url, setUrl] = useState();
    const [error, setError] = useState();
    const [pdfData, setPdfData] = useState<string | null>(null);

    useEffect(() => {
        const emailBytes = new TextEncoder().encode(email);
        const base64Email = base64.fromByteArray(emailBytes).toString();
        if(base64Email){
            (async () => {
                try{          
                    const response = await axiosInstance.post(doctorId? `/doctors/${doctorId}/patients/${base64Email}/history` : `/users/${base64Email}/history`);
                    console.log(url)
                    setUrl(response.data.url.toString());
                }catch(error: any){
                    if (error.response && error.response.status) {
                        setError(error.response.status);
                    }
                }
            })();
        }
    },[email]);

    useEffect(() => {
        if(url){
            axios.get(url, {responseType: 'blob',headers: {
                'Access-Control-Allow-Origin': 'https://dczngufo78uud.cloudfront.net'
              }}).then((response: AxiosResponse) => {
                const pdfUrl = URL.createObjectURL(response.data);
                setPdfData(pdfUrl);
            }).
            catch((error: AxiosError) => console.log("error",error.config));
        }
    },[url]);

    return {
        error,
        pdfData
    };
}