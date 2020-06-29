<<<<<<< HEAD

import Login from "components/PublicPages/Login/Login";
=======
import SignIn from '../../components/Layouts/Screens/SignInScreen';
import SignUp from '../../components/Layouts/Screens/SignUpScreen';
import CodeInput from '../../components/Layouts/Screens/CodeScreen';
import ChooseRoleScreen from '../../components/Layouts/Screens/ChooseRoleScreen';
>>>>>>> 62ca758e69d3ff2ff308d24105acbe96faebdfa0

export const authRoutes = [
    {
        path: "/login",
        component: SignIn,
        exact: true
    },
    {
        path: "/",
        component: SignUp,
        exact: true
    }, 
    {
        path: '/input-code',
        component: CodeInput,
        exact: true

    },
    {
        path: '/choose-role',
        component: ChooseRoleScreen,
        exact: true

    }
<<<<<<< HEAD
=======

>>>>>>> 62ca758e69d3ff2ff308d24105acbe96faebdfa0
];