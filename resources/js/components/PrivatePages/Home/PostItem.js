import React, { useEffect, useState, useRef, memo, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import Grid from "@material-ui/core/Grid";
import { ButtonAnt } from "components/Atoms";
import { fetchService } from "services";

import "swiper/swiper.scss";
import "./HomeScreen.scss";
import { ROOT_API_URL, GET_IMAGE, GET_COMMENT } from "../../../constants/routes";
import { OmitProps } from "antd/lib/transfer/ListBody";
import UserAvatar from "react-user-avatar";
import CommentItem from "./CommentItem";
import { SocketContext } from "../../../context/SocketProvider";
import moment from "moment";

const PostItem = (props) => {

    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState(props.likes);
    const { socket } = useContext(SocketContext);
    const homeImage = useRef(null);
    const commentsElement = useRef(null);

    useEffect(() => {
        fetchFirstData();
        commentsElement.current.scrollTop = 5000
    }, []);

    useEffect(() => {
        commentsElement.current.scrollTop = 5000
    }, [comments])

    const fetchFirstData = useCallback(async () => {
        fetchComments();
        socket.emit('watch-post', { id: props.id });
        socket.on(`new-comment`, data => {
            if (data.post_id === props.id) {
                setComments(cmts => {
                    if (cmts.find(({ id }) => id === data.id)) return cmts;
                    const newCmts = [...cmts];
                    newCmts.push(data);
                    return newCmts;
                })
            }
        });
        socket.on('delete-comment', data => {
            console.log(data);
            setComments(cmts => {
                const newCmts = [...cmts];
                return newCmts.filter(({ id }) => {
                    console.log(id !== data.id);
                    return id !== data.id;
                });
            })
        })
    });

    const fetchComments = useCallback(async (id) => {
        try {
            const [comments, status] = await fetchService.fetch(`${ROOT_API_URL}/api/posts/${props.id}/comments`, {
                method: "GET"
            });
            console.log(comments);
            if (status === 200) {
                setComments(comments);
                return comments;
            }
        } catch (error) {
            console.log(err);

        }
    });

    const convertOffer = (offer) => {
        if (!offer) return
        if (offer.type_offer == "goods") {
            console.log(offer.content);
            return (
                <span>
                    {offer.content}
                </span>
            );
        }
        const times = JSON.parse(offer.content);
        times.sort((a, b) => {
            if (a.start > b.start) return 1
            return -1;
        });
        return times.map(time => {
            const keys = Object.keys(time.days);
            return keys.map(key => <span key={`offer post ${props.id} ${time.days[key]}`}>
                {`${time.days[key]}: ${time.start}-${time.end}`}<br />
            </span>)
        })
        console.log(times);
    }
    return (
        <div className="container">
            <div className="image-background-div">
                <img className="image-background" src={GET_IMAGE(props.photo_thumbnail)} alt={props.title} />
            </div>
            <div className="home-image" ref={homeImage}>
                <div className="top-navbar-giver-home">
                    <div className="navbar-giver-home-container">
                        <Link to="/user-profile">
                            {
                                props.user.personal_photo ? <img
                                    src={GET_IMAGE(props.user.personal_photo)}
                                    className="giver-avatar"
                                /> :
                                    <UserAvatar size="42" name={`${props.user.first_name}`} />
                            }
                        </Link>
                        <div className="info-user">
                            <p className="username">
                                <Link to="/user-profile">
                                    {`${props.user.first_name} ${props.user.last_name}`}
                                </Link>
                            </p>

                            <p className="hours-ago">
                                {
                                    moment(props.created_at).add((new Date()).getUTCDate()-12, 'hours').fromNow()
                                }
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
                    <p className="home-text hastags">
                        {`#${props.hastags.map(hastag => hastag.value).join(' #')}`}
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
                                {
                                    convertOffer(props.offers)
                                }
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
                            Due date til {moment(props.due_day).format("DD MMM YYYY")}
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
                        <div className="coment-item-container" ref={commentsElement}>
                            {
                                comments.map(comment =>
                                    <CommentItem key={`cooment${comment.id} post${props.id}`}
                                        author={comment.user.first_name} content={comment.content} />
                                )
                            }
                        </div>
                        <div className="raise-a-voice-container">
                            <ButtonAnt>
                                <span>Raise a voice</span>
                                <i className="icon-social icon-comment-active"></i>
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
                                    <i className="icon-social icon-share" />
                                </ButtonAnt>
                            </div>
                            <div className="action">
                                <ButtonAnt className="button-action">
                                    <i className="icon-social icon-comment-active" />
                                    <span>{comments.length}</span>
                                </ButtonAnt>
                            </div>
                            <div className="action">
                                <ButtonAnt className="button-action">
                                    <i className="icon-social icon-like-active" />
                                    <span>{props.likes.length}</span>
                                </ButtonAnt>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default memo(PostItem);