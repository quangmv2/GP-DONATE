import React, { Component, useEffect, useState, memo } from "react";
// import Swiper from "swiper";
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
import { LIMIT_POST, FEATURE_NAME_POST } from "../../../modules/post/constants";
import saga from "modules/post/sagas";
import reducer from "modules/post/reducers";
import injectReducer from "core/reducer/inject-reducer";
import injectSaga from "core/saga/inject-saga";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";



const HomePage = (props) => {
    
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const { fetchMore, page } = props;
        fetchMore(1);
    }, []);

    useEffect(() => {
        handleLoadMore();
    }, [index])

    const handleLoadMore = () => {
        const { posts } = props;
        if (posts.length - index < 2 ) {
            const { fetchMore, page } = props;
            fetchMore(page + 1);
        }
    }

    const { posts } = props;

    return (
        <div 
            style={{
                // backgroundImage: "url('https://images.unsplash.com/photo-1553152531-b98a2fc8d3bf?ixlib=rb-1.2.1&q=85&fm=jpg&crop=entropy&cs=srgb')",
                // backgroundRepeat: "no-repeat",
                // backgroundSize: "cover"
            }}
        >
            <Swiper
            
                direction="vertical"
                // pagination={{ clickable: true }}
                // scrollbar={{ draggable: true }}
                // onSwiper={(swiper) => console.log(swiper)}
                // onSlideChange={(swiper) => console.log(swiper)}
                // virtual
                onSlideChangeTransitionEnd={swiper => setIndex(swiper.realIndex)}
            >

                {
                    posts.map(post => 
                        <SwiperSlide key={`post ${post.id} ${post.title}`}>
                            <PostItem {...post} />    
                        </SwiperSlide>
                    )
                }
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
