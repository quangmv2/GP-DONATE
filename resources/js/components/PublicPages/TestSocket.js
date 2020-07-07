import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../context/SocketProvider";
import axios from "axios";

const id_post = 112;
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIyIiwianRpIjoiMTA1NTFhNDM5ZGUwNDBiMDA5OWM2YTU0N2RhMjhkZWUwNmQ0NjY5YzQ2OTMwYzljZDcwMjIyODQwMjAyMzdlODFkOTY2NjlmNGZhZDllZDYiLCJpYXQiOjE1OTQwOTMwMjQsIm5iZiI6MTU5NDA5MzAyNCwiZXhwIjoxNTk0MzUyMjI0LCJzdWIiOiIyIiwic2NvcGVzIjpbIioiXX0.v50S4LF__rJ2aEaFF9izgaHCR4cWIhklTw32hsMSEP8LymbVhRbDjbzjTsOMjgwR2b9utuCoQrH_JWbri-MF5CPq1g9zC1FzCvCcGCAqDVR0-zYN3K5nIYKWpEU50sbf2duZxoZDMftkIu9ijgPCk3i70qXOI5VNY-DARA-lUk7wX2C8BiHGSTuVcMIV3N3IdEjzQR45VYsgEVvdwsGmwkS6bEbejCJwEAaMFrKYEjUNbrq45VtjTDT9q29LxAXcJ5WCXSyD07zvbCfoYUjCCHAaTL17m5w8S1vx_pF4BKeLJsbnORMFM0KHjgKsD1NfEXVolM_RFKK9wVAC-qaFFc2r9aemvleE5a2pYifd9DdeC-8iMaUCh359tZWwBWmDftv578jUapxyCfk9ivAd7UU25FCa4cxUcIeJV5lyNeUI5bJDEoseI6Gk_Ze0eCcmDVOORPZvlZ_VR11b3X-rDeYW1gnNYXYSeE-CKokAobeypQNMlYs4JwYGXytqFmkOTYCqpFt42fEp_HjCr1AU3Wh17DEcJ-mznbOiFp5atBHcUagyRqd4mLvM1SyLUbt1gWZmtxgV-OePIVAL4Rbu0cmNhiihTm5qEb8poCC93PLbXEUxiE8RdkGbZeq0e4XKF5XjV3FUQecMCJ1vh5mAUwOzdt8Y7fzK-okSqYekm3w';

const TestSocket = () => {

    const [data, setData] = useState(null);
    const [comments, setComments] = useState([]);
    const [comment, setComment] = useState('');
    const { socket } = useContext(SocketContext);

    useEffect(() => {
        fetchFirstData();
    }, []);

    const fetchFirstData = async () => {
        const post = await fetchPost(id_post);
        
        const comments = await fetchComments(post.id);
        console.log(post, comments);
        socket.emit('watch-post', post);
        socket.on(`new-comment`, data => {
            console.log(data);
            setComments(cmts => {
                if (cmts.find(({id}) => id === data.id)) return cmts;
                const newCmts = [...cmts];
                newCmts.push(data);
                return newCmts;
            })
        });
        socket.on('delete-comment', data => {
            console.log(data);
            
            setComments(cmts => {
                const newCmts = [...cmts];
                return newCmts.filter(({id}) => {
                    console.log(id !== data.id);
                    return id !== data.id;
                });
            })
        })
    }

    const fetchPost = async (id) => {
        try {
            const post = await axios.get(`http://donate/api/posts/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': '*'
                }
            });
            setData(post.data);
            return post.data;
        } catch (error) {
            
        }
    }

    const fetchComments = async (id) => {
        try {
            const comments = await axios.get(`http://donate/api/posts/${id}/comments`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setComments(comments.data);
            return comments.data;
        } catch (error) {
            console.log(err);
            
        }
    } 

    const inputChange = (e) => {
        setComment(e.target.value);        
    }

    const clickComment = async () => {
        const resComment = await axios({
            baseURL: 'http://donate/api/comment',
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            data: {
                post_id: data.id,
                content: comment
            }
        })
        console.log(resComment);
        
        setComments(cmts => {
            const newCmts = [...cmts];
            newCmts.push(resComment.data);
            return newCmts;
        });
        setComment('');
    }

    if (!data) return (<div><span>Loaing...</span></div>);

    return (
        <div className="container ">
            <div className="ant-col-lg-24">
                <div className="full-height-screen flex-center" style={{flexDirection: "column"}}>
                    <h1>{data.title}</h1>
                    <p>{data.content}</p>
                    <img src={`http://donate/api/posts/photo?dir=${data.photo_thumbnail}`} style={{width: "70%"}} />
                    {
                        comments?comments.map(comment => {
                            return (
                                <p key={`comment${comment.id}`}>{`@${comment.user.username}: ${comment.content}`}</p>
                            )
                        }):<p>Loading...</p>
                    }
                    <div>
                        <input placeholder="Input comment" onChange={inputChange} value={comment} />
                        <button onClick={clickComment}>Comment</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestSocket;
