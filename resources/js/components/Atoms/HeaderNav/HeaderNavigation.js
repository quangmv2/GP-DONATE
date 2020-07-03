import React from "react";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import './HeaderNav.scss';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

const HeaderNavigation = props => {
    return (
        <div>
            <AppBar position="static" >
                <Toolbar className='app-bar-container' >
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <ArrowBackIosIcon className='top-nav-icon' />
                    </IconButton>
                            <p>{props.headerName}</p>
                            <IconButton edge="start" color="inherit" aria-label="menu">
                        <ArrowBackIosIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
    )

};
export default HeaderNavigation;