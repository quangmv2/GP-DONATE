import React from "react";
import SignInBackground from "components/Atoms/AuthBackground/SignInBackground";
import userIcon from "../../../../../public/images/user-icon.png";
import FilledButton from "../../Atoms/AuthButton/FilledButton";
import OutlineButton from "../../Atoms/AuthButton/OutlineButton";
import BottomText from "../../Atoms/AuthButton/BottomText";
import "./signUp.scss";
import changepassFields from "./changepassFields";

export class ChangePassScreen extends React.Component {
    renderFields() {
        return _.map(changepassFields, ({ label, icon, type }) => {
            return (
                <div className="formContainer">
                    <p className="label">{label}</p>
                    <div class="inputContainer">
                        <img className="formIcon" src={userIcon} />
                        <div class="textInput">
                            {" "}
                            <input className="input" type={type} />{" "}
                        </div>

                        <hr className="borderInput" />
                    </div>
                </div>
            );
        });
    }
    render() {
        return (
            <div className="container">
                <SignInBackground>
                    <p className="text1">
                        Change <br /> your password
                    </p>
                    <p className="text2">Please enter your new password</p>
                </SignInBackground>
                <div className="formFields">{this.renderFields()}</div>
                <div className="filledButton">
                    <FilledButton
                        href="/"
                        buttonContainer="Save new password"
                    />
                </div>
            </div>
        );
    }
}
export default ChangePassScreen;
