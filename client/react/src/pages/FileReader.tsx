import { Container, Typography } from "@mui/material";
import { FC } from "react";
import tp4_60135PDF from "../../public/tp4_60135.pdf";

const FileReader: FC = () => {

    return(
        <div
        style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            height: "90vh",
            width: "80vw",
        }}
        >
        <div style={{
            height: "100%",
            width: 1000,
        }}>
            <object
                data={tp4_60135PDF}
                type="application/pdf"
                width="100%"
                height="98%"
            />
        </div>
        </div>
    );
}

export default FileReader;