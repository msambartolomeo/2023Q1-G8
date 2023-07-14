import { FC } from "react";
import useCallBack from '../components/CallBack';


const CallBackPage: FC = () => {
    useCallBack();

    return(
        <div>
            <h1>CallBack</h1>
        </div>
    );
}

export default CallBackPage;
