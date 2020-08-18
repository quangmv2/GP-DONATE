import React, { useEffect, useState, useCallback, useContext } from "react";

import { HeaderNavigation } from "components/Atoms";
import "./PostLike.scss";
import Posts from "../../Molecules/Post";
import { GET_IMAGE, GET_MY_LIKE, ROUTE, GET_PROPOSITIONS } from "../../../constants";
import moment from "moment";
import { fetchService } from "services";
import Swipper from "../Search/Swipper";
import { selectUserInfo } from "modules/auth/selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect"
import { NavigatorContext } from "../../../context/BottomNavigatorContextAPI";
import { useLocation } from "react-router-dom";
const PostLike = props => {

    const [dataPost, setDataPost] = useState([]);
    const [openSwipper, setOpenSwipper] = useState(false);
    const [indexSwiper, setIndexSwiper] = useState(0);
    const { setShowNavigator } = useContext(NavigatorContext);
    const location = useLocation();
    const { userInfo } = props;

    useEffect(() => {
        setShowNavigator(false);
        searchPost();
    }, []);

    // useEffect(() => {
    //     searchPost();
    // }, [dataPost]);

    const searchPost = useCallback(async key => {
        const [data, status] = await fetchService.fetch(location.pathname == ROUTE.MYLIKES?GET_MY_LIKE():GET_PROPOSITIONS("me"), {
            method: "GET"
        });
        if (status == 200) {
            location.pathname == ROUTE.MYLIKES ? setDataPost(data.map(tmp => tmp.post)) : setDataPost(data.data) ;
        }
    }, [location.pathname]);

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
                <HeaderNavigation headerName={location.pathname == ROUTE.MYLIKES?"Projects you have liked":"My projects"} />
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
