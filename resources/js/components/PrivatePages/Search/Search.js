import React, { memo, useState, useEffect, useCallback } from "react";
import { HeaderNavigation, SearchInput } from "components/Atoms";
import "./Search.scss";
import Posts from "../../Molecules/Post";
import { Tabs } from "antd";
import { Patron } from "components/Molecules";
import BottomNavigator from "../../Molecules/BottomNav/BottomNavigator";
import { fetchService } from "services";
import { SEARCH_POST, GET_IMAGE } from "../../../constants/routes";
import moment from "moment";

const patronData = [
    {
        username: "Charity",
        content: "@alina.baikova",
        avatar: "./images/avatar/_0008_Alina Baikova.jpg",
        isFriend: true
    },
    {
        username: "Social Mobility",
        content: "@alina.baikova",
        avatar: "./images/avatar/_0008_Alina Baikova.jpg",
        isFriend: true
    },
    {
        username: "The Nyaka AIDS Orphans",
        content: "@alina.baikova",
        avatar: "./images/avatar/_0008_Alina Baikova.jpg"
    },
    {
        username: "Emma Watson",
        content: "@alina.baikova",
        avatar: "./images/avatar/_0008_Alina Baikova.jpg"
    },
    {
        username: "Mapelo Onzcu",
        content: "@alina.baikova",
        avatar: "./images/avatar/_0008_Alina Baikova.jpg"
    }
];

let idTimeOut = 0;
let delay = Date.now();
const Search = props => {

    const [keyWord, setKeyWord] = useState('');
    const [dataPost, setDataPost] = useState([]);

    useEffect(() => {
        searchPost();
    }, []);

    useEffect(() => {
        const now = Date.now();
        if (now - delay < 200) {
            clearTimeout(idTimeOut);
        }
        idTimeOut = setTimeout(() => {
            searchPost()
        }, 200);
        delay = now;
    }, [keyWord]);

    const searchPost = useCallback(async () => {
        const [data, status] = await fetchService.fetch(SEARCH_POST(keyWord), {
            method: "GET"
        });
        if (status == 200) {
            setDataPost(data.data);
        }
    });

    return (
        <div className="private-fullheight">
            <div className="container">
                <HeaderNavigation headerName="Search" />
                <SearchInput onChange={e => setKeyWord(e.target.value)} />
                <div className="ant-tabs-container custom-tabs">
                    <Tabs defaultActiveKey="0">
                        <TabPane tab={<span>Patrons</span>} key="0">
                            <Patron data={patronData} />
                        </TabPane>
                        <TabPane
                            tab={<span>Generous Supports</span>}
                            key="2"
                        >
                            <div className="info-content">
                                {
                                    dataPost.map(post => (
                                        <Posts
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
                                                username: `${post.user.first_name} ${post.user.last_name}`,
                                                avatar: post.user.personal_photo
                                            }}
                                            createTime={moment(post.created_at).format("YYYY-MM-DD")}
                                        />
                                    ))
                                }
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
                <BottomNavigator />
            </div>
        </div>
    );
}

const { TabPane } = Tabs;

export default memo(Search);
