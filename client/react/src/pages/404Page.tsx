import { Typography } from "@mui/material";
import { FC } from "react";

const PageNotFound: FC = () => {

    return(
        <div style={{
            width:"100vw",
            height: "100vh",
            display:"flex",
            justifyContent:"center",
            alignItems:"center"}}><Typography variant="h3">404: La ruta que intento utilizar no existe en este sitio</Typography></div>
    );
}

export default PageNotFound;