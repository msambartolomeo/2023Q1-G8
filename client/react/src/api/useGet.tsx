import { DependencyList, useEffect } from "react";
import { axiosInstance } from "./axios"

export const useGet = (path: string, dependencyArray?: DependencyList ) => {
    const axios = axiosInstance;
    /*const [data, setData] = useState();
    const [error, setError] = useState<string>();
    const [status, setStatus] = useState<number | undefined>();*/

    useEffect(() =>{
        console.log("hola, estoy aca");
        axios.get(path).then((response) => console.log(response.data)).catch((err) => console.log(err));

    },dependencyArray? dependencyArray : []);

    return {
        /*data,
        error,
        status,
        loading: !data && !error*/
    }
}

    