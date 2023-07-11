import { FC } from "react";
import tp4_60135PDF from "../../public/tp4_60135.pdf";

const FileReader: FC = () => {

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