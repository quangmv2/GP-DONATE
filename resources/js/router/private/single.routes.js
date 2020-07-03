import Dashboard from "components/PrivatePages/Dashboard/Dashboard";
import { PostOffer } from "components/PrivatePages";

export const singleRoutes = [
    {
        path: "/client/dashboard",
        component: Dashboard,
        exact: true
    },
    {
        path: "/client",
        component: PostOffer,
        exact: true
    },
];
