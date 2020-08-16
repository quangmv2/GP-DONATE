import React, { useEffect, useContext } from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import "./Success.scss";
import { Link } from "react-router-dom";
import { ROUTE } from "../../../constants";
import { selectUserInfo } from "modules/auth/selectors";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { NavigatorContext } from "../../../context/BottomNavigatorContextAPI";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
    {
        imgPath: "images/FullScreen/step1.jpg"
    },
    {
        imgPath: "images/FullScreen/step2.jpg"
    },
    {
        imgPath: "images/FullScreen/step3.jpg"
    },
    {
        imgPath: "images/FullScreen/Generous_Implementer-Step-4.jpg"
    }
];
const patronSteps = [
    {
        imgPath: "images/FullScreen/patron1.jpg"
    },
    {
        imgPath: "images/FullScreen/patron2.jpg"
    },
    {
        imgPath: "images/FullScreen/patron3.jpg"
    },
    {
        imgPath: "images/FullScreen/Patron-Step-4.jpg"
    }
];

const SuccessScreen = props => {
    const [activeStep, setActiveStep] = React.useState(0);
    const { setShowNavigator } = useContext(NavigatorContext);

    useEffect(() => {
        setShowNavigator(false);
    }, []);

    const { userInfo } = props;
    const maxSteps = tutorialSteps.length;

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleStepChange = step => {
        setActiveStep(step);
    };

    let steps = tutorialSteps;

    if (userInfo && userInfo.roles) {
        if (userInfo.roles[0].name == "giver") {
            steps = patronSteps;
        }
    }

    return (
        <div className="container">
            <AutoPlaySwipeableViews
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {steps.map((step, index) => (
                    <div key={step.label}>
                        {Math.abs(activeStep - index) <= 2 ? (
                            <img
                                className="image"
                                src={step.imgPath}
                                alt={step.label}
                            />
                        ) : null}
                    </div>
                ))}
            </AutoPlaySwipeableViews>

            {activeStep !== maxSteps - 1 ? (
                <button className="next-button" onClick={handleNext}>
                    Hello
                </button>
            ) : (
                <Link to={ROUTE.HOME} className="next-button">
                    To Home
                </Link>
            )}
            <Link className="skip-link" to={ROUTE.HOME}>
                To Home
            </Link>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    userInfo: selectUserInfo()
});

export default connect(mapStateToProps)(SuccessScreen);
