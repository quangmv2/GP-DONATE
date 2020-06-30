import FilledButton from "../../components/Atoms/AuthButton/FilledButton";
import Login from "components/PublicPages/Login/Login";
import SignUp from "../../components/PublicPages/Auth/SignUpScreen";
import ChangePass from '../../components/PublicPages/Auth/ChangePassScreen';
import ForgotPass from "../../components/PublicPages/Auth/ForgotPass";
import ChooseRoleScreen from "../../components/PublicPages/Auth/ChooseRoleScreen";
import InputCode from "../../components/PublicPages/Auth/InputCode";
export const authRoutes = [
    {
        path: "/",
        component: Login,
        exact: true
    },
    {
        path: "/login",
        component: Login,
        exact: true
    },
    {
        path: "/signup",
        component: SignUp,
        exact: true
    },
    {
        path: "/reset-password",
        component: ChangePass,
        exact: true
    },
    {
        path: "/forgot-password",
        component: ForgotPass,
        exact: true
    },
    {
        path: "/choose-role",
        component: ChooseRoleScreen,
        exact: true
    },
    {
        path: "/input-code",
        component: InputCode,
        exact: true
    }

];  