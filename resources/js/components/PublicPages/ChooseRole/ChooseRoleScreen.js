import React, { useState } from "react";
import "./ChooseRole.scss";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Role from "../../../../../public/images/role.png";
import { ButtonAnt } from "components/Atoms";
import { FormattedMessage } from "react-intl";
import { PUBLIC_ROUTE } from "constants";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
export default function ChooseRoleScreen() {
    const [userRole, setUserRole] = useState();
    const handleBack = () => {
        this.props.history.goBack();
    };
    const onChangeValue = event => {
        setUserRole(event.target.value);
        console.log(userRole);
    };
    let content = (
        <Link>
            <ButtonAnt className="custom-button-login btn-block btn-round btn-red buttonContainer">
                <FormattedMessage
                    defaultMessage={"chooseRole.submit"}
                    id={"chooseRole.submit"}
                />
            </ButtonAnt>
        </Link>
    );
    if (userRole == "0") {
        content = (
            <Link to={PUBLIC_ROUTE.INPUTCODE}>
                <ButtonAnt className="custom-button-login btn-block btn-round btn-red buttonContainer">
                    <FormattedMessage
                        defaultMessage={"chooseRole.submit"}
                        id={"chooseRole.submit"}
                    />
                </ButtonAnt>
            </Link>
        );
    } else if (userRole == "1") {
        content = (
            <Link to={PUBLIC_ROUTE.LOGIN}>
                <ButtonAnt className="custom-button-login btn-block btn-round btn-red buttonContainer">
                    <FormattedMessage
                        defaultMessage={"chooseRole.submit"}
                        id={"chooseRole.submit"}
                    />
                </ButtonAnt>
            </Link>
        );
    }
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
                                value="1"
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
                                value="0"
                            />
                            <p className="roleText">
                                Generous <br /> Implementer
                            </p>
                        </Grid>
                    </Grid>
                </div>
                <div>
                    <img src={Role} className="image" />
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
