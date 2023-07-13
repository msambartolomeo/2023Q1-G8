import Button from '@mui/material/Button';
import { FC } from "react";
import { pacientUserPool_loginURL } from '../constantx';

const LoginButton: FC = () => {

  const handleLogin = () => {
    window.location.href= pacientUserPool_loginURL;
  };

  return <Button variant="contained" onClick={handleLogin}>Login</Button>;
}

export default LoginButton;