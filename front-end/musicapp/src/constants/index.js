export const API_BASE_URL = 'https://localhost:8443';
export const ACCESS_TOKEN = 'accessToken';

export const OAUTH2_REDIRECT_URI = 'https://localhost:3000/oauth2/redirect'

export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const GITHUB_AUTH_URL = API_BASE_URL + '/oauth2/authorize/github?redirect_uri=' + OAUTH2_REDIRECT_URI;
 export const LOGIN_SUCCESSFULLY = "LOGIN_SUCCESSFULLY";
 export const LOGIN_FAILED = "LOGIN_FAILED";
 export const LOGINING = "LOGINING";
 export const LOADING_CURRENT_USER= "LOADING_CURRENT_USER";
 export const LOADING_CURRENT_USER_SUCCESS = "LOADING_CURRENT_USER_SUCCESS";
 export const LOADING_CURRENT_USER_FAIL = "LOADING_CURRENT_USER_FAIL";
 export const LOG_OUT = "LOG_OUT";