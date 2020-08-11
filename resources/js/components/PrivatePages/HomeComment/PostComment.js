import React, { useState, useContext, useEffect, useRef, useCallback } from "react";
import { FormattedMessage } from "react-intl";
import { HeaderNavigation } from 'components/Atoms';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import { SocketContext } from "../../../context/SocketProvider";
import CloseIcon from '@material-ui/icons/Close';
import { GET_COMMENT, POST_COMMENT, GET_IMAGE } from "../../../constants/routes";
import { fetchService } from "services";
import moment from "moment";
import { getMessageTranslate } from "helpers";
import './HomeComment.scss';
import { selectUserInfo } from "modules/auth/selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import UserAvatar from "react-user-avatar";

const PostComment = (props) => {
    const { userInfo } = props;
    const [data, setData] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const { socket } = useContext(SocketContext);
    const screen = useRef(null);
    
    useEffect(() => {
        fetchFirstData();
    }, []);
    useEffect(() => {
        screen.current.scrollTop = 5000;
    }, [comments]);

    const { post } = props;

    const fetchFirstData = useCallback(async () => {
        await fetchComments();
        screen.current.scrollTo(0,document.body.scrollHeight);
        socket.emit('watch-post', { id: post.id });
        socket.on(`new-comment`, data => {
            setComments(cmts => {
                if (cmts.find(({ id }) => id === data.id)) return cmts;
                const newCmts = [...cmts];
                newCmts.push(data);
                newCmts.sort((a, b) => {
                    const dateA =  new Date(a.created_at).getTime;
                    const dateB =  new Date(b.created_at).getTime;
                    return  dateA - dateB;
                })
                return newCmts;
            });
            screen.scrollTo(0,document.body.scrollHeight);
        });

        socket.on('delete-comment', data => {
            setComments(cmts => {
                const newCmts = [...cmts];
                return newCmts.filter(({ id }) => id != data.id);
            })
        })
    }, []);

    const fetchComments = async (id) => {
        try {
            const [comments, status] = await fetchService.fetch(GET_COMMENT(post.id), {
                method: "GET"
            });
            if (status === 200) {
                setComments(comments);
                return comments;
             
            }
        } catch (error) {
            console.log(err);
        }
    }

    const inputChange = (e) => {
        setComment(e.target.value);
    }

    const clickComment = async () => {
        const data = {
            post_id: post.id,
            content: comment
        }
        const [resComment, status] = await fetchService.fetch(POST_COMMENT(), {
            method: "POST",
            body: JSON.stringify(data)
        })
        if (status == 200 || status == 201) {
            setComments(cmts => {
                const newCmts = [...cmts];
                newCmts.push(resComment);
                return newCmts;
            });
            setComment('');
            window.scrollTo(0,document.body.scrollHeight);
        } 
    }

    const renderComment = () => {
        return _.map(comments, ({ user: {username, personal_photo}, content, created_at }, index) => {
            return (
                <div className='home-comment-container comment-item-wrapper' key={`comment${index}`}>
                    <div className='content-container'>
                        {personal_photo == null ? <UserAvatar size="42" name={username} />: <img
                            src={GET_IMAGE(personal_photo)}
                            className="giver-avatar"
                        />}
                        <div className='info-post'>
                            <p className='user-name'>@{username}</p>
                            <p className='offer-content comment-body-conatiner'>{content}</p>
                            <div className='time-post-container'>
                            <p className='time-post-offer'>{moment(created_at).add(-(new Date().getTimezoneOffset() / 60), 'hours').fromNow()}</p>
                                <p className='time-post-offer'>2 <FormattedMessage defaultMessage="Likes" id="common.likes" /></p>
                                <button className='reply'><FormattedMessage defaultMessage="Reply" id="common.reply" /></button>
                            </div>
                        </div>
                    </div>
                    <button className='button-trans '>
                        <FavoriteBorderIcon />
                    </button>
                </div>

            );
        });
    }

    const onEnterPress = (e) => {
        if(e.keyCode == 13 && e.shiftKey == false) {
            e.preventDefault();
            clickComment();
        }
    }

    return (
        <div className="private-fullheight" style={{ position: "absolute", zIndex: 100000, width: "100%" }}>
            <div className="container" >
                <HeaderNavigation headerName={getMessageTranslate('comment', 'comments')} handleBack={() => {props.hideModal();}}>
                    <button className='button-trans button-close-comment button-right-header' onClick={() => {props.hideModal();}}>
                        <CloseIcon />
                    </button>
                </HeaderNavigation>
                <div className='content-container post-info-container'>
                    {post.user.personal_photo == null ? <UserAvatar size="42" name={post.user.username} />: <img
                        src={GET_IMAGE(post.user.personal_photo)}
                        className="giver-avatar"
                    />}
                    
                    <div className='info-post'>
                        <p className='user-name'>{`${post.user.first_name}`}</p>
                    <p className='offer-content post-offer-content'>{post.title}</p>
                        <p className='time-post-offer'>{moment(post.created_at).add(-(new Date().getTimezoneOffset() / 60), 'hours').fromNow()}</p>
                    </div>
                </div>

                <hr className='gap' />
                <div className='comment-list-container' ref={screen}>
                    {renderComment()}
                </div>
                <div className='input-comment-container'>
                   {userInfo.personal_photo == null ?<UserAvatar size="45" name={userInfo.username} className='non-photo-comment'/> :  <img
                         src={GET_IMAGE(userInfo.personal_photo)}
                        className="comment-avatar"
                    />}
                    <div
                        className='input-comment-with-icon'>
                        <button className='button-trans post-comment-button' onClick={clickComment} style={{top: 16, padding:0;}}>
                            <span class="icon-arrow-next" style={{ backgroundColor: '#ddae53', color: 'white', borderRadius: '50%', width: 33, height: 33 }}></span>
                        </button>
                        <textarea
                            style={{ marginTop: 0 }}
                            type='text'
                            cols='3'
                            row='3'
                            placeholder={getMessageTranslate('comment', 'writeAComment')}
                            value={comment}
                            onChange={inputChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = createStructuredSelector({
    userInfo: selectUserInfo()
});


export default connect(mapStateToProps)(PostComment);
