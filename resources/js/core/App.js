import React from "react";
import {
    App,
    NavRight,
    Panel,
    View,
    Page,
    Navbar,
    Block,
    Row,
    Col,
    Button,
    Popup,
    Link,
    LoginScreenTitle,
    BlockFooter,
    ListButton,
    ListInput,
    List,
    BlockTitle,
    ListItem,
    NavLeft,
    NavTitle,
    Toolbar,
    LoginScreen
} from "framework7-react";

import publicRoutes from "../router/public";
import SignUpScreen from '../components/Layouts/Screens/SignUpScreen';
import background from "../../../public/images/background.png";
<<<<<<< HEAD
import './app.scss';
=======
>>>>>>> 62ca758e69d3ff2ff308d24105acbe96faebdfa0
import CodeScreen from '../components/Layouts/Screens/CodeScreen';
import ChooseRoleScreen from "../components/Layouts/Screens/ChooseRoleScreen";
import SignInScreen from "../components/Layouts/Screens/SignInScreen";
export default function(props) {
    // Framework7 parameters here
    const f7params = {
        id: "com.demoapp.test", // App bundle ID
        name: "Framework7", // App name,
        theme: "auto",
        // App routes
        routes: [...publicRoutes]
    };

    return (
        <App params={f7params}>
<<<<<<< HEAD
          <ChooseRoleScreen />
=======
         <View id="main-view" url='/' main ></View>
>>>>>>> 62ca758e69d3ff2ff308d24105acbe96faebdfa0
        </App>
    );
}