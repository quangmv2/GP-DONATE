import React, { Component, useState, useContext, useEffect, useRef } from "react";
import { HeaderNavigation } from 'components/Atoms';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './HomeComment.scss';
import Data from './Yumny-data';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import Grid from '@material-ui/core/Grid';
import { SocketContext } from "../../../context/SocketProvider";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en';
import CloseIcon from '@material-ui/icons/Close';
const id_post = 1;
const tokenGV = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiMTA1NTFhNDM5ZGUwNDBiMDA5OWM2YTU0N2RhMjhkZWUwNmQ0NjY5YzQ2OTMwYzljZDcwMjIyODQwMjAyMzdlODFkOTY2NjlmNGZhZDllZDYiLCJpYXQiOjE1OTQwOTMwMjQsIm5iZiI6MTU5NDA5MzAyNCwiZXhwIjoxNTk0MzUyMjI0LCJzdWIiOiIyIiwic2NvcGVzIjpbIioiXX0.v50S4LF__rJ2aEaFF9izgaHCR4cWIhklTw32hsMSEP8LymbVhRbDjbzjTsOMjgwR2b9utuCoQrH_JWbri-MF5CPq1g9zC1FzCvCcGCAqDVR0-zYN3K5nIYKWpEU50sbf2duZxoZDMftkIu9ijgPCk3i70qXOI5VNY-DARA-lUk7wX2C8BiHGSTuVcMIV3N3IdEjzQR45VYsgEVvdwsGmwkS6bEbejCJwEAaMFrKYEjUNbrq45VtjTDT9q29LxAXcJ5WCXSyD07zvbCfoYUjCCHAaTL17m5w8S1vx_pF4BKeLJsbnORMFM0KHjgKsD1NfEXVolM_RFKK9wVAC-qaFFc2r9aemvleE5a2pYifd9DdeC-8iMaUCh359tZWwBWmDftv578jUapxyCfk9ivAd7UU25FCa4cxUcIeJV5lyNeUI5bJDEoseI6Gk_Ze0eCcmDVOORPZvlZ_VR11b3X-rDeYW1gnNYXYSeE-CKokAobeypQNMlYs4JwYGXytqFmkOTYCqpFt42fEp_HjCr1AU3Wh17DEcJ-mznbOiFp5atBHcUagyRqd4mLvM1SyLUbt1gWZmtxgV-OePIVAL4Rbu0cmNhiihTm5qEb8poCC93PLbXEUxiE8RdkGbZeq0e4XKF5XjV3FUQecMCJ1vh5mAUwOzdt8Y7fzK-okSqYekm3w';
const tokenAD = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiNTc5NDdkMTJiZWViN2FlYWZhYWRiNTEyOTczMDgzMWJlZGUyYjFmZmM5YjJmMGQyODQ2NjIwZWQ0NTU4MDc1Nzg4NDk3MjM0ZDQ1ZDUyZjAiLCJpYXQiOjE1OTQxMTE2NTQsIm5iZiI6MTU5NDExMTY1NCwiZXhwIjoxNTk0MzcwODU0LCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.jtRTsPCSdNTXcL3JphnsILlpNgku1QEjypsvt-m5u_UMbXeTiVllK1j6xWCuqKDhu_L3a4zRAZRv9nI3aZTzTPiTxpLeZiJVPVynU-FpJdFQGulRt81CRFK__W1gBci3Teob4c_zVGeBxztElen9eJyYGZriThZze1RmX-oDAgghGrMjyorKVcdDRY4s9DKiWCO_zmDLb_cuM3fmHi626gZlGfAWN0fSm2wCvd7269DWXWRU53LCSt35qUIfeHCzDH1DHi3nBgjW9D7KrL1IvUwwpX5RLdH0bTmIaFWVFGIBqczuBa4pGaP3VwaPcbiIeExHnDHyBLZWtmOypPMJ1eRgmAfURa8XktYUQYrVtZ7X215kPD3n86DUiZwCldjWFBMqGHLHC4QDEXKhRhki_BA0PQesIyc-oTiSSJOR7iTL93qXVQrAB6WwhCV-bbJZmdHS2ujYSDKqlBQLcBqUWneTdUQQeKdj2tYlHYJDtxbFi861fHE1mQB_ODMXmx6YdF8ImUGG7SrUg2GzM64UXy-sUIvBfhzSAJnPMkaGoFGxJ8FOyVcmsgZS5WE5LptkQ5SRhhH70dUbFfH6QPjpWAuK2brWlSBQVbZ5hz_hKwtWncp13gYGkGGQam5UWjxA5wuXOY8C6MZH03NVmrpN82qeb8Xe4vSrLBmDj9Kw9fc';
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiN2MzM2I1OTAyMWNkZjQwNjUzNmVlODI1M2U0NDQ3NzczOWIzZWY3MDY3NGFiYzVhNzdiZjc2MTQzNTAyYjYxYzQyZGNkZjdlNGMxZmU4ZDMiLCJpYXQiOjE1OTQyMDUwMjMsIm5iZiI6MTU5NDIwNTAyMywiZXhwIjoxNTk0NDY0MjIzLCJzdWIiOiIxIiwic2NvcGVzIjpbIioiXX0.uiA1usVjQsqzIW4VTHLfRhB0MRm98IS5ju-kAF19N4uCAbcD1VW27xR1Dd2v7LSvY1DyUqpoP67o-yKVSEKYMG4sKh-yFQs94aUEx0n7JpFcSwVSoVk1cjjQtQPagF4lLGHWlxYIZdmT_GtJXv1ZZc6JI0Uu5GgxWiwNSDuk4CwBVYhH7drwdZJDptJ5W7q4GVEKt4yvIe5L_oEmjDs_JL59Ygnmo4T42eIcdYmj5MMccJjzGygECt-VQ-NdBvKPbinWHNuVsnIML-huh4je_F4vOwwgBS_wbuH2ktBRqeC_ybAGqULsdL6UEvxbaes7rlLkvAe8y8JCYUuBmUyDadTwDjiJX-e-jKV0Zo3-z7EM-gjWyzyWmFGDo9UYo4uwK7ozSJOYlsZfszJs8W3LInAqWbmKqBlUxD_OlQ4Mmf_eTEHIfSMehcnrA5ZJgwplYfwzhlyt1FcfGASIg1jL8L_-3vuvb4Y1yeEgk_PbYJ8sJ-XosagUNuR4XxN13WAF2N_TxV6hfhH009D7uO4pzcQIFEAJEIITnjENm00KcQBM4FDnooxNlUiEn7rf8X3QRboR6XnqZE92kPQkwAngKrMOlUIOc56ML_pjGWl2LFuk4se39HhDfkuBe1D_CedP69UgRruUOUd4f-uuO9Ws6IfaKNhe1dpbwnnboARSdd4';

