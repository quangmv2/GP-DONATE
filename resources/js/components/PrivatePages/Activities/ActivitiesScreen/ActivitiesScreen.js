import React from "react";
import { HeaderNavigation } from "components/Atoms";
import "./Activities.scss";
import BottomNavigator from "../../../Molecules/BottomNav/BottomNavigator";
import { Tabs } from "antd";
import "antd/dist/antd.css";
import {
    MessagesComponent,
    NotificationComponent
} from "components/PrivatePages";
const { TabPane } = Tabs;

const ActivitesScreen = () => {
    return (
        <div className="private-fullheight">
            <div className="container">
                <HeaderNavigation headerName="Activities">
                    <button className="button-trans">
                        <img src={"./images/icon/more.svg"} />
                    </button>
                </HeaderNavigation>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by keyword, hashtag..."
                    />
                    <button className="button-trans search-icon">
                        <img src={"./images/icon/search-normal.svg"} />
                    </button>
                </div>
                <div className="ant-tabs-container custom-tabs">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Messages" key="1">
                            <MessagesComponent />
                        </TabPane>
                        <TabPane tab="Notifications" key="2">
                            <NotificationComponent />
                        </TabPane>
                    </Tabs>
                </div>
                <BottomNavigator />
            </div>
        </div>
    );
};

export default ActivitesScreen;
