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
    HOME_COMMENT: "/home-comment"
};

export const ROUTE = {
    ...PUBLIC_ROUTE,
    ...PRIVATE_ROUTE
};

export const API_ROUTER = {
    AUTH: "/api/auth"
};

export const ROOT_API_URL = "http://52.205.200.96/";
export const ROOT_WS = "52.205.200.96:9000";
