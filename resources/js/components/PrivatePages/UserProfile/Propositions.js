import React, { useEffect, useState, useCallback } from "react";

import { HeaderNavigation, LinkItem } from "components/Atoms";
import "./PostLike.scss";
import Posts from "../../Molecules/Post";
import { GET_IMAGE, GET_MY_POST } from "../../../constants";
import moment from "moment";
import { fetchService } from "services";
import Swipper from "../Search/Swipper";
import { selectUserInfo } from "modules/auth/selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

const PostLike = props => {
    const { userInfo } = props;
    const [dataPost, setDataPost] = useState([]);
    const [openSwipper, setOpenSwipper] = useState(false);
    const [indexSwiper, setIndexSwiper] = useState(0);


    useEffect(() => {
        searchPost();
    }, [dataPost]);

    const searchPost = useCallback(async key => {
        const [data, status] = await fetchService.fetch(GET_MY_POST(props.username), {
            method: "GET"
        });
        if (status == 200) {
            setDataPost(data.data);
        }
    }, []);

    const showSwipper = id => {
        setOpenSwipper(true);
        setIndexSwiper(id);
    }

    return (
        <div className="private-fullheight pop-up">
            {
                openSwipper && <Swipper posts={dataPost} index={indexSwiper} closeSwipper={() => setOpenSwipper(false)} />
            }
            <div className="container">
                <HeaderNavigation headerName="Proposition" handleBack={props.closeWindow} />
                <div className="body-wrapper post-like-wrapper">
                    <div className="info-content">
                        {
                            dataPost.map((post, index) => (
                                <Posts
                                    userInfo = {userInfo}
                                    keyEle={`post search ${post.id} ${post.title}`}
                                    key={`post search ${post.id} ${post.title}`}
                                    className="info-list"
                                    url="#"
                                    img={GET_IMAGE(post.photo_thumbnail)}
                                    likeNumber={post.totalLike}
                                    title={
                                        post.title
                                    }
                                    postId = {post.id}
                                    description="10k packs of medical masks"
                                    duedate={post.due_day}
                                    author={{
                                        username: `${post.user.first_name}`,
                                        avatar: post.user.personal_photo,
                                        id: post.user.id
                                    }}
                                    createTime={moment(post.created_at).format("YYYY-MM-DD")}
                                    onClick={showSwipper}
                                    index={index}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = createStructuredSelector({
    userInfo: selectUserInfo()
});
export default connect(mapStateToProps)(PostLike);
