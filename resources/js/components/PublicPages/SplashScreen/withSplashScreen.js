import React, { Component } from "react";
import "./splash-screen.scss";

function SplashScreen() {
    return (
        <div
            className="fullheight-wrapper splash-screen fadeIn"
            id="splash_wrapper"
        >
            <div className="container ">
                <img src={"/images/Bitmap1.png"} className="top-splash" />
                <img src={"/images/Bitmap.png"} className="bottom-splash" />
                <img src={"/images/logo.png"} className="logo-splash" />
            </div>
        </div>
    );
}

function withSplashScreen(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                loading: true
            };
        }

        async componentDidMount() {
            setTimeout(() => {
                const wrapperSplash = document.getElementById("splash_wrapper");
                wrapperSplash && wrapperSplash.classList.add("fadeOut");
            }, 2500); //2500

            setTimeout(() => {
                this.setState({
                    loading: false
                });
            }, 3200); //3200
        }

        render() {
            if (this.state.loading) return SplashScreen();

            return <WrappedComponent {...this.props} />;
        }
    };
}

export default withSplashScreen;
