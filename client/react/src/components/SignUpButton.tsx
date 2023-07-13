import Button from '@mui/material/Button';
import { FC } from "react";

const SignUpButton: FC = () => {

  const handleSignUp = () => {
    const clientId = "62aap0karcrukccp0je1qrpsru";
    const redirectUri = "https://dczngufo78uud.cloudfront.net";
    const cognitoDomain = "cloudcognit.auth.us-east-1.amazoncognito.com";
    const signUpUrl = `https://${cognitoDomain}/signup?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=email+openid+phone`;

    window.location.href=signUpUrl;
  };

  return <Button variant="contained" onClick={handleSignUp}>Registro</Button>;
}

export default SignUpButton;