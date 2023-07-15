import { FC, useContext, useEffect } from "react";
import { axiosInstance } from "../api/axios";
import AuthContext, { emptyAuth } from "../api/useAuth";
import { useNavigate } from "react-router-dom";

const DoctorPage: FC = () => {
    //useGet("/users/a@g.com/history");
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() =>{
        if(auth === emptyAuth || auth.role === "pacient"){
            navigate("/401")
        }
        axiosInstance.get("/users/bXNhbWJhcnRvbG9tZW9AaXRiYS5lZHUuYXI=/history").then((response) => console.log(response.data)).catch((err) => console.log(err));
    },[])
    return(
        <div>
            <h1>Doctor Page</h1>
        </div>
    );
}

export default DoctorPage;