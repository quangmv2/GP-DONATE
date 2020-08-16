import React, { useEffect, useState, useCallback, useContext } from "react";

import { HeaderNavigation, LinkItem } from "components/Atoms";
import "./PostLike.scss";
import Posts from "../../Molecules/Post";
import { GET_IMAGE, GET_MY_LIKE } from "../../../constants";
import moment from "moment";
import { fetchService } from "services";
import BottomNavigator from "../../Molecules/BottomNav/BottomNavigator";
import Swipper from "../Search/Swipper";
import { selectUserInfo } from "modules/auth/selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect"
import { NavigatorContext } from "../../../context/BottomNavigatorContextAPI";
const PostLike = props => {
    const { userInfo } = props;
    const [dataPost, setDataPost] = useState([]);
    const [openSwipper, setOpenSwipper] = useState(false);
    const [indexSwiper, setIndexSwiper] = useState(0);
    const { setShowNavigator } = useContext(NavigatorContext);

    useEffect(() => {
        setShowNavigator(false);
    }, []);

    useEffect(() => {
        searchPost();
    }, [dataPost]);

    const searchPost = useCallback(async key => {
        const [data, status] = await fetchService.fetch(GET_MY_LIKE(), {
            method: "GET"
        });
        if (status == 200) {
            setDataPost(data.map(tmp => tmp.post));
        }
    }, []);

    const showSwipper = id => {
        setOpenSwipper(true);
        setIndexSwiper(id);
    }

    return (
        <div className="private-fullheight">
            {
                openSwipper && <Swipper posts={dataPost} index={indexSwiper} closeSwipper={() => setOpenSwipper(false)} />
            }
            <div className="container">
                <HeaderNavigation headerName="Projects you have liked" />
                <div className="body-wrapper post-like-wrapper">
                    <div className="info-content">
                        {
                            dataPost.map((post, index) => (
                                <Posts
                                    userInfo={userInfo}
                                    key={`post search ${post.id} ${post.title}`}
                                    className="info-list"
                                    url="#"
                                    img={GET_IMAGE(post.photo_thumbnail)}
                                    likeNumber={post.totalLike}
                                    title={
                                        post.title
                                    }
                                    postId={post.id}
                                    description="10k packs of medical masks"
                                    duedate={post.due_day}
                                    author={{
                                        username: `${post.user.first_name}`,
                                        avatar: post.user.personal_photo,
                                        id: post.user.id,
                                        isCeleb: post.user.code_id?true:false
                                    }}
                                    createTime={moment(post.created_at).format("YYYY-MM-DD")}
                                    onClick={showSwipper}
                                    index={index}
                                    commented={post.commented}
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
