import Dashboard from "components/PrivatePages/Dashboard/Dashboard";
import { PostOffer, GiverHomeScreen } from "components/PrivatePages";

export const singleRoutes = [
    {
        path: "/dashboard",
        component: GiverHomeScreen,
        exact: true
    },
    {
        path: "/client",
        component: PostOffer,
        exact: true
    },
];
