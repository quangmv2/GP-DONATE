import React, { useContext } from "react";

import { HeaderNavigation, SearchInput } from "components/Atoms";
import { Tabs } from "antd";
import {
    MessagesComponent,
    NotificationComponent
} from "components/PrivatePages/Activities";

import { useEffect } from "react";
import { useState } from "react";
import { SEARCH_NOTI, SEARCH_MESSAGE } from "../../../../constants";
import { useCallback } from "react";
import { fetchService } from "../../../../services/fetch/fetchService";
import { useRef } from "react";
import MessageDetail from "../MessageDetail/MessagesDetail";
import "./Activities.scss";
import "antd/dist/antd.css";
import { NavigatorContext } from "../../../../context/BottomNavigatorContextAPI";


const { TabPane } = Tabs;

let loading = false;

const ActivitesScreen = () => {

    const [dataNoti, setDataNoti] = useState([]);
    const [dataMessage, setDataMessage] = useState([]);
    const [active, setActive] = useState(0);
    const [page, setPage] = useState(1);
    const [scroll, setScroll] = useState(0);
    const [open, setOpen] = useState(false);
    const [idMessage, setIdMessage] = useState(0);
    const [activeTab, setActiveTab ] = useState('1');
    const bottom = useRef();
    const { setShowNavigator } = useContext(NavigatorContext);

    useEffect(() => {
        setShowNavigator(true);
        searchMessage();
        searchNoti(1, 'load');
        window.addEventListener("scroll", scrollWindows);
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
    }, [dataMessage]);

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

    const changeTab = activeKey => {
        setActiveTab(activeKey);
    }

    const openWindow = idMessage => {
        setIdMessage(idMessage);
        setOpen(true);
    }

    const closeWindow = () => {
        setOpen(false);
    } 

    return (
        <div className="private-fullheight">
            {
                open?<MessageDetail closeWindow={closeWindow} data={idMessage}/>:<></>
            }
            <div className="container">
                <HeaderNavigation headerName="Activities" />
                <SearchInput />
                <div className="ant-tabs-container custom-tabs">
                    <Tabs activeKey={activeTab} onChange={changeTab}>
                        <TabPane tab="Messages" key="1">
                            <MessagesComponent data={dataMessage} openWindow={openWindow} closeWindow={closeWindow} />
                        </TabPane>
                        <TabPane tab="Notifications" key="2">
                            <NotificationComponent data={dataNoti} />
                        </TabPane>
                    </Tabs>
                </div>
                <div ref={bottom}></div>
            </div>
        </div>
    );
};

export default (ActivitesScreen);
