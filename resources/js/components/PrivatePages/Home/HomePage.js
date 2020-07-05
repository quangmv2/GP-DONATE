import React, { Component } from "react";

import MailOutlineIcon from "@material-ui/icons/MailOutline";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";

import Grid from "@material-ui/core/Grid";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import { BottomNavigator } from "components/Molecules";
import { ButtonAnt } from "components/Atoms";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.scss";
import "./HomeScreen.scss";

export class HomePage extends Component {
    render() {
        return (
            <div className="private-fullheight">
                <div className="container">
                    <div className="home-image">
                        <div className="top-navbar-giver-home">
                            <div className="navbar-giver-home-container">
                                <img
                                    src={"./images/Bitmap.png"}
                                    className="giver-avatar"
                                />
                                <div className="info-user">
                                    <p className="username">Alina Baikova</p>
                                    <p>4 hours a go</p>
                                </div>
                            </div>
                            <MailOutlineIcon
                                style={{ color: "white", fontSize: "27px" }}
                            />
                        </div>
                        <div className="home-content">
                            <p className="title-post">
                                I am offering my support to all the school in
                                africa.Ping me!
                            </p>
                            <p className="home-text hashtags">
                                #endregion #....
                            </p>
                            <div className="home-time-content time-container">
                                <div className="home-time-content ">
                                    <AccessTimeIcon
                                        style={{
                                            color: "white",
                                            fontSize: "27px"
                                        }}
                                    />
                                    <div class="home-text">
                                        <span>Mon, Tue: 09:00 - 12:00 </span>
                                        <br />
                                        <span>Tue, Thurs: 16:00 - 18:00</span>
                                    </div>
                                </div>
                            </div>
                            <div className="home-time-content due-date">
                                <EventAvailableIcon
                                    style={{ color: "white", fontSize: "27px" }}
                                />
                                <p className="home-text ">
                                    Due date til 24 Jul 2020
                                </p>
                            </div>
                        </div>
                        <Grid
                            container
                            className="grid-container comment-wrapper"
                        >
                            <Grid item xs={10} className="comment-container">
                                <p className="demo-comment">
                                    @faceforafrica: Hi Alina, we are a charity
                                    organization involved with educating African
                                    Chidren...
                                </p>
                                <p className="demo-comment">
                                    @faceforafrica: Hi Alina, we are a charity
                                    organization involved with educating African
                                    Chidren...
                                </p>
                                <div className="raise-a-voice-container">
                                    <ButtonAnt>
                                        <span>Raise a voice</span>
                                        <ChatBubbleIcon className="commentIcon" />
                                    </ButtonAnt>
                                </div>
                            </Grid>
                            <Grid item xs={2} className="action-container">
                                <div class="social-action-wrapper">
                                    <div>
                                        <ButtonAnt className="button-action">
                                            <ShareIcon
                                                style={{
                                                    color: "white",
                                                    fontSize: "29px"
                                                }}
                                            />
                                        </ButtonAnt>
                                    </div>
                                    <div className="action">
                                        <ButtonAnt className="button-action">
                                            <ChatBubbleIcon
                                                style={{
                                                    color: "white",
                                                    fontSize: "29px"
                                                }}
                                            />
                                            <p>315</p>
                                        </ButtonAnt>
                                    </div>
                                    <div className="action">
                                        <ButtonAnt className="button-action">
                                            <FavoriteIcon
                                                style={{
                                                    color: "white",
                                                    fontSize: "29px"
                                                }}
                                            />
                                            <p>315</p>
                                        </ButtonAnt>
                                    </div>
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

export default HomePage;
