import React from "react";
import { Link } from "react-router-dom";
import { ROUTE } from "../../../constants/routes";

const SuccessScreen = props => {
    return(
        <Link to={ROUTE.HOME}>
           <img 
           src='/images/FullScreen/Full_screen_01.jpg'
           />
        </Link>
    )
};
export default SuccessScreen;