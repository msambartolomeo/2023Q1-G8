import { FC } from "react";
import { Typography } from "@mui/material";

const NotPermitedPage: FC = () => {


    return(
        <div style={{
        width:"100vw",
        height: "100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"}}><Typography variant="h3">401: No tiene los permisos necesarios para acceder a esa ruta</Typography></div>
    );
}

export default NotPermitedPage;
