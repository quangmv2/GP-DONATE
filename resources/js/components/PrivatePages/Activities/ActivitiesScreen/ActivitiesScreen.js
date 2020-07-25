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
import { SEARCH_NOTI, SEARCH_MESSAGE } from "../../../../constants";
import { useCallback } from "react";
import { fetchService } from "../../../../services/fetch/fetchService";
import { useRef } from "react";
const { TabPane } = Tabs;

let loading = false;
let delay = Date.now();
let idTimeOut = 0;

const ActivitesScreen = () => {


    const [dataNoti, setDataNoti] = useState([]);
    const [dataMessage, setDataMessage] = useState([]);
    const [active, setActive] = useState(0);
    const [page, setPage] = useState(1);
    const [scroll, setScroll] = useState(0);
    const bottom = useRef();

    useEffect(() => {
        searchMessage();
        searchNoti(1, 'load');
        window.addEventListener("scroll", scrollWindows)
        return () => window.removeEventListener("scroll", scrollWindows);
    }, []);

    useEffect(() => {
        if (active == 2 && window.scrollY + window.innerHeight >= bottom.current.offsetTop - 10 && !loading) {
            loading = true;
            setPage(page => {
                searchNoti(page);
                return page;
            })
        }
    }, [scroll])

    useEffect(() => {
        console.log("dataMessage", dataMessage);
    }, [dataMessage])

    const scrollWindows = () => {
        setScroll(window.scrollY);
    }

    const searchMessage = useCallback(async (s) => {
        const [data, status] = await fetchService.fetch(SEARCH_MESSAGE(), {
            method: "GET"
        });
        if (status == 200) {
            setDataMessage(data);
        }
    }, []);

    const searchNoti = useCallback(async (page, type="loadMore") => {
        loading = true;
        const [data, status] = await fetchService.fetch(SEARCH_NOTI(page), {
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
        setActive(active);
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
                    <Tabs defaultActiveKey="1" onChange={changeTab}>
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
