import { FC } from "react";
import useCallBack from '../components/CallBack';
import { CircularProgress } from "@mui/material";

type props ={
    role: string
}
const CallBackPage: FC<props> = ({role}) => {
    useCallBack(role);

    return(
        <div style={{
        width:"100vw",
        height: "100vh",
        display:"flex",
        justifyContent:"center",
        alignItems:"center"}}><CircularProgress/></div>
    );
}

export default CallBackPage;
