import React from "react";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import PersonOutlineRoundedIcon from "@material-ui/icons/PersonOutlineRounded";
import { Link } from "react-router-dom";
import { PRIVATE_ROUTE } from "constants";

import "./bottomNav.scss";

const BottomNavigator = () => {
    return (
        <div className="bottom-nav-container">
            <div className="bottom-nav">
                <div className="bottom-nav-icon-container">
                    <Link to={PRIVATE_ROUTE.HOME} className="active">
                        <HomeIcon className="icon-bottom-nav" />
                        Home
                    </Link>
                </div>
                <div className="bottom-nav-icon-container">
                    <Link to="" className="active">
                        <SearchIcon className="icon-bottom-nav" />
                        Search
                    </Link>
                </div>
                <div className="bottom-nav-icon-container ">
                    <Link
                        to={PRIVATE_ROUTE.POST_OFFER}
                        className="active center-button"
                    >
                        <div class="circle-plus-wrapper">
                            <div class="cirlce-plus-icon"></div>
                        </div>
                        Post Offer
                    </Link>
                </div>
                <div className="bottom-nav-icon-container">
                    <Link to="/activities" className="active">
                        <StarBorderRoundedIcon className="icon-bottom-nav" />
                        Activities
                    </Link>
                </div>
                <div className="bottom-nav-icon-container">
                    <Link to="/profile-setting" className="active">
                        <PersonOutlineRoundedIcon className="icon-bottom-nav" />
                        Account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default BottomNavigator;
