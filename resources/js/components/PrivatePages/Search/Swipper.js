import React, { useEffect, useState, memo } from "react";
// import Swiper from "swiper";
import BottomNavigator from "../../Molecules/BottomNav/BottomNavigator";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// install Swiper components
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

// CSS
import "./HomeScreen.scss";
import PostItem from "../Home/PostItem";

import Comment from "../HomeComment/PostComment";

// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import MessagesDetail from "../Activities/MessageDetail/MessagesDetail";

const Swipper = (props) => {
    const [show, setShow] = useState(false); 
    const [index, setIndex] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [openMessage, setOpenMessage] = useState(false);
    const [user, setUser] = useState({});

    // useEffect(() => {
    //     const { fetchMore } = props;
    //     fetchMore(1);
    // }, []);

    // useEffect(() => {
    //     if (index == 0) return ;
    //     handleLoadMore();
    // }, [index])

    // const handleLoadMore = () => {
    //     const { posts } = props;
    //     if (posts.length - index < 2 ) {
    //         const { fetchMore, page } = props;
    //         fetchMore(page + 1);
    //     }
    // }

    const showModal = () => {
        setOpenModal(true);
    }

    const hideModal = () => {
        setOpenModal(false);
    }

    const { posts } = props;
    return (
        <div>
            {openModal && <Comment hideModal={hideModal} post={posts[index]} />}
            <Swiper
                direction="vertical"
                // virtual
                style={{ height: openModal?0:"100vh", display: openModal?"none":"block", position: "absolute",  zIndex: 100000, width: "100%" }}
                // onSlideChangeTransitionEnd={swiper => setIndex(swiper.realIndex)}
                initialSlide={props.index?props.index:0}
            >

              {posts && posts.map(post => 
                <SwiperSlide key={`post ${post.id} ${post.title}`}>
                  <PostItem {...post} showModal={showModal} hideModal={hideModal}  onCloseWindow={props.closeSwipper} />    
                </SwiperSlide>
              )}
            </Swiper>   
            <BottomNavigator />
        </div>
    
    );  
}

export default (Swipper);
