import React, { useEffect, useState, memo, useContext } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import PostItem from "./PostItem";
import {
    selectErrors,
    selectLoading,
    selectPage,
    selectPost
} from "modules/post/selectors";
import { getPosts } from "modules/post/actions";
import { FEATURE_NAME_POST } from "../../../modules/post/constants";
import saga from "modules/post/sagas";
import reducer from "modules/post/reducers";
import injectReducer from "core/reducer/inject-reducer";
import injectSaga from "core/saga/inject-saga";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import Comment from "../HomeComment/PostComment";
import {
    selectUserInfo
} from "modules/auth/selectors";
import Loading from "../../Atoms/Loading/Loading";
import { NavigatorContext } from "../../../context/BottomNavigatorContextAPI";
import MessagesDetail from "../Activities/MessageDetail/MessagesDetail";
import "./HomeScreen.scss";
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import { setInit } from "../../../modules/post/actions";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const HomePage = (props) => {
    const [show, setShow] = useState(false);
    const [index, setIndex] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [openMessage, setOpenMessage] = useState(false);
    const [user, setUser] = useState({});
    const [loadingFirst, setLoadingFrist] = useState(true);
    const [height, setHeight] = useState(window.innerHeight);
    const { setShowNavigator } = useContext(NavigatorContext);

    useEffect(() => {
        setShowNavigator(true);
        window.addEventListener('resize', resizeHeight);
        return () => {
                props.initPost();
                window.removeEventListener('resize', resizeHeight);
        }
    }, []);

    useEffect(() => {
        const { fetchMore, userInfo } = props;
        if (!userInfo || !userInfo.id) return;
        fetchMore(1);
    }, [props.userInfo]);

    useEffect(() => {
        if (index == 0) return;
        handleLoadMore();
    }, [index]);

    useEffect(() => {
        if (props.posts.length > 0 && props.loading) setLoadingFrist(false);
    }, [props.posts, props.loading])

    const resizeHeight = (e) => {
        console.log(window.innerHeight, e.target.outerHeight);
        setHeight(e.target.outerHeight);
    }

    const handleLoadMore = () => {
        const { posts } = props;
        if (posts.length - index < 2) {
            const { fetchMore, page } = props;
            fetchMore(page + 1);
        }
    }

    const showModal = () => {
        setOpenModal(true);
    }

    const hideModal = () => {
        setOpenModal(false);
    }

    const setUserMessage = userMessage => {
        setUser(userMessage);
        setOpenMessage(true);
        setOpenModal(false);
    }

    const { posts, loading } = props;

    return (
        <>
            {
                loading && posts.length < 1 ? <Loading /> : <></>
            }
            <div style={{ display: loading && posts.length < 1 ?"none": "block" }}>
                {openModal && <Comment hideModal={hideModal} post={posts[index]} />}
                {openMessage && <MessagesDetail data={user} closeWindow={() => setOpenMessage(false)} />}
                <Swiper
                    direction="vertical"
                    style={{ height: openModal ? 0 : ( window.innerWidth > 1020 ? "90vh" : `${height}px` ), display: openModal ? "none" : "block" }}
                    // className={openModal?"hidden-swipper custom-swipper-web":"custom-swipper-web"}
                    onSlideChangeTransitionEnd={swiper => setIndex(swiper.realIndex)}
                    onSliderMove={sw => null}
                >
                    {posts.map(post =>
                        <SwiperSlide key={`post ${post.id} ${post.title}`}>
                            <PostItem {...post} showModal={showModal} hideModal={hideModal} setUserMessage={setUserMessage} />
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        </>
    );
}

const mapDispatchToProps = {
    fetchMore: getPosts,
    initPost: setInit
};

const mapStateToProps = createStructuredSelector({
    errors: selectErrors(),
    loading: selectLoading(),
    page: selectPage(),
    posts: selectPost(),
    userInfo: selectUserInfo()
});

const withReducer = injectReducer({ key: FEATURE_NAME_POST, reducer });

const withSaga = injectSaga({
    key: FEATURE_NAME_POST,
    saga
});

export default compose(
    withReducer,
    withSaga,
)(connect(mapStateToProps, mapDispatchToProps)(HomePage));
