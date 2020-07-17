import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import Grid from "@material-ui/core/Grid";
import ShareIcon from "@material-ui/icons/Share";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { ButtonAnt } from "components/Atoms";
import { fetchService } from "services";
import axios from "axios";

import "swiper/swiper.scss";
import "./HomeScreen.scss";
import { ROOT_API_URL } from "../../../constants/routes";
import { OmitProps } from "antd/lib/transfer/ListBody";

const linkImage = 'uploads/images/posts/1594885437_03oSmzkC2SFhtWcPHlpwaIn-35.fit_scale.size_2698x1517.v1569486010.png'

const PostItem = (props) => {

    // const [data, setData] = useState(null);

    // useEffect(() => {
    //     fetchImage();
    // }, [])

    // const fetchImage = async () => {

    //     const image = await fetchService.fetchImageBase64(`${ROOT_API_URL}/api/posts/photo?dir=${linkImage}`, {
    //         method: "GET"
    //     });
    //     console.log(image);
    // }

    console.log(props);

    return (
        <div className="swiper-slide-item">
            <div className="container">
                <div className="home-image">
                    <div className="top-navbar-giver-home">
                        <div className="navbar-giver-home-container">
                            <Link to="/user-profile">
                                <img
                                    // src={data ? `data:image;base64, ${data}` : ''}
                                    className="giver-avatar"
                                />
                            </Link>
                            <div className="info-user">
                                <p className="username">
                                    <Link to="/user-profile">
                                        Alina{" "}
                                    </Link>
                                </p>

                                <p className="hours-ago">
                                    4 hours a go
                                                    </p>
                            </div>
                        </div>
                        <MailOutlineIcon
                            style={{
                                color: "white",
                                fontSize: "27px"
                            }}
                        />
                    </div>
                    <div className="home-content">
                        <p className="title-post">{props.title}</p>
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
                                <div className="home-text">
                                    <span>
                                        Mon, Tue: 09:00 - 12:00{" "}
                                    </span>
                                    <br />
                                    <span>
                                        Tue, Thurs: 16:00 - 18:00
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="home-time-content due-date">
                            <EventAvailableIcon
                                style={{
                                    color: "white",
                                    fontSize: "27px"
                                }}
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
                        <Grid
                            item
                            xs={10}
                            className="comment-container"
                        >
                            <p className="demo-comment">
                                @faceforafrica: Hi Alina, we
                                are a charity organization
                                involved with educating
                                African Chidren...
                                                </p>
                            <p className="demo-comment">
                                @faceforafrica: Hi Alina, we
                                are a charity organization
                                involved with educating
                                African Chidren...
                                                </p>
                            <div className="raise-a-voice-container">
                                <ButtonAnt>
                                    <span>
                                        Raise a voice
                                                        </span>
                                    <ChatBubbleIcon className="commentIcon" />
                                </ButtonAnt>
                            </div>
                        </Grid>
                        <Grid
                            item
                            xs={2}
                            className="action-container"
                        >
                            <div className="social-action-wrapper">
                                <div>
                                    <ButtonAnt className="button-action">
                                        <ShareIcon
                                            style={{
                                                color:
                                                    "white",
                                                fontSize:
                                                    "29px"
                                            }}
                                        />
                                    </ButtonAnt>
                                </div>
                                <div className="action">
                                    <ButtonAnt className="button-action">
                                        <ChatBubbleIcon
                                            style={{
                                                color:
                                                    "white",
                                                fontSize:
                                                    "29px"
                                            }}
                                        />
                                        <p>315</p>
                                    </ButtonAnt>
                                </div>
                                <div className="action">
                                    <ButtonAnt className="button-action">
                                        <FavoriteIcon
                                            style={{
                                                color:
                                                    "white",
                                                fontSize:
                                                    "29px"
                                            }}
                                        />
                                        <p>315</p>
                                    </ButtonAnt>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </div>
    )
}

export default PostItem;