//esto despues deberia pasarse al .env

export const pacientUserPool_client_id = "62aap0karcrukccp0je1qrpsru";
export const pacientUserPool_cognito_domain = "cloudcognit.auth.us-east-1.amazoncognito.com";
export const pacientUserPool_redirectURL = "https://dczngufo78uud.cloudfront.net/callback";
export const pacientUserPool_loginURL = `https://${pacientUserPool_cognito_domain}/login?response_type=code&client_id=${pacientUserPool_client_id}&redirect_uri=${pacientUserPool_redirectURL}&scope=email+openid+phone`;
export const pacientPool_tokenEndpoint = `https://${pacientUserPool_cognito_domain}/oauth2/token`;
export const  pacientUserPool_callBackURL = "https://dczngufo78uud.cloudfront.net/history";