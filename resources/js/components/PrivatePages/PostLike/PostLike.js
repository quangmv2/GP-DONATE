import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";
import injectReducer from "core/reducer/inject-reducer";
import injectSaga from "core/saga/inject-saga";
import reducer from "modules/auth/reducers";
import saga from "modules/auth/sagas";
import { FEATURE_NAME_AUTH } from "modules/auth/constants";
import { URL_REDIRECT_LOGIN, ROUTE, PUBLIC_ROUTE } from "constants";
import { postLogin } from "modules/auth/actions";
import {
    selectIsLogged,
    selectErrors,
    selectLoading
} from "modules/auth/selectors";
import { HeaderNavigation, LinkItem } from "components/Atoms";
import "./PostLike.scss";
import Posts from "../../Molecules/Post";

export class PostLike extends Component {
    constructor(props) {
        super(props);
        
    }
    componentDidMount() {}

    componentDidUpdate(prevProps) {}

    render() {
        const { errors, loading } = this.props;
        return (
            <div className="private-fullheight">
                <div className="container">
                    <HeaderNavigation headerName="project you have liked" />
                    <div className="body-wrapper post-like-wrapper">
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
                                    avatar: "./images/product/search1.jpg"
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
                                    avatar: "./images/product/search1.jpg"
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
                                    avatar: "./images/product/search1.jpg"
                                }}
                                createTime="2020/28/10"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    login: postLogin
};

const mapStateToProps = createStructuredSelector({
    isLogged: selectIsLogged(),
    errors: selectErrors(),
    loading: selectLoading()
});

PostLike.defaultProps = {
    login: () => null,
    errors: {}
};

PostLike.propTypes = {
    login: PropTypes.func,
    isLogged: PropTypes.bool
};

export default connect(mapStateToProps, mapDispatchToProps)(PostLike);
