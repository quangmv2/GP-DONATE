// require('dotenv').config()
export const PUBLIC_ROUTE = {
    LOGIN: "/",
    CHANGEPASSWORD: "/reset-password",
    FORGOTPASSWORD: "/forgot-password",
    SIGNUP: "/signup",
    CHOOSEROLE: "/choose-role",
    INPUTCODE: "/input-code"
};

export const PRIVATE_ROUTE = {
    POST_OFFER: "/post-offer",
    HOME: "/home",
    POST_COMMENT: "/post-comment",
    USER_PROFILE: "/user-profile"
};

export const ROUTE = {
    ...PUBLIC_ROUTE,
    ...PRIVATE_ROUTE
};

export const API_ROUTER = {
    AUTH: "/api/auth"
};

export const ROOT_API_URL = '';
export const ROOT_WS = 'localhost:9000';
