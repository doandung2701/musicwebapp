// khi xay dung api thi sua sau
export const API_BASE_URL = 'https://localhost:8443/';

//export const API_BASE_URL = '/api';
export const ACCESS_TOKEN = 'accessToken';

// hang so lien quan toi viec xu ly form thi lam tuong tu nhu the nay.Nhưng tạo file trong folder đó
export const NAME_MIN_LENGTH = 4;
export const NAME_MAX_LENGTH = 40;

export const USERNAME_MIN_LENGTH = 3;
export const USERNAME_MAX_LENGTH = 15;

export const EMAIL_MAX_LENGTH = 40;

export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 20;

//begin singer constants
export const GETTING_SINGERS = 'GETTING_ALL_SINGERS';
export const GET_SINGERS_SUCCESS = 'GET_ALL_SINGERS_SUCCESS';
export const GET_SINGERS_FAIL = 'GET_ALL_SINGERS_FAIL';
export const GETTING_SINGER_BY_ID  = 'GETTING_SINGER_BY_ID';
export const GET_SINGER_BY_ID_SUCCESS  = 'GET_SINGER_BY_ID_SUCCESS';
export const GET_SINGER_BY_ID_FAIL  = 'GET_SINGER_BY_ID_FAIL';
export const CREATING_SINGER = 'CREATING_SINGER';
export const CREATE_SINGER_SUCCESS = 'CREATE_SINGER_SUCCESS';
export const CREATE_SINGER_FAIL = 'CREATE_SINGER_FAIL';
export const DELETING_SINGER = 'DELETING_SINGER';
export const DELETE_SINGER_SUCCESS = 'DELETE_SINGER_SUCCESS';
export const DELETE_SINGER_FAIL = 'DELETE_SINGER_FAIL';
export const UPDATING_SINGER= 'UPDATING_SINGER';
export const UPDATE_SINGER_SUCCESS= 'UPDATE_SINGER_SUCCESS';
export const UPDATE_SINGER_FAIL= 'UPDATE_SINGER_FAIL';
//end singer constants

//begin song constants
export const GETTING_SONGS_BY_SINGER_ID = 'GETTING_SONGS_BY_SINGER_ID';
export const GET_SONGS_BY_SINGER_ID_SUCCESS = 'GET_SONGS_BY_SINGER_ID_SUCCESS';
export const GET_SONGS_BY_SINGER_ID_FAIL = 'GET_SONGS_BY_SINGER_ID_FAIL';
//end song constants