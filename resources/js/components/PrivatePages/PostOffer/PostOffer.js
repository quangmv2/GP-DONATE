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
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import {
    selectIsLogged,
    selectErrors,
    selectLoading
} from "modules/auth/selectors";
import { ButtonAnt, HeaderNavigation } from "components/Atoms";
import { FormattedMessage } from "react-intl";
import { Formik } from "formik";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { Link } from "react-router-dom";
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import './PostOffer.scss';
import BottomNavigator from "../../Atoms/BottomNav/BottomNavigator";

export class PostOffer extends Component {
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
    async componentDidMount() { }

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
        //login(username, password);
    };

    render() {
        const { errors, loading } = this.props;
        return (
            <div className='private-fullheight'>
                <div className="container">
                    <HeaderNavigation 
                    headerName='Post an Offer'
                    />
                <Grid container className='post-image-container' >
                        <Grid item xs={5} style={{paddingRight: '25px'}}>
                            <p className='post-image-text'>Story photo</p>
                            <div className='prev-image-container'>

                                <PhotoCameraIcon
                                    style={{ fontSize: '37px' }} />

                            </div>
                        </Grid>
                        <Grid item xs={7}>
                            <p className='post-image-text '>Thumbnail photo</p>
                            <div className='prev-image-container'>
                                <PhotoCameraIcon style={{ fontSize: '37px' }} />
                            </div>
                        </Grid>
                    </Grid>

                    <hr className='post-border' />
                    <div className="form-post-offer-container ">
                        {/* {this.renderFields()} */}
                        <p className='other-info'>Offer information</p>
                        <Formik
                            initialValues={{
                                description: "",
                                offervalue: "",
                                duedate: "",
                                hashtag: "",

                            }}
                            layout="vertical"
                            validate={values => {
                                const errors = {};
                                if (!values.offervalue) {
                                    errors.offervalue = "Required";
                                }
                                if (!values.duedate) {
                                    errors.duedate = "Required";
                                }
                                if (!values.hashtag) {
                                    errors.hashtag = "Required";
                                }

                                return errors;
                            }}
                            onSubmit={this.onSubmit}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                //handleBlur,
                                handleSubmit,
                                isSubmitting
                                /* and other goodies */
                            }) => (
                                    <form onSubmit={handleSubmit} layout="vertical" className='form-control-post-offer'>

                                        <>
                                            <Grid
                                                container
                                                spacing={1}
                                                alignItems="flex-end"
                                                className="form-control"
                                            >
                                                <Grid
                                                    item
                                                    className="item-flex input-post-offer"
                                                >



                                                    <TextField
                                                        label={
                                                            <FormattedMessage
                                                                id="postOffer.description"
                                                                defaultMessage="postOffer.description"
                                                            />
                                                        }
                                                        value={values.description}
                                                        onChange={handleChange}
                                                        disabled={
                                                            loading || isSubmitting
                                                        }
                                                        name="description"
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Grid
                                                container
                                                spacing={1}
                                                alignItems="flex-end"
                                                className="form-control"
                                            >
                                                <Grid
                                                    item
                                                    className="item-flex post-offer-with-icon"
                                                >
                                                    <KeyboardArrowDownIcon />
                                                    <TextField
                                                        id="standard-select-currency"

                                                        error={
                                                            errors.offervalue &&
                                                            touched.offervalue
                                                        }

                                                        label={
                                                            <FormattedMessage
                                                                id="postOffer.value"
                                                                defaultMessage="postOffer.value"
                                                            />
                                                        }
                                                        value={values.offervalue}
                                                        onChange={handleChange}
                                                        disabled={
                                                            loading || isSubmitting
                                                        }
                                                        helperText={
                                                            touched.offervalue
                                                                ? errors.offervalue
                                                                : ""
                                                        }

                                                        name="offervalue"
                                                    >


                                                    </TextField>
                                                </Grid>
                                                <Grid
                                                    item
                                                    className="item-flex post-offer-with-icon"
                                                >
                                                    <KeyboardArrowDownIcon />
                                                    <TextField
                                                        error={
                                                            errors.duedate &&
                                                            touched.duedate
                                                        }

                                                        label={
                                                            <FormattedMessage
                                                                id="postOffer.duedate"
                                                                defaultMessage="postOffer.duedate"
                                                            />
                                                        }
                                                        value={values.duedate}
                                                        onChange={handleChange}
                                                        disabled={
                                                            loading || isSubmitting
                                                        }
                                                        helperText={
                                                            touched.duedate
                                                                ? errors.duedate
                                                                : ""
                                                        }

                                                        name="duedate"

                                                    >
                                                    </TextField>
                                                </Grid>
                                            </Grid>

                                            <Grid
                                                container
                                                spacing={1}
                                                alignItems="flex-end"
                                                className="form-control"
                                            >
                                                <Grid
                                                    item
                                                    className="item-flex input-post-offer"
                                                >

                                                    <TextField
                                                        error={
                                                            errors.hashtag &&
                                                            touched.hashtag
                                                        }

                                                        label={
                                                            <FormattedMessage
                                                                id="postOffer.hashtag"
                                                                defaultMessage="postOffer.hashtag"
                                                            />
                                                        }
                                                        value={values.hashtag}
                                                        onChange={handleChange}
                                                        disabled={
                                                            loading || isSubmitting
                                                        }
                                                        helperText={
                                                            touched.hashtag
                                                                ? errors.hashtag
                                                                : ""
                                                        }
                                                        name="hashtag"
                                                    />
                                                </Grid>
                                            </Grid>
                                            <Link to="">
                                                <div className="form-control publish-button">
                                                    <ButtonAnt
                                                        className="custom-button-login btn-block btn-round btn-red post-offer-button-container"
                                                        disabled={
                                                            loading || isSubmitting
                                                        }
                                                        id="login-btn"
                                                        loading={
                                                            loading || isSubmitting
                                                        }
                                                        name="login-btn"
                                                        onClick={handleSubmit}
                                                        type="primary"
                                                    >
                                                        <FormattedMessage
                                                            defaultMessage={
                                                                "postOffer.publish"
                                                            }
                                                            id={"postOffer.publish"}
                                                        />
                                                    </ButtonAnt>
                                                </div>
                                            </Link>
                                        </>
                                    </form>
                                )}
                        </Formik>
                    </div>  
                   
                    <BottomNavigator 
                    style='bottom-nav'
                    />
                    </div>
                    </div >

            
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

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: FEATURE_NAME_AUTH, reducer });
const withSaga = injectSaga({ key: FEATURE_NAME_AUTH, saga });

PostOffer.defaultProps = {
    login: () => null,
    errors: {}
};

PostOffer.propTypes = {
    login: PropTypes.func,
    isLogged: PropTypes.bool
};

export default compose(withReducer, withSaga, withConnect, withRouter)(PostOffer);
