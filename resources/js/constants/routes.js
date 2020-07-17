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
<<<<<<< HEAD
    MESSAGES: '/messages',
    CHOOSEROLE: "/choose-role",
    INPUTCODE: "/input-code"
=======
    MESSAGES: "/messages"
>>>>>>> ad154f157827fcf32e61681c1573dfe083845d82
};

export const ROUTE = {
    ...PUBLIC_ROUTE,
    ...PRIVATE_ROUTE
};

export const API_ROUTER = {
    AUTH: "/api/auth",
    FORGOTPASSWORD: "/api/oauth/pasword/reset"
};

export const ROOT_API_URL = "http://52.205.200.96";
export const ROOT_WS = "52.205.200.96:9000";
