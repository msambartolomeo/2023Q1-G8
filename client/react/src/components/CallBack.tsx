import axios from 'axios';
import { useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { doctorPool_tokenEndpoint, doctorUserPool_client_id, doctorUserPool_id, doctorUserPool_redirectURL, pacientPool_tokenEndpoint, pacientUserPool_client_id, pacientUserPool_id, pacientUserPool_redirectURL } from '../constantx';
import AuthContext from '../api/useAuth';
import jwt_decode from 'jwt-decode';

export interface idTokenInfo {
  at_hash: string;
  aud: string;
  auth_time: number;
  cognito:{username: string};
  email: string;
  email_verified: boolean;
  event_id: string;
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  origin_jti: string;
  sub: string;
  token_use: string;
}

export interface accessTokenInfo {
  sub: string;
  iss: string;
  version: number;
  client_id: string;
  origin_jti: string;
  toke_use: string;
  scope: string;
  auth_time: number;
  exp: number;
  iat: number;
  jti: string;
  username: string;
}

const useCallBack = (role: string) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { buildAuth, setAuth} = useContext(AuthContext);


  const exchangeCodeForTokens = async (code: string) => {
    try {
      const response = await axios.post(role === "doctor" ? doctorPool_tokenEndpoint : pacientPool_tokenEndpoint,
        new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: role === "doctor" ? doctorUserPool_client_id : pacientUserPool_client_id,
        code,
        redirect_uri: role === "doctor" ? doctorUserPool_redirectURL : pacientUserPool_redirectURL,
      }).toString(), {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      });
      const { access_token, id_token, refresh_token } = response.data;
      // Store the tokens securely (e.g., in session storage or cookies)
      localStorage.setItem('accessToken', access_token);
      localStorage.setItem('idToken', id_token);
      localStorage.setItem('refreshToken', refresh_token);
      const authentication = buildAuth(access_token, id_token);
      setAuth(authentication);
      //navigate according to the user pool id
      var decodedToken = jwt_decode(id_token) as idTokenInfo;
      const parts = decodedToken.iss.split("/");
      const userPoolId = parts[parts.length - 1];
      if(userPoolId === pacientUserPool_id){
        navigate('/history');
      }else if(userPoolId === doctorUserPool_id){
        navigate('/doctor/pacients');
      }
    } catch (error) {
      console.error('Error exchanging code for tokens:', error);
      navigate('/401');
      // Handle error and navigate to an error page if needed
    }
  };

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');
    if (code) {
      exchangeCodeForTokens(code);
    } else {
      console.error('Missing authorization code');
      navigate('/');
      // Handle missing code and navigate to an error page if needed
    }
  }, [navigate, location.search]);

};

export default useCallBack;