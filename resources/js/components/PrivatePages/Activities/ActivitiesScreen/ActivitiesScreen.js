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
const { TabPane } = Tabs;

const ActivitesScreen = () => {
    return (
        <div className="private-fullheight">
            <div className="container">
                <HeaderNavigation headerName="Activities">
                    <button className="button-trans">
                        <i className="icon-more icon-top"  />
                    </button>
                </HeaderNavigation>
                <SearchInput />
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
