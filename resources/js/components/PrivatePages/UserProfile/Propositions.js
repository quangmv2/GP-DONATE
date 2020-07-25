import React, { useEffect, useState, useCallback } from "react";

import { HeaderNavigation, LinkItem } from "components/Atoms";
import "./PostLike.scss";
import Posts from "../../Molecules/Post";
import { GET_IMAGE, GET_MY_POST } from "../../../constants";
import moment from "moment";
import { fetchService } from "services";

const PostLike = props => {

    const [dataPost, setDataPost] = useState([]);

    useEffect(() => {
        searchPost();
    }, []); 

    const searchPost = useCallback(async key => {
        const [data, status] = await fetchService.fetch(GET_MY_POST(props.username), {
            method: "GET"
        });
        if (status == 200) {
            setDataPost(data.data);
        }
    }, []);

    return (
        <div className="private-fullheight pop-up">
            <div className="container">
                <HeaderNavigation headerName="Proposition"  handleBack={props.closeWindow}/>
                <div className="body-wrapper post-like-wrapper">
                    <div className="info-content">
                        {
                            dataPost.map(post => (
                                <Posts
                                    key={`post search ${post.id} ${post.title}`}
                                    className="info-list"
                                    url="#"
                                    img={GET_IMAGE(post.photo_thumbnail)}
                                    likeNumber={post.totalLike}
                                    title={
                                        post.title
                                    }
                                    description="10k packs of medical masks"
                                    duedate={post.due_day}
                                    author={{
                                        username: `${post.user.first_name} ${post.user.last_name}`,
                                        avatar: post.user.personal_photo
                                    }}
                                    createTime={moment(post.created_at).format("YYYY-MM-DD")}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}

export default (PostLike);
