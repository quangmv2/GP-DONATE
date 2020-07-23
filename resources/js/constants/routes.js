// require('dotenv').config()
export const PUBLIC_ROUTE = {
    LOGIN: "/login",
    CHANGEPASSWORD: "/reset-password",
    FORGOTPASSWORD: "/forgot-password",
    SIGNUP: "/signup",
    
};

export const PRIVATE_ROUTE = {
    POST_OFFER: "/post-offer",
    HOME: "/",
    POST_COMMENT: "/post-comment",
    USER_PROFILE: "/user-profile",
    ACTIVITIES: "/activities",
    MESSAGES: '/messages',
    CHOOSEROLE: "/choose-role",
    INPUTCODE: "/input-code"
};

export const ROUTE = {
    ...PUBLIC_ROUTE,
    ...PRIVATE_ROUTE
};

export const API_ROUTER = {
    AUTH: "/api/auth",
    FORGOTPASSWORD: "/api/oauth/pasword/reset"
};

export const ROOT_API_URL = 'http://52.205.200.96';
export const ROOT_WS = '52.205.200.96:9000';

export const GET_POST = '/api/posts';
export const GET_COMMENT = id => `${ROOT_API_URL}/api/posts/${id}/comments`;
export const POST_COMMENT = () => `${ROOT_API_URL}/api/comment`;

export const GET_IMAGE = (dir) => {
    return `${ROOT_API_URL}/api/photo?dir=${dir}`;
}
export const POST_POST = () => `${ROOT_API_URL}/api/posts`;
export const SEARCH_POST = keyWord => `${ROOT_API_URL}/api/posts/search?q=${keyWord}`;
export const SEARCH_PEOPLE = keyWord => `${ROOT_API_URL}/api/profile/search?q=${keyWord}`;
export const SEARCH_NOTI = (keyWord, page = 0) => `${ROOT_API_URL}/api/noti?q=${keyWord}&page=${page}`;

