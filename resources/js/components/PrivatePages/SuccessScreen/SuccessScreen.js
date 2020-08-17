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
        imgPath: "images/FullScreen/builder-1.jpg"
    },
    {
        imgPath: "images/FullScreen/builder-2.jpg"
    },
    {
        imgPath: "images/FullScreen/builder-3.jpg"
    },
    {
        imgPath: "images/FullScreen/builder-4.jpg"
    }
];
const patronSteps = [
    {
        imgPath: "images/FullScreen/Patron-1.jpg"
    },
    {
        imgPath: "images/FullScreen/Patron-2.jpg"
    },
    {
        imgPath: "images/FullScreen/Patron-3.jpg"
    },
    {
        imgPath: "images/FullScreen/Patron-4.jpg"
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
        <div className="container" style={{ position: "relative" }}>
            <AutoPlaySwipeableViews
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
            >
                {steps.map((step, index) => (
                    <div key={`${step.label} ${index}`}>
                        {Math.abs(activeStep - index) <= 3 ? (
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
