import { FC, useContext, useEffect } from "react";
import tp4_60135PDF from "../assets/tp4_60135.pdf";
import AuthContext, { emptyAuth } from "../api/useAuth";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../api/axios";

const FileReader: FC = () => {
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(auth === emptyAuth){
            navigate("/401")
        }
        axiosInstance.get("/users/bXNhbWJhcnRvbG9tZW9AaXRiYS5lZHUuYXI=/history").then((response) => console.log(response.data)).catch((err) => console.log(err));
    },[])

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
            <object
                data={tp4_60135PDF}
                type="application/pdf"
                width="70%"
                height="100%"
            />
        </div>
    );
}

export default FileReader;