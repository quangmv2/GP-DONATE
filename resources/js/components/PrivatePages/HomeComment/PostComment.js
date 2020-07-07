import React, { Component } from "react";
import { HeaderNavigation } from 'components/Atoms';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './HomeComment.scss';
import Data from './Yumny-data';
import { Link } from 'react-router-dom';
import TextField from '@material-ui/core/TextField';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ArrowForwardOutlinedIcon from '@material-ui/icons/ArrowForwardOutlined';
import Grid from '@material-ui/core/Grid';
export class PostComment extends Component {
    renderComment() {
        return _.map(Data, ({ username, content }) => {
            return (
                <div className='home-comment-container'>
                <div className='content-container'>
                <img
                    src={"./images/Bitmap.png"}
                    className="giver-avatar"
                />
                <div className='info-post'>
            <p className='user-name'>{username}</p>
            <p className='offer-content comment-body-conatiner'>{content}</p>
            <div className='time-post-container'>
                <p className='time-post-offer'>4h ago</p>
                <p className='time-post-offer'>2 likes</p>
                <button className='reply'>Reply</button>
                </div>
                </div>
                </div>
                <button className='button-trans'>
                <FavoriteBorderIcon style={{marginTop: '28px'}} />
                </button>
            </div>

            );
          });
        }
    
    render() {
        return (
            <div className="private-fullheight">
                <div className="container">
                    <HeaderNavigation headerName="Raise Your Voice">
                        <button className='button-trans'>
                        <MoreVertIcon />
                        </button>
                    </HeaderNavigation>
                    <div className='content-container post-info-container'>
                        <img
                            src={"./images/Bitmap.png"}
                            className="giver-avatar"
                        />
                        <div className='info-post'>
                        <p className='user-name'>Alina Baikova</p>
                        <p className='offer-content post-offer-content'>I am offering my support to all schools in Africa. Ping me!</p>
                        <p className='time-post-offer'>4h ago</p>
                        </div>
                    </div>
                   
                    <hr className='gap'/>
                    <div className='comment-list-container'>
                    {this.renderComment()}
                    </div>
                    <div className='input-comment-container'>
                    <img
                            src={"./images/Bitmap.png"}
                            className="comment-avatar"
                        />
                    <div 
                    className='input-comment-with-icon'>
                        <button className='button-trans post-comment-button'>
                        <ArrowForwardOutlinedIcon style={{backgroundColor: '#ddae53', color: 'white', borderRadius: '50%'}}/>
                        </button>
                    <textarea
                    type='text'
                    cols='3'
                    row='3'
                    placeholder='Write a comment...'
                     />
                    </div>
</div>
                </div>
            </div>
        );
    }
}

export default PostComment;
