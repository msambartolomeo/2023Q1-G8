import { FC, useEffect } from "react";
import { axiosInstance } from "../api/axios";

const DoctorPage: FC = () => {
    //useGet("/users/a@g.com/history");
    useEffect(() =>{
        console.log("hola, estoy aca");
        axiosInstance.get("/users/a@g.com/history").then((response) => console.log(response.status)).catch((err) => console.log(err));
    },[])
    return(
        <div>
            <h1>Doctor Page</h1>
        </div>
    );
}

export default DoctorPage;