import EditProfile from "components/PrivatePages/EditProfile/EditProfile";
import ProfileSetting from "components/PrivatePages/ProfileSetting/ProfileSetting";
<<<<<<< HEAD
import { PostOffer, HomePage, PostComment, UserProfile, ActivitiesScreen, MessagesDetail } from "components/PrivatePages";
=======
import {
    PostOffer,
    HomePage,
    PostComment,
    UserProfile,
    ActivitiesScreen,
    Search,
    PostLike
} from "components/PrivatePages";
>>>>>>> 490611e3110f3daa4645622fd6b3a34c64c531a1
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
        path: "/profile-setting",
        component: ProfileSetting,
        exact: true
    },
    {
        path: "/edit-profile",
        component: EditProfile
    },
    {
        path: PRIVATE_ROUTE.POST_COMMENT,
        component: PostComment,
        exact: true
    },
    {
        path: "/search",
        component: Search,
        exact: true
    },
    {
        path: PRIVATE_ROUTE.USER_PROFILE,
        component: UserProfile,
        exact: true
    },
    {
        path: PRIVATE_ROUTE.ACTIVITIES,
        component: ActivitiesScreen,
        exact: true
    },
    {
<<<<<<< HEAD
        path: PRIVATE_ROUTE.MESSAGES,
        component: MessagesDetail,
=======
        path: "/post-like",
        component: PostLike,
>>>>>>> 490611e3110f3daa4645622fd6b3a34c64c531a1
        exact: true
    }
];
