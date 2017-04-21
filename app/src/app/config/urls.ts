import { environment } from '../../environments/environment';

export const API_URL = environment.apiUrl;
export const GET_CONFIG = API_URL + '/config';
export const POST_CONFIG = API_URL + '/config';
export const POST_LOGIN = API_URL + '/login';
export const GET_LOGOUT = API_URL + '/logout';

export const SOCKET_TWITTER = API_URL + '/logout';
