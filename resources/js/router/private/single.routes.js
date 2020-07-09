
import { PostOffer, HomePage, PostComment, UserProfile } from "components/PrivatePages";
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
    },
    {
        path: PRIVATE_ROUTE.USER_PROFILE,
        component: UserProfile,
        exact: true
    }
];
