import React from "react";
import { PUBLIC_ROUTE } from "constants";
import loadable from '@loadable/component';
import Loading from "../../components/Atoms/Loading/Loading";

const Login = loadable(() => import('components/PublicPages/Login/Login'))
const ForgotPass = loadable(() => import('components/PublicPages/ForgotPass/ForgotPass'), { fallback: <Loading /> })
const SignUpScreen = loadable(() => import('components/PublicPages/SignUp/SignUpScreen'), { fallback: <Loading /> })
const ChangePassScreen = loadable(() => import('components/PublicPages/ChangePass/ChangePassScreen'), { fallback: <Loading /> })
const CongratScreen = loadable(() => import('components/PublicPages/CongratSuccess/CongratScreen'), { fallback: <Loading /> })

export const authRoutes = [
    {
        path: PUBLIC_ROUTE.LOGIN,
        component: Login,
        exact: true
    },
    {
        path: PUBLIC_ROUTE.SIGNUP,
        component: SignUpScreen,
        exact: true
    },
    {
        path: PUBLIC_ROUTE.CHANGEPASSWORD,
        component: ChangePassScreen,
        exact: true
    },
    {
        path: PUBLIC_ROUTE.FORGOTPASSWORD,
        component: ForgotPass,
        exact: true
    },
    {
        path: PUBLIC_ROUTE.CONGRAT,
        component: CongratScreen,
        exact: true
    }
];
