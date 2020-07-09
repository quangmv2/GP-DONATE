import EditProfile from "components/PrivatePages/EditProfile/EditProfile";
import ProfileSetting from "components/PrivatePages/ProfileSetting/ProfileSetting";
import { PostOffer, HomePage, PostComment, UserProfile, ActivitiesScreen } from "components/PrivatePages";
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
        path: PRIVATE_ROUTE.USER_PROFILE,
        component: UserProfile,
        exact: true
    },
    {
        path: PRIVATE_ROUTE.ACTIVITIES,
        component: ActivitiesScreen,
        exact: true
    }
];
