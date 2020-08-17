// require('dotenv').config()
export const PUBLIC_ROUTE = {
    LOGIN: "/login",
    CHANGEPASSWORD: "/reset-password",
    FORGOTPASSWORD: "/forgot-password",
    SIGNUP: "/signup",
    CONGRAT: '/signup-success'
    
};

export const PRIVATE_ROUTE = {
    POST_OFFER: "/post-offer",
    HOME: "/",
    POST_COMMENT: "/post-comment",
    USER_PROFILE: "/user-profile/:userId",
    ACTIVITIES: "/activities",
    MESSAGES: '/messages',
    CHOOSEROLE: "/choose-role",
    INPUTCODE: "/input-code",
    EDITPROFILE: '/edit-profile',
    PROFILESETTING: '/profile-setting',
    MYPROFILE: '/my-profile',
    MYLIKES: '/post-like',
    MYPROJECTS: '/my-project',
    SUCCESS: '/success'
};

export const ROUTE = {
    ...PUBLIC_ROUTE,
    ...PRIVATE_ROUTE
};

export const API_ROUTER = {
    AUTH: "/api/auth",
    FORGOTPASSWORD: "/api/oauth/pasword/reset"
};

export const ROOT_API_URL = 'http://192.168.1.105';
export const ROOT_WS = '52.205.200.96:9000';

export const GET_POST = '/api/posts';
export const GET_COMMENT = id => `${ROOT_API_URL}/api/posts/${id}/comments`;
export const POST_COMMENT = () => `${ROOT_API_URL}/api/comment`;
export const GET_PROFILE = id => `${ROOT_API_URL}/api/profile/${id}`;
export const GET_PROPOSITIONS = id => `${ROOT_API_URL}/api/profile/${id}/posts`
export const GET_IMAGE = (dir) => {
    return `${ROOT_API_URL}/api/photo?dir=${dir}`;
}
export const POST_POST = () => `${ROOT_API_URL}/api/posts`;
export const SEARCH_POST = keyWord => `${ROOT_API_URL}/api/posts/search?q=${keyWord}`;
export const SEARCH_PEOPLE = keyWord => `${ROOT_API_URL}/api/profile/search?q=${keyWord}`;
export const SEARCH_NOTI = (page = 0) => `${ROOT_API_URL}/api/noti?page=${page}`;
export const SEARCH_MESSAGE = () => `${ROOT_API_URL}/api/message`;
export const GET_MESSAGE_DETAILS =  id => `${ROOT_API_URL}/api/message/${id}`;
export const SEND_MESSAGE =  () => `${ROOT_API_URL}/api/message`;
export const POST_LIKE = () => `${ROOT_API_URL}/api/like`;
export const GET_LIKE = id => `${ROOT_API_URL}/api/posts/${id}/likes`;
export const GET_MY_LIKE = () => `${ROOT_API_URL}/api/profile/likes`;
export const GET_MY_POST = id => `${ROOT_API_URL}/api/profile/${id}/posts`;
export const FOLLOW_USER = id => `${ROOT_API_URL}/api/profile/${id}/follow`;
export const UN_FOLLOW_USER = id => `${ROOT_API_URL}/api/profile/${id}/un-follow`;
export const CHECK_FOLLOW = id => `${ROOT_API_URL}/api/profile/${id}/follow`;
export const DELETE_POST = id => `${ROOT_API_URL}/api/posts/${id}`;