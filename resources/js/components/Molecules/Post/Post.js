import React, { useState, memo } from "react";
import { Link } from "react-router-dom";
import Proptypes from "prop-types";
import { FormattedMessage } from "react-intl";
import "./Post.scss";
import { GET_IMAGE, DELETE_POST } from "../../../constants/routes";
import UserAvatar from "react-user-avatar";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { fetchService } from "services";
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import { StarFilled } from "@ant-design/icons";
const Post = ({
    img,
    title,
    className,
    description,
    duedate,
    author,
    likeNumber,
    keyEle,
    onClick,
    index,
    commented,
    userInfo,
    postId,
    isCeleb
}) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = (e) => {
        e.preventDefault();
        setOpen(!open);
    }

    const handleDelete = async () => {
        const [status] = await fetchService.fetch(DELETE_POST(postId), {
            method: "DELETE"
        });
    }
    return (
        <div 
            className={className ?? ""} 
            key={keyEle} 
            onClick={(e) => {

                if(!(e.target.id === "buttonRemove" || e.target.id === "buttonSvg" || open)){
                    onClick(index,e)
                }

                if(open){
                    setOpen(false);
                }
                
            }}
        >
            <div className="post-wrapper">
                <div className="post-image">
                    <img src={img} className="img-content" />
                    <button id="buttonRemove" className='button-trans button-remove' onClick={handleClickOpen} style={{ display: userInfo.id !== author.id ? 'none' : '' }}>
                        {userInfo.id == author.id ? <MoreHorizIcon className='more-icon' id="buttonSvg" /> : null}
                    </button>
                    {open ? <button className='del-button' onClick={handleDelete}><DeleteOutlineOutlinedIcon /> <p>DELETE</p> </button> : null}
                    <div className="wrapper-icon">
                        <button className="icon-button">
                            {commented ? <i className="icon-comment-normal" /> : <i className="icon-comment-active" />}
                        </button>
                        <button className="icon-button">
                            <i className="icon-like-active" />
                            <span>{likeNumber}</span>
                        </button>
                    </div>
                </div>
                <div className="post-info-wrapper">
                    <h2>{title}</h2>
                    <div className="icon-line">
                        <i className="icon-goods icon" onClick={() => null} />
                        <label>{description}</label>
                    </div>
                    <div className="icon-line">
                        <i className="icon-calendar-complete icon" />
                        <label className="content-icon">{duedate}</label>
                    </div>
                    <div className="author-create">
                        <div className="author-image" >
                            {
                                author.isCeleb ? <StarFilled className="icon-star" style={{ fontSize: "15px" }} /> : <></>
                            }
                            {
                                author.avatar ? <img src={GET_IMAGE(author.avatar)} className="img-user" /> :
                                    <UserAvatar size="42" name={`${author.username}`} />
                            }
                        </div>
                        <div className="post-create">
                            <h3>{author.username}</h3>
                            <span>{duedate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
Post.propTypes = {
    url: Proptypes.string.isRequired,
    title: Proptypes.string.isRequired,
    showBadgeCount: Proptypes.bool,
    badeValue: Proptypes.number
};

Post.defaultProps = {
    showBadgeCount: false,
    badeValue: 0
};


export default memo(Post);
