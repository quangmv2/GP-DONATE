import React, { useEffect, useState, useRef, memo, useContext, useCallback } from "react";
import { Link } from "react-router-dom";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import EventAvailableIcon from "@material-ui/icons/EventAvailable";
import Grid from "@material-ui/core/Grid";
import { ButtonAnt } from "components/Atoms";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchService } from "services";
import { FormattedMessage } from "react-intl";
import { PRIVATE_ROUTE, NOTIFICATION_TYPE, ROUTE } from "constants";
import "swiper/swiper.scss";
import "./HomeScreen.scss";
import { ROOT_API_URL, GET_IMAGE, GET_COMMENT, POST_LIKE, GET_LIKE } from "../../../constants/routes";
import UserAvatar from "react-user-avatar";
import CommentItem from "./CommentItem";
import { SocketContext } from "../../../context/SocketProvider";
import moment from "moment";
import CloseIcon from '@material-ui/icons/Close';
import { selectUserInfo } from "modules/auth/selectors";
import { Tooltip } from 'antd';
import { StarFilled } from "@ant-design/icons";
import { NavigatorContext } from "../../../context/BottomNavigatorContextAPI";

const PostItem = (props) => {
   
    const [comments, setComments] = useState([]);
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState([]);
    const { socket } = useContext(SocketContext);
    const homeImage = useRef(null);
    const commentsElement = useRef(null);
    const { setShowNavigator } = useContext(NavigatorContext);
    
    const { post, userInfo } = props;
    const isLiked = element => element.user_id == userInfo.id;
    const isLikes = liked.findIndex(isLiked);
    const isComment = element => element.user_id == userInfo.id;
    const isComments = comments.findIndex(isComment);
 
    useEffect(() => {
        fetchFirstData();
        fetchLike();
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
            setComments(cmts => {
                const newCmts = [...cmts];
                return newCmts.filter(({ id }) => {
                    return id !== data.id;
                });
            })
        })
    });

    const like = async () => {
        await fetchService.fetch(POST_LIKE(), {
            method: "POST",
            body: JSON.stringify({ post_id: props.id })
        });
        fetchLike();
    }

    const fetchLike = async () => {
        const [res, status] = await fetchService.fetch(GET_LIKE(props.id), {
            method: "GET"
        });
        if (status == 200) {
            setLikes(res.length);
            setLiked(res);
        }
    }
    const fetchComments = useCallback(async (id) => {
        try {
            const [comments, status] = await fetchService.fetch(`${ROOT_API_URL}/api/posts/${props.id}/comments`, {
                method: "GET"
            });

            if (status === 200) {
                setComments(comments);
                return comments;

            }
        } catch (error) {

        }
    });

    const convertOffer = (offer) => {
        if (!offer || !offer.type_offer) return
        if (offer.type_offer == "goods") {
            return (
                <span>
                    {offer.content}
                </span>
            );
        }
        try {
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
        } catch (error) {
            return;
        }
    }

    return (
        <div className="container">
            <div className="image-background-div">
                <img className="image-background" src={GET_IMAGE(props.photo_thumbnail)} alt={props.title} />
            </div>
            <div className="home-image" ref={homeImage}>
                <div className="top-navbar-giver-home">
                    <div className="navbar-giver-home-container">
                        <div style={{ position: "relative" }}>
                            {
                                props.user.code_id?<StarFilled className="icon-star" style={{ fontSize: "15px" }} />:<></>
                            }
                            <Link to={`user-profile/${props.user.username}`}  >
                                {
                                    props.user.personal_photo ? <img
                                        src={GET_IMAGE(props.user.personal_photo)}
                                        className="giver-avatar"
                                    /> :
                                        <UserAvatar size="42" name={`${props.user.first_name}`} />
                                }
                            </Link>
                        </div>
                        <div className="info-user">
                            <p className="username">
                                <Link to={`user-profile/${props.user.username}`} >
                                    {`${props.user.first_name}`}
                                </Link>
                            </p>

                            <p className="hours-ago">
                                {
                                    moment(props.created_at).add((new Date()).getUTCDate() - 12, 'hours').fromNow()
                                }
                            </p>
                        </div>
                    </div>
                    {
                        props.onCloseWindow ?
                            <div onClick={props.onCloseWindow}>
                                <CloseIcon
                                    style={{
                                        color: "white",
                                        fontSize: "27px"
                                    }}
                                />
                            </div>
                            :
                            <div onClick={() => props.setUserMessage(props.user)}>
                                <MailOutlineIcon
                                    style={{
                                        color: "white",
                                        fontSize: "27px"
                                    }}
                                />
                            </div>
                    }

                </div>
                <div className="home-content">
                    <Tooltip title={props.title}>
                        <p className="title-post">{props.title}</p>
                    </Tooltip>
                    <p className="home-text hastags">
                        {
                            props.hastags && props.hastags.length > 0 ?
                            `#${props.hastags.map(hastag => hastag.value).join(' #')}`: ""
                        }
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
                            <FormattedMessage defaultMessage="Due date til" id="homepage.dueDateTil" /> {moment(props.due_day).format("DD MMM YYYY")}
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
                            {comments.map((comment, index) =>{
                                if(index > (comments.length - 3) ){
                                    return (<CommentItem key={`cooment${comment.id} post${props.id}`} author={comment.user.first_name} content={comment.content} />);
                                }       
                            })}
                        </div>
                        <div className="raise-a-voice-container" onClick={() => {props.showModal(); setShowNavigator(false)}}>
                            <ButtonAnt>
                                <span><FormattedMessage defaultMessage="Raise Your voice" id="homepage.raiseYourVoice" /></span>
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
                                <ButtonAnt className="button-action button-share">
                                    <i className="icon-social icon-share" />
                                </ButtonAnt>
                            </div>
                            <div className="action">
                                <ButtonAnt className={isComments  > -1 ? "button-comments button-action" : "button-action button-uncomments"}>
                                    <i className="icon-social icon-comment-active" />
                                    <span className='span'>{comments.length}</span>
                                </ButtonAnt> 
                            </div>
                            <div className="action" onClick={like}>

                                <ButtonAnt className={isLikes > -1 ? "button-action button-liked" : "button-action button-unliked"}>
                                    <i className="icon-social icon-like-active" />
                                    <span>{likes}</span>
                                </ButtonAnt>

                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}
const mapStateToProps = createStructuredSelector({
    userInfo: selectUserInfo()
});

export default connect(mapStateToProps)(memo(PostItem));