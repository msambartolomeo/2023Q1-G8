import axios from 'axios';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { pacientPool_tokenEndpoint, pacientUserPool_client_id, pacientUserPool_redirectURL } from '../constantx';

const useCallBack = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const exchangeCodeForTokens = async (code: string) => {
    try {
      const response = await axios.post(pacientPool_tokenEndpoint, new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: pacientUserPool_client_id,
        code,
        redirect_uri: pacientUserPool_redirectURL,
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

      navigate("/doctor/pacients")

    } catch (error) {
      console.error('Error exchanging code for tokens:', error);
      // Handle error and navigate to an error page if needed
    }
  };

  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');

    if (code) {
      exchangeCodeForTokens(code);
    } else {
      console.error('Missing authorization code');
      // Handle missing code and navigate to an error page if needed
    }
  }, [navigate, location.search]);

};

export default useCallBack;