
import Login from "components/PublicPages/Login/Login";
import TestSocket from "../../components/PublicPages/TestSocket";

export const authRoutes = [
    {
        path: "/client/",
        component: Login,
        exact: true
    },
    {
        path: "/client/login",
        component: Login,
        exact: true
    }, 
    {
        path: "/client/test-socket",
        component: TestSocket,
        exact: true
    }, 
];