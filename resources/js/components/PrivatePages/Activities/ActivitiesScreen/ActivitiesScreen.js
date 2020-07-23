import React from "react";

import { HeaderNavigation, SearchInput } from "components/Atoms";
import "./Activities.scss";
import BottomNavigator from "../../../Molecules/BottomNav/BottomNavigator";
import { Tabs } from "antd";
import "antd/dist/antd.css";
import {
    MessagesComponent,
    NotificationComponent
} from "components/PrivatePages";
import { useEffect } from "react";
import { useState } from "react";
import { SEARCH_NOTI } from "../../../../constants";
import { useCallback } from "react";
import { fetchService } from "../../../../services/fetch/fetchService";
import { useRef } from "react";
const { TabPane } = Tabs;

let loading = false;
let delay = Date.now();
let idTimeOut = 0;

const ActivitesScreen = () => {


    const [keyWord, setKeyWord] = useState('');
    const [dataNoti, setDataNoti] = useState([]);
    const [dataPeople, setDataPeople] = useState([]);
    const [active, setActive] = useState(0);
    const [page, setPage] = useState(1);
    const bottom = useRef();

    useEffect(() => {
        searchNoti('', page, 'load');
        window.addEventListener("scroll", scrollWindows)
        return () => window.removeEventListener("scroll", scrollWindows);
    }, []);

    useEffect(() => {
        const now = Date.now();
        if (now - delay < 200) {
            clearTimeout(idTimeOut);
        }
        idTimeOut = setTimeout(() => {
            setPage(1);
            if (active == 2) searchNoti(keyWord, 1, 'load');
            // else searchPeople(keyWord);
        }, 200);
        delay = now;
    }, [keyWord]);

    const scrollWindows = () => {
        if (window.scrollY + window.innerHeight >= bottom.current.offsetTop - 10 && !loading) {
            loading = true;
            setPage(page => {
                searchNoti(keyWord, page);
                return page;
            })
        }
    }

    // const searchMessage = useCallback(async key => {
    //     const [data, status] = await fetchService.fetch(SEARCH_POST(key), {
    //         method: "GET"
    //     });
    //     if (status == 200) {
    //         setDataPost(data.data);
    //     }
    // }, []);

    const searchNoti = useCallback(async (key, page, type="loadMore") => {
        loading = true;
        const [data, status] = await fetchService.fetch(SEARCH_NOTI(key, page), {
            method: "GET"
        });
        if (status == 200) {
            loading = false;
            if (type == "loadMore") setDataNoti(arr => [...arr, ...data.data]);
                else setDataNoti(data.data);
            if (data.data.length > 0) setPage(page => page + 1);
        }
        loading = false;
    }, [])

    const changeTab = active => {
        setKeyWord('');
        setActive(active);
        if (active == 2) setDataNoti('', 1, 'load');
        // else searchPeople('');
    }

    return (
        <div className="private-fullheight">
            <div className="container">
                <HeaderNavigation headerName="Activities">
                    <button className="button-trans">
                        <i className="icon-more icon-top" />
                    </button>
                </HeaderNavigation>
                <SearchInput />
                <div className="ant-tabs-container custom-tabs">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Messages" key="1">
                            <MessagesComponent />
                        </TabPane>
                        <TabPane tab="Notifications" key="2">
                            <NotificationComponent data={dataNoti} />
                        </TabPane>
                    </Tabs>
                </div>
                <div ref={bottom}></div>
                <BottomNavigator />
            </div>
        </div>
    );
};

export default ActivitesScreen;
