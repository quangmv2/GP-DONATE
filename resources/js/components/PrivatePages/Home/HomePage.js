import React, { Component, useEffect } from "react";
import Swiper from "swiper";
import BottomNavigator from "../../Molecules/BottomNav/BottomNavigator";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

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


const HomePage = (props) => {
    useEffect(() => {
        new Swiper(".swiper-container", {
            loop: false,
            direction: "vertical",
            // on: {
            //     slideChangeTransitionEnd: (swiper) => {
            //         console.log(swiper);
            //     }
            // }
        });
        const { fetchMore, page } = props;
        fetchMore(page + 1);
    }, [])

    console.log(props.posts);

    const { posts } = props;

    return (
        <div>
            <Swiper
                spaceBetween={50}
                slidesPerView={3}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                <SwiperSlide>Slide 1</SwiperSlide>
                <SwiperSlide>Slide 2</SwiperSlide>
                <SwiperSlide>Slide 3</SwiperSlide>
                <SwiperSlide>Slide 4</SwiperSlide>
            </Swiper>
            <BottomNavigator />
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
