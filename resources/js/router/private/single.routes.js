import Dashboard from "components/PrivatePages/Dashboard/Dashboard";
import { PostOffer, HomePage, PostComment } from "components/PrivatePages";
import { PRIVATE_ROUTE } from "constants";

export const singleRoutes = [
    {
        path: PRIVATE_ROUTE.HOME,
        component: HomePage,
        exact: true
    },
    {
        path: PRIVATE_ROUTE.POST_OFFER,
        component: PostOffer,
        exact: true
    }, 
    {
        path: PRIVATE_ROUTE.POST_COMMENT,
        component: PostComment,
        exact: true
    }
];
