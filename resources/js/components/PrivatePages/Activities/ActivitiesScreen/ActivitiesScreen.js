import React, { useState } from "react";
import cn from 'classnames';
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
    const [focus, setFocus] = useState(false);

    const onFocusInput = () => {
        setFocus(true);
    }

    const onBlueInput = () => {
        setFocus(false);
    }

    return (
        <div className="private-fullheight">
            <div className="container">
                <HeaderNavigation headerName="Activities">
                    <button className="button-trans">
                        <i className="icon-more icon-top"  />
                    </button>
                </HeaderNavigation>
                <div className="search-container">
                    <input
                        type="text"
                        placeholder="Search by keyword, hashtag..."
                        onFocus={ onFocusInput } 
                        onBlur={ onBlueInput } 
                    />
                    <button className="button-trans search-icon">
                        <i className={cn(focus ?"icon-search-active": "icon-search-normal"," icon-search")} />
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
