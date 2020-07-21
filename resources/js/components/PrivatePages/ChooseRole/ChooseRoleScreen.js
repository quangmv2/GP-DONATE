import React, { useState, useEffect, memo } from "react";
import "./chooseRole.scss";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import { openNotification } from "helpers";
import { ButtonAnt } from "components/Atoms";
import { FormattedMessage } from "react-intl";
import { PUBLIC_ROUTE, NOTIFICATION_TYPE, ROUTE } from "constants";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import { fetchService } from "../../../services/fetch/fetchService";
import { ROOT_API_URL } from "../../../constants";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserInfo } from "../../../modules/auth/selectors";

function ChooseRoleScreen(props) {

    const [userRole, setUserRole] = useState();

    useEffect(() => {
        const { userInfo, history } = props;
        if (userInfo && userInfo.roles.length > 0) {
            history.push(ROUTE.HOME)
        }
    }, [props.userInfo]); 

    const handleBack = () => {
        this.props.history.goBack();
    };
    const onChangeValue = event => {
        setUserRole(event.target.value);
    };

    const onSubmit = async () => {
        console.log(userRole);
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
            if (userRole === "giver") {
                props.history.push(ROUTE.INPUTCODE)
            }
            else {
                props.history.push(ROUTE.HOME)
            }
        }
        else if (status == 403) {
            openNotification(NOTIFICATION_TYPE.ERROR, "Failed", "Cannot change your role");
        }
        else {
            openNotification(NOTIFICATION_TYPE.ERROR, "Failed", "Choose Role Failed");
        }
    }

    let content = (
        <ButtonAnt
            onClick={onSubmit}
            className="custom-button-login btn-block btn-round btn-red buttonContainer">
            <FormattedMessage
                defaultMessage={"chooseRole.submit"}
                id={"chooseRole.submit"}
            />
        </ButtonAnt>
    );

    return (
        <div className="fullheight-wrapper flex-center">
            <div className="container">
                <Link className="backContainer" to={PUBLIC_ROUTE.SIGNUP}>
                    <ArrowBackIosIcon className="backIcon" />
                    <p>Back</p>
                </Link>
                <p className="cr-t1">One more step</p>
                <p className="cr-t2">Who will you be</p>
                <div onChange={onChangeValue} className="gridContainer">
                    <Grid container>
                        <Grid item xs={6} className="radioContainer">
                            <input
                                type="radio"
                                className="radio radioGiver"
                                name="role"
                                value="giver"
                            />
                            <p className="roleText">
                                Generous <br /> Patron
                            </p>
                        </Grid>
                        <Grid item xs={6} className="radioContainer">
                            <input
                                type="radio"
                                className="radio radioTaker"
                                name="role"
                                value="taker"
                            />
                            <p className="roleText">
                                Generous <br /> Implementer
                            </p>
                        </Grid>
                    </Grid>
                </div>
                <div>
                    <img src={"/images/role.png"} className="image" />
                </div>
                <div className=" filledButton ">{content}</div>
                <div className="bottomTextContainer cant-change-text">
                    <FormattedMessage
                        defaultMessage={"chooseRole.cantChange"}
                        id={"chooseRole.cantChange"}
                    />
                </div>
            </div>
        </div>
    );
}
const mapStateToProps = createStructuredSelector({
    userInfo: selectUserInfo()
});

const mapDispatchToProps = {
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(ChooseRoleScreen));