TimeAgo.addLocale(en)
const timeAgo = new TimeAgo('en-US')
const UTC = ((new Date()).getUTCDate() - 2)*60*60*1000;

const PostComment = (props) => {
    const [data, setData] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const { socket } = useContext(SocketContext);
    const screen = useRef(null);

    useEffect(() => {
        fetchFirstData();
    }, []);

    useEffect(() => {
        // window.screenTop = 10000;
        screen.current.scrollTop = 5000;
    }, [comments]);

    const { post } = props;

    const fetchFirstData = async () => {
        const comments = await fetchComments(post.id);
        window.scrollTo(0,document.body.scrollHeight);
        socket.emit('watch-post', { id: post.id });
        socket.on(`new-comment`, data => {
            setComments(cmts => {
                if (cmts.find(({ id }) => id === data.id)) return cmts;
                const newCmts = [...cmts];
                newCmts.push(data);
                return newCmts;
            });
            window.scrollTo(0,document.body.scrollHeight);
        });
        socket.on('delete-comment', data => {
            setComments(cmts => {
                const newCmts = [...cmts];
                return newCmts.filter(({ id }) => id !== data.id);
            })
        })
    }

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
            console.log(resComment);
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
        return _.map(comments, ({ user: {username}, content, created_at }, index) => {
            return (
                <div className='home-comment-container' key={`comment${index}`}>
                    <div className='content-container'>
                        <img
                            src={"./images/avatar/_0008_Alina Baikova.jpg"}
                            className="giver-avatar"
                        />
                        <div className='info-post'>
                            <p className='user-name'>@{username}</p>
                            <p className='offer-content comment-body-conatiner'>{content}</p>
                            <div className='time-post-container'>
                            <p className='time-post-offer'>{moment(created_at).add(-(new Date().getTimezoneOffset() / 60), 'hours').fromNow()}</p>
                                <p className='time-post-offer'>2 likes</p>
                                <button className='reply'>Reply</button>
                            </div>
                        </div>
                    </div>
                    <button className='button-trans'>
                        <FavoriteBorderIcon style={{ marginTop: '28px' }} />
                    </button>
                </div>

            );
        });
    }

    return (
        <div className="private-fullheight">
            <div className="container">
                <HeaderNavigation headerName={data?data.title:'Loading...'}>
                    <button className='button-trans' onClick={props.onCloseModal}>
                        <CloseIcon />
                    </button>
                </HeaderNavigation>
                <div className='content-container post-info-container'>
                    <img
                        src={"./images/avatar/_0008_Alina Baikova.jpg"}
                        className="giver-avatar"
                    />
                    <div className='info-post'>
                        <p className='user-name'>{`${post.user.first_name} ${post.user.last_name}`}</p>
                    <p className='offer-content post-offer-content'>{post.title}</p>
                        <p className='time-post-offer'>{moment(post.created_at).add(-(new Date().getTimezoneOffset() / 60), 'hours').fromNow()}</p>
                    </div>
                </div>

                <hr className='gap' />
                <div className='comment-list-container'>
                    {renderComment()}
                </div>
                <div className='input-comment-container'>
                    <img
                        src={"./images/avatar/_0010_user.jpg"}
                        className="comment-avatar"
                    />
                    <div
                        className='input-comment-with-icon'>
                        <button className='button-trans post-comment-button' onClick={clickComment} style={{top: "20px"}}>
                            <ArrowForwardOutlinedIcon style={{ backgroundColor: '#ddae53', color: 'white', borderRadius: '50%' }} />
                        </button>
                        <textarea
                            style={{ marginTop: 0 }}
                            type='text'
                            cols='3'
                            row='3'
                            placeholder='Write a comment...'
                            value={comment}
                            onChange={inputChange}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostComment;
