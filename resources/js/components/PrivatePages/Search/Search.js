import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { postLogin } from "modules/auth/actions";
import {
    selectIsLogged,
    selectErrors,
    selectLoading
} from "modules/auth/selectors";
import { HeaderNavigation, SearchInput } from "components/Atoms";
import "./Search.scss";
import Posts from "../../Molecules/Post";
import { Tabs } from "antd";
import { Patron } from "components/Molecules";
import BottomNavigator from "../../Molecules/BottomNav/BottomNavigator";

export class Search extends Component {
    constructor(props) {
        super(props);
        
    }

    componentDidMount() {}

    componentDidUpdate(prevProps) {}

    render() {
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
        return (
            <div className="private-fullheight">
                <div className="container">
                    <HeaderNavigation headerName="Search" />
                    <SearchInput />

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
                                    <Posts
                                        className="info-list"
                                        url="#"
                                        img="./images/product/search1.jpg"
                                        likeNumber="135"
                                        title={
                                            "Give happiness for those are less with each medical mask!"
                                        }
                                        description="10k packs of medical masks"
                                        duedate="2020/28/10"
                                        author={{
                                            username: "Hailee Steinfeld",
                                            avatar:
                                                "./images/product/search1.jpg"
                                        }}
                                        createTime="2020/28/10"
                                    />

                                    <Posts
                                        className="info-list"
                                        url="#"
                                        img="./images/product/search1.jpg"
                                        title={"Give happiness 2"}
                                        likeNumber="135"
                                        description="10k packs of medical masks"
                                        duedate="2020/28/10"
                                        author={{
                                            username: "Hailee Steinfeld",
                                            avatar:
                                                "./images/product/search1.jpg"
                                        }}
                                        createTime="2020/28/10"
                                    />

                                    <Posts
                                        className="info-list"
                                        url="#"
                                        img="./images/product/search1.jpg"
                                        title={"Test tile"}
                                        description="10k packs of medical masks"
                                        likeNumber="135"
                                        duedate="2020/28/10"
                                        author={{
                                            username: "Hailee Steinfeld",
                                            avatar:
                                                "./images/product/search1.jpg"
                                        }}
                                        createTime="2020/28/10"
                                    />
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                    {/* <div className="body-wrapper wrapper-search">
                        
                    </div> */}
                    <BottomNavigator />
                </div>
            </div>
        );
    }
}

const { TabPane } = Tabs;

const mapDispatchToProps = {
    login: postLogin
};

const mapStateToProps = createStructuredSelector({
    isLogged: selectIsLogged(),
    errors: selectErrors(),
    loading: selectLoading()
});


Search.defaultProps = {
    login: () => null,
    errors: {}
};

Search.propTypes = {
    login: PropTypes.func,
    isLogged: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
