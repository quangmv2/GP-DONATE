import React, { Component, useEffect, useState, memo } from "react";
// import Swiper from "swiper";
import BottomNavigator from "../../Molecules/BottomNav/BottomNavigator";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Modal from './ModalComment';
// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

// CSS
//swiper css must come first
// import "swiper/swiper.scss";
import "./HomeScreen.scss";
import PostItem from "./PostItem";
import {
    selectErrors,
    selectLoading,
    selectPage,
    selectPost
} from "modules/post/selectors";
import { getPosts } from "modules/post/actions";
import { LIMIT_POST, FEATURE_NAME_POST } from "../../../modules/post/constants";
import saga from "modules/post/sagas";
import reducer from "modules/post/reducers";
import injectReducer from "core/reducer/inject-reducer";
import injectSaga from "core/saga/inject-saga";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import Comment from "../HomeComment/PostComment";


const HomePage = (props) => {
    const [show, setShow] = useState(false); 
    const [index, setIndex] = useState(0);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const { fetchMore, page } = props;
        fetchMore(1);
    }, []);

    useEffect(() => {
        handleLoadMore();
        console.log(index);
    }, [index])

    const handleLoadMore = () => {
        const { posts } = props;
        if (posts.length - index < 2 ) {
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

    const { posts } = props;
    const showModal = () => {
        setShow(true);
    };
    const hideModal = () => {
        setShow(false);
    }
    return (
      <> { show ?   <Modal
        className="modal"
        show={show}
      close={hideModal}
        >
    </Modal> : <div 
            style={{
                // backgroundImage: "url('https://images.unsplash.com/photo-1553152531-b98a2fc8d3bf?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb')",
                // backgroundRepeat: "no-repeat",
                // backgroundSize: "cover"
            }}
        >
            {
                openModal?<Comment hideModal={hideModal} post={posts[index]} />:<></>
            }

            <Swiper
            
                direction="vertical"
                // pagination={{ clickable: true }}
                // scrollbar={{ draggable: true }}
                // onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={(swiper) => console.log(swiper)}
                // virtual
                style={{ height: openModal?0:"100vh", display: openModal?"none":"block" }}
                onSlideChangeTransitionEnd={swiper => setIndex(swiper.realIndex)}
            >

                {
                    posts.map(post => 
                        <SwiperSlide key={`post ${post.id} ${post.title}`}>
                            <PostItem {...post} open={showModal}/>    
                        </SwiperSlide>
                    )
                }
            </Swiper>   
            <BottomNavigator />
        </div>}
        </>
    );  
}

const mapDispatchToProps = {
    fetchMore: getPosts
};

const mapStateToProps = createStructuredSelector({
    errors: selectErrors(),
    loading: selectLoading(),
    page: selectPage(),
    posts: selectPost()
});

const withReducer = injectReducer({ key: FEATURE_NAME_POST, reducer });

const withSaga = injectSaga({
    key: FEATURE_NAME_POST,
    saga
});

export default compose(
    withReducer,
    withSaga,
    withRouter
)(connect(mapStateToProps, mapDispatchToProps)(memo(HomePage)));
