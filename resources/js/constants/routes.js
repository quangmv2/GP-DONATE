export const PUBLIC_ROUTE = {
    LOGIN: "/",
    CHANGEPASSWORD: "/reset-password",
    FORGOTPASSWORD: "/forgot-password",
    SIGNUP: "/signup",
    CHOOSEROLE: "/choose-role",
    INPUTCODE: "/input-code"
};

export const PRIVATE_ROUTE = {
    DASHBOARD: "/dashboard",
    HOME: "/dashboard"
};

export const ROUTE = {
    ...PUBLIC_ROUTE,
    ...PRIVATE_ROUTE
};

export const API_ROUTER = {
    AUTH: "/api/auth"
};

export const ROOT_API_URL = "http://localhost/donate/client";
