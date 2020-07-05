import React, { Component } from "react";
import './HomeScreen.scss';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { BottomNavigator } from "components/Atoms";
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss';
import Bitmap from '../../../../../public/images/Bitmap.png';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';

export class GiverHomeScreen extends React.Component {
    // let userName = (<p className='user-name'></p>);

    render() {
        return (
            <div className="private-fullheight">
                <div className="container">
                    <div className='home-image'>
                        <div className='top-navbar-giver-home'>
                            <div className='navbar-giver-home-container'>
                                <img src={'./images/Bitmap.png'} className='giver-avatar' />
                                <div className='info-user'>
                                    <p>Alina Baikova</p>
                                    <p>4 hours a go</p>
                                </div>
                            </div>
                            <MailOutlineIcon style={{ color: 'white', fontSize: '27px' }} />
                        </div>
                        <div className='home-content'>
                            <p className='title-post'>I am offering my support to all the school in africa.Ping me!</p>
                            <p className='home-text hashtags'>#endregion #....</p>
                            <div className='home-time-content time-container'>
                                <div className='home-time-content'>
                                    <AccessTimeIcon style={{ color: 'white', fontSize: '27px' }} />
                                    <p className='home-text'>120 hours</p>
                                </div>
                                <div className='home-time-content availble-time-text'>
                                    <AccessTimeIcon style={{ color: 'white', fontSize: '27px' }} />
                                    <p className='home-text'>Availble 9AM - 12AM</p>
                                </div>
                            </div>
                            <div className='home-time-content due-date'>
                                <EventAvailableIcon style={{ color: 'white', fontSize: '27px' }} />
                                <p className='home-text '>Due date til 24 Jul 2020</p>

                            </div>

                        </div>
                        <Grid container spacing={3} className='grid-container'>
                            <Grid item xs={10} className='comment-container'>
                                <p className='demo-comment'>@faceforafrica: Hi Alina, we are a charity organization involved with educating African Chidren...</p>
                                <p className='demo-comment'>@faceforafrica: Hi Alina, we are a charity organization involved with educating African Chidren...</p>
                                <div className='raise-a-voice-container'>
                                    <p>Raise a voice</p>
                                    <ChatBubbleIcon className='commentIcon' />
                              
                                </div>
                            </Grid>
                            <Grid item xs={2} className='action-container'>
                                <div>
                                <ShareIcon style={{ color: 'white', fontSize: '29px' }} />
                                <p></p>
                                </div>
                                <div className='action'>
                                    <ChatBubbleIcon style={{ color: 'white', fontSize: '29px' }} />
                                    <p>315</p>
                                </div>
                                <div className='action'>
                                    <FavoriteIcon style={{ color: 'white', fontSize: '29px' }} />
                                    <p>315</p>
                                </div>
                            </Grid>
                        </Grid>

                        <BottomNavigator />
                    </div>

                </div>
            </div>

        );
    }
}



export default GiverHomeScreen;
