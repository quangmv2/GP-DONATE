import React from "react"
import { PRIVATE_ROUTE } from 'constants';
import loadable from "@loadable/component";
import Loading from '../../components/Atoms/Loading/Loading';

const HomePage = loadable(() => import("components/PrivatePages/Home/HomePage"), { fallback: <Loading /> });
const PostComment = loadable(() => import("components/PrivatePages/HomeComment/PostComment"), { fallback: <Loading /> });
const UserProfile = loadable(() => import("components/PrivatePages/UserProfile/UserProfile"), { fallback: <Loading /> });
const ActivitiesScreen = loadable(() => import("components/PrivatePages/Activities/ActivitiesScreen/ActivitiesScreen"), { fallback: <Loading /> });
const Search = loadable(() => import("components/PrivatePages/Search/Search"), { fallback: <Loading /> });
const PostLike = loadable(() => import("components/PrivatePages/PostLike/PostLike"), { fallback: <Loading /> });
const ChooseRoleScreen = loadable(() => import("components/PrivatePages/ChooseRole/ChooseRoleScreen"), { fallback: <Loading /> });
const InputCode = loadable(() => import("components/PrivatePages/InputCode/InputCode"), { fallback: <Loading /> });
const SuccessScreen = loadable(() => import("components/PrivatePages/SuccessScreen/SuccessScreen"), { fallback: <Loading /> });
const PostOffer = loadable(() => import("components/PrivatePages/PostOffer/PostOffer"), { fallback: <Loading /> });
const ProfileSetting = loadable(() => import("components/PrivatePages/ProfileSetting/ProfileSetting"), { fallback: <Loading /> });
const EditProfile = loadable(() => import("components/PrivatePages/EditProfile/EditProfile"), { fallback: <Loading /> });


export const singleRoutes = [
  {
    path: PRIVATE_ROUTE.HOME,
    component: HomePage,
    exact: true,
  },
  {
    path: PRIVATE_ROUTE.POST_OFFER,
    component: PostOffer,
    exact: true,
  },
  {
    path: PRIVATE_ROUTE.PROFILESETTING,
    component: ProfileSetting,
    exact: true,
  },
  {
    path: PRIVATE_ROUTE.EDITPROFILE,
    component: EditProfile,
  },
  {
    path: PRIVATE_ROUTE.POST_COMMENT,
    component: PostComment,
    exact: true,
  },
  {
    path: '/search',
    component: Search,
    exact: true,
  },
  {
    path: PRIVATE_ROUTE.USER_PROFILE,
    component: UserProfile,
    exact: true,
  },
  {
    path: PRIVATE_ROUTE.ACTIVITIES,
    component: ActivitiesScreen,
    exact: true,
  },
  {
    path: PRIVATE_ROUTE.MYLIKES,
    component: PostLike,
    exact: true,
  },
  {
    path: PRIVATE_ROUTE.MYPROJECTS,
    component: PostLike,
    exact: true,
  },
  {
    path: PRIVATE_ROUTE.CHOOSEROLE,
    component: ChooseRoleScreen,
    exact: true
  },
  {
    path: PRIVATE_ROUTE.INPUTCODE,
    component: InputCode,
    exact: true
  },
  {
    path: PRIVATE_ROUTE.MYPROFILE,
    component: UserProfile,
    exact: true
  },
  {
    path: PRIVATE_ROUTE.SUCCESS,
    component: SuccessScreen,
    exact: true
  }
];
