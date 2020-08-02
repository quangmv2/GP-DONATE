import React, { Component } from "react";
import SignInBackground from "../../Atoms/AuthBackground/SignInBackground";
import "./Congrat.scss";
import { ButtonAnt } from "components/Atoms";
import { FormattedMessage } from "react-intl";
import { ROUTE } from "../../../constants";
import { Link } from "react-router-dom";

const CongratScreen = () => {
        return (
            <div className="fullheight-wrapper flex-center">
                <div className="container">
                    <SignInBackground>
                        <p className="text1"> <FormattedMessage
                defaultMessage={"success.congrat"}
                id={"success.congrat"}
            /></p>
                        <p className="text2"><FormattedMessage
                defaultMessage={"signupPage.making"}
                id={"signupPage.making"}
            /></p>
                    </SignInBackground>
                
                
                <div className='center-container'>
                    <img src='/images/icon/done.svg'/>
                    <p className='congrat-text'><FormattedMessage
                defaultMessage={"success.success"}
                id={"success.success"}
            /></p>
                </div>
                <div className=" filledButton ">
                    <Link to={ROUTE.SUCCESS}><ButtonAnt
                    className="custom-button-login btn-block btn-round btn-red buttonContainer">
            <FormattedMessage
                defaultMessage={"success.begin"}
                id={"success.begin"}
            />
            
        </ButtonAnt>
        </Link>
        </div>
                <div className="bottomTextContainer cant-change-text">
                    <FormattedMessage
                        defaultMessage={"chooseRole.begin"}
                        id={"chooseRole.cantChange"}
                    />
                </div>
                </div>
            </div>
        );
    }



export default CongratScreen;
