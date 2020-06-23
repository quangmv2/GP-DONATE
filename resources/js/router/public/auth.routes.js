import Login from "components/PublicPages/Login/Login";

export const authRoutes = [
    {
        path: "/",
        component: Login,
        exact: true
    },
    {
        path: "/client/login",
        component: Login,
        exact: true
    }
];
