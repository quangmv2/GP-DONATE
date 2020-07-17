<<<<<<< HEAD

import { 
    Login, 
    ForgotPass, 
    SignUpScreen,
    ChangePassScreen,

} 
    from 'components/PublicPages';
=======
import {
    Login,
    ChooseRoleScreen,
    ForgotPass,
    SignUpScreen,
    ChangePassScreen,
    InputCode
} from "components/PublicPages";
>>>>>>> ad154f157827fcf32e61681c1573dfe083845d82
import { PUBLIC_ROUTE } from "constants";
import TestSocket from "components/PublicPages/TestSocket";
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
        path: "/test-socket",
        component: TestSocket,
        exact: true
    }
];
