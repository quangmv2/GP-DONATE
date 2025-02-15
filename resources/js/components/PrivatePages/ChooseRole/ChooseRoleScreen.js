import React, { useState, useEffect, memo, useContext } from "react";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { openNotification } from "helpers";
import { ButtonAnt } from "components/Atoms";
import { FormattedMessage } from "react-intl";
import { NOTIFICATION_TYPE, ROUTE, ACCESS_TOKEN, REFRESH_TOKEN, URL_REDIRECT_LOGIN } from "constants";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { fetchService } from "../../../services/fetch/fetchService";
import { ROOT_API_URL } from "../../../constants";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserInfo } from "../../../modules/auth/selectors";
import { verifyToken } from "modules/auth/actions";
import { NavigatorContext } from "../../../context/BottomNavigatorContextAPI";
import "./chooseRole.scss";

function ChooseRoleScreen(props) {

    const [userRole, setUserRole] = useState('giver');
    const [loading, setLoading] = useState(false);

    const { setShowNavigator } = useContext(NavigatorContext);

    useEffect(() => {
        setShowNavigator(false);
        return () => setShowNavigator(true);
    }, [])

    useEffect(() => {
        const { userInfo, history } = props;
        if (userInfo && userInfo.roles.length > 0) {
            history.push(ROUTE.HOME)
        }

    }, [props.userInfo]);

    const handleBack = () => {
        const { history } = props;
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        localStorage.removeItem(URL_REDIRECT_LOGIN);
        history.goBack();
    };
    const onChangeValue = event => {
        setUserRole(event.target.value);
    };

    const onSubmit = async () => {
        setLoading(true);
        const res = await fetchService.fetch(`${ROOT_API_URL}/api/user/me/update-role`, {
            method: "POST",
            body: JSON.stringify({
                role: userRole
            })
        }).then(([resp, status]) => {
            return {
                data: resp,
                status,
            };
        });
        const { data, status } = res;
        if (status == 200) {
            setTimeout(() => {
                if (userRole === "giver") {
                    props.history.push(ROUTE.INPUTCODE)
                }
                else {
                    props.history.push(ROUTE.CONGRAT);
                }
            }, 2500)
        }
        else if (status == 403) {
            openNotification(NOTIFICATION_TYPE.ERROR, "Failed", "Cannot change your role");
        }
        else {
            openNotification(NOTIFICATION_TYPE.ERROR, "Failed", "Choose Role Failed");
        }
        setLoading(false);
    }

    let content = (
        <ButtonAnt
            onClick={onSubmit}
            className="custom-button-login btn-block btn-round btn-red buttonContainer"
            loading={loading}
        >
            <FormattedMessage
                defaultMessage={"chooseRole.submit"}
                id={"chooseRole.submit"}
            />
        </ButtonAnt>
    );

    return (
        <div className="fullheight-wrapper flex-center">
            <div className="container">
                <Link className="backContainer" to='#' onClick={handleBack}>
                    <ArrowBackIosIcon className="backIcon" />
                    <p>
                        <FormattedMessage
                            defaultMessage={"common.back"}
                            id={"common.back"}
                        />
                    </p>
                </Link>
                <div className="main-container choose-role-container">
                    <p className="cr-t1">
                        <FormattedMessage
                            defaultMessage={"chooseRole.step"}
                            id={"chooseRole.step"}
                        />
                    </p>
                    <p className="cr-t2">
                        <FormattedMessage
                            defaultMessage={"chooseRole.who"}
                            id={"chooseRole.who"}
                        />
                    </p>
                    <div className="gridContainer">
                        <Grid container>
                            <Grid item xs={6} className="radioContainer">
                                <input
                                    type="radio"
                                    className="radio radioGiver"
                                    name="role"
                                    value="giver"
                                    checked={userRole == "giver"}
                                    onClick={onChangeValue}
                                    onChange={() => { }}
                                />
                                <p className="roleText">
                                    <FormattedMessage
                                        defaultMessage={"common.generous"}
                                        id={"common.generous"}
                                    />
                                    <br />
                                    <FormattedMessage
                                        defaultMessage={"chooseRole.patron"}
                                        id={"chooseRole.patron"}
                                    />
                                </p>
                            </Grid>
                            <Grid item xs={6} className="radioContainer">
                                <input
                                    type="radio"
                                    className="radio radioTaker"
                                    name="role"
                                    value="taker"
                                    checked={userRole == "taker"}
                                    onClick={onChangeValue}
                                    onChange={() => { }}
                                />
                                <p className="roleText">
                                    <FormattedMessage
                                        defaultMessage={"common.generous"}
                                        id={"common.generous"}
                                    />
                                    <br />
                                    <FormattedMessage
                                        defaultMessage={"chooseRole.builder"}
                                        id={"chooseRole.builder"}
                                    />
                                </p>
                            </Grid>
                        </Grid>
                    </div>
                    <div className='choose-role-text-container'>
                        <p>
                            <FormattedMessage
                                defaultMessage={"chooseRole.become"}
                                id={"chooseRole.become"}
                            />
                            <span>
                                {userRole == 'giver' ?
                                    <FormattedMessage
                                        defaultMessage={"chooseRole.giver"}
                                        id={"chooseRole.giver"}
                                    />
                                    :
                                    <FormattedMessage
                                        defaultMessage={"chooseRole.taker"}
                                        id={"chooseRole.taker"}
                                    />
                                }
                            </span> {
                                userRole == 'taker' ?
                                    <FormattedMessage
                                        defaultMessage={"chooseRole.fullfill"}
                                        id={"chooseRole.fullfill"}
                                    /> :
                                    <FormattedMessage
                                        defaultMessage={"chooseRole.lead"}
                                        id={"chooseRole.lead"}
                                    />
                            }

                        </p>
                    </div>
                    <div className="filledButton">{content}</div>
                    <div className="bottomTextContainer cant-change-text">
                        <FormattedMessage
                            defaultMessage={"chooseRole.cantChange"}
                            id={"chooseRole.cantChange"}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = createStructuredSelector({
    userInfo: selectUserInfo()
});

const mapDispatchToProps = {
    verifyTokenFnc: verifyToken,
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(ChooseRoleScreen));
