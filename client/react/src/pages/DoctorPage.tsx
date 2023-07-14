import { FC, useEffect } from "react";
import { axiosInstance } from "../api/axios";

const DoctorPage: FC = () => {
    //useGet("/users/a@g.com/history");
    useEffect(() =>{
        console.log("hola, estoy aca");
        axiosInstance.get("/users/bXNhbWJhcnRvbG9tZW9AaXRiYS5lZHUuYXI=/history").then((response) => console.log(response.data)).catch((err) => console.log(err));
    },[])
    return(
        <div>
            <h1>Doctor Page</h1>
        </div>
    );
}

export default DoctorPage;