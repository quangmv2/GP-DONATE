import React, { memo, useState, useEffect, useCallback, useContext } from "react";
import { HeaderNavigation, SearchInput } from "components/Atoms";
import Posts from "../../Molecules/Post";
import { Tabs } from "antd";
import { Patron } from "components/Molecules";
import { fetchService } from "services";
import { SEARCH_POST, GET_IMAGE, SEARCH_PEOPLE } from "../../../constants/routes";
import moment from "moment";
import Swipper from "./Swipper";
import { selectUserInfo } from "modules/auth/selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import "./Search.scss";
import "antd/dist/antd.css";
import "../Activities/MessagesComponent/Mess.scss";
import { NavigatorContext } from "../../../context/BottomNavigatorContextAPI";

const { TabPane } = Tabs;


let idTimeOut = 0;
let delay = Date.now();
const Search = props => {
    const { userInfo } = props;
    const [keyWord, setKeyWord] = useState('');
    const [dataPost, setDataPost] = useState([]);
    const [dataPeople, setDataPeople] = useState([]);
    const [active, setActive] = useState(0);
    const [openSwipper, setOpenSwipper] = useState(false);
    const [indexSwiper, setIndexSwiper] = useState(0);
    const { setShowNavigator } = useContext(NavigatorContext);


    useEffect(() => {
        searchPost(keyWord);
        setShowNavigator(true);
    }, []);

    useEffect(() => {
        const now = Date.now();
        if (now - delay < 200) {
            clearTimeout(idTimeOut);
        }
        idTimeOut = setTimeout(() => {
            if (active==2) searchPost(keyWord);
                else searchPeople(keyWord);
        }, 200);
        delay = now;
    }, [keyWord]);

    const searchPost = useCallback(async key => {
        const [data, status] = await fetchService.fetch(SEARCH_POST(key), {
            method: "GET"
        });
        if (status == 200) {
            setDataPost(data.data);
        }
    }, []);

    const searchPeople = useCallback(async key => {
        const [data, status] = await fetchService.fetch(SEARCH_PEOPLE(key), {
            method: "GET"
        });
        if (status == 200) {
            data.sort((a, b) => b.friend?1:-1);
            setDataPeople(data.map(user => ({
                id: user.id,
                username: `${user.first_name}`,
                content: `@${user.username}`,
                avatar: user.personal_photo,
                isFriend: user.friend?true:false
            })));
        }
    }, [])

    const changeTab = active => {
        setKeyWord('');
        console.log(active)
        setActive(active);
        if (active == 2) searchPost('');
        else searchPeople('');
    }
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
                <HeaderNavigation headerName="Search" />
                <SearchInput onChange={e => setKeyWord(e.target.value)} value={keyWord} />
                <div className="ant-tabs-container custom-tabs">
                    <Tabs 
                        defaultActiveKey="1"
                        onChange={changeTab}
                        >
                        <TabPane tab={<span>Generous Patrons</span>} key="1">
                            <Patron data={dataPeople} />
                        </TabPane>
                        <TabPane
                            tab={<span>Generous Supports</span>}
                            key="2"
                        >
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
                                            commented = {post.commented}
                                        />
                                    ))
                                }
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    userInfo: selectUserInfo()
});

export default connect(mapStateToProps)(memo(Search));
