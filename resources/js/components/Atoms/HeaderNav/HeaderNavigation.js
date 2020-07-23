import React from "react";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import "./HeaderNav.scss";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import { withRouter } from "react-router-dom";

const HeaderNavigation = withRouter(props => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar className="app-bar-container">
                    <IconButton
                        color="inherit"
                        className="i"
                        onClick={props.handleBack ? props.handleBack : () => props.history.goBack()}
                    >
                        <ArrowBackIosIcon className="top-nav-icon" />
                    </IconButton>
                    <p>{props.headerName}</p>
                    <div>{props.children}</div>
                </Toolbar>
            </AppBar>
        </div>
    );
});
export default HeaderNavigation;
