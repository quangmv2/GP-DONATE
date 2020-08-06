
// import { 
//     , 
//     ForgotPass, 
//     ,
//     ,
//     CongratScreen
// } 
// from 'components/PublicPages';
// import  from "";
// import  from "";
// import  from "";
// import  from "";
import { PUBLIC_ROUTE } from "constants";
// import TestSocket from "components/PublicPages/TestSocket";
import loadable from '@loadable/component';

const Login = loadable(() => import('components/PublicPages/Login/Login'))
const ForgotPass = loadable(() => import('components/PublicPages/ForgotPass/ForgotPass'))
const SignUpScreen = loadable(() => import('components/PublicPages/SignUp/SignUpScreen'))
const ChangePassScreen = loadable(() => import('components/PublicPages/ChangePass/ChangePassScreen'))
const CongratScreen = loadable(() => import('components/PublicPages/CongratSuccess/CongratScreen'))

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
    // {
    //     path: "/test-socket",
    //     component: TestSocket,
    //     exact: true
    // },
    {
        path: PUBLIC_ROUTE.CONGRAT,
        component: CongratScreen,
        exact: true
    }
];
