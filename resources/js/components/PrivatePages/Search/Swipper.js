import React, { useState, memo } from "react";
import BottomNavigator from "../../Molecules/BottomNav/BottomNavigator";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import PostItem from "../Home/PostItem";
import Comment from "../HomeComment/PostComment";
import "./HomeScreen.scss";
import "../Home/HomeScreen.scss";
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const Swipper = (props) => {
    const [show, setShow] = useState(false); 
    const [index, setIndex] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [openMessage, setOpenMessage] = useState(false);
    const [user, setUser] = useState({});

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
                style={{ height: openModal? 0:"100vh", display: openModal?"none":"block", position: "absolute",  zIndex: 100000, width: "100%", top: "0px" }}
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

export default memo(Swipper);
