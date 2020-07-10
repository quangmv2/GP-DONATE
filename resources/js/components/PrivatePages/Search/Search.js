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
import { HeaderNavigation } from "components/Atoms";
import "./Search.scss";
// import { StarFilled } from "@ant-design/icons";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import { Upload, message } from "antd";
import {
    LoadingOutlined,
    SearchOutlined,
    PlusOutlined,
    GiftOutlined,
    CalendarOutlined,
    StarFilled
} from "@ant-design/icons";
import Posts from "../../Molecules/Post";
import { Tabs } from "antd";

function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 4;
    if (!isLt2M) {
        message.error("Image must smaller than 4MB!");
    }
    return isJpgOrPng && isLt2M;
}

export class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            offervalue: "",
            duedate: "",
            hastag: "",
            errorValidLogin: {}
        };
        this.setSubmitting = null;
    }
    async componentDidMount() {}

    componentDidUpdate(prevProps) {
        const { isLogged } = this.props;
        if (isLogged) {
            this.redirectLogin();
        }
    }

    redirectLogin = () => {
        const { history } = this.props;
        const url_redirect_login = localStorage.getItem(URL_REDIRECT_LOGIN);
        history.push(url_redirect_login ?? ROUTE.HOME);
    };

    onSubmit = (values, { setSubmitting }) => {
        if (!this.setSubmitting) {
            this.setSubmitting = setSubmitting;
        }
        const { description, offervalue, duedate, hashtag } = values;
        const { login } = this.props;
        this.props.history.push(PUBLIC_ROUTE.SIGNUP);
    };

    render() {
        const { errors, loading } = this.props;

        const uploadButton = (
            <div>
                {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div className="private-fullheight">
                <div className="container">
                    <HeaderNavigation headerName="Search" />

                    <TextField
                        className=" search-text"
                        type="text"
                        placeholder="Search"
                        required
                        name="name"
                    >
                        <SearchOutlined />
                    </TextField>

                    <div className="body-wrapper wrapper-search">
                        <Tabs defaultActiveKey="2">
                            <TabPane tab={<span>Patrons</span>} key="1">
                                Tab 1
                            </TabPane>
                            <TabPane
                                tab={<span>Generous Supports</span>}
                                key="2"
                            >
                                <div className="info-content">
                                    <Posts
                                        url="#"
                                        img="./images/product/search1.jpg"
                                        title={
                                            <h1 className="title-img">
                                                Give happiness for those are
                                                less with each medical mask!
                                            </h1>
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
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
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

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: FEATURE_NAME_AUTH, reducer });
const withSaga = injectSaga({ key: FEATURE_NAME_AUTH, saga });

Search.defaultProps = {
    login: () => null,
    errors: {}
};

Search.propTypes = {
    login: PropTypes.func,
    isLogged: PropTypes.bool
};

export default compose(withReducer, withSaga, withConnect, withRouter)(Search);
