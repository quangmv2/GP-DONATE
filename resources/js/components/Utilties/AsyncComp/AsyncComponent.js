import React, { Component } from "react";
import Nprogress from "nprogress";
import ReactPlaceholder from "react-placeholder";
import "nprogress/nprogress.css";
import "react-placeholder/lib/reactPlaceholder.css";

export default function asyncComponent(importComponent) {
    class AsyncComponent extends Component {
        constructor(props) {
            super(props);
            this.state = {
                component: null
            };
        }

        componentWillMount() {
            Nprogress.configure({
                easing: "ease",
                speed: 1000,
                showSpinner: false
            });
            Nprogress.start();
        }

        async componentDidMount() {
            this.mounted = true;
            const { default: ComponentAsync } = await importComponent();
            Nprogress.done();
            if (this.mounted) {
                this.setState({
                    component: <ComponentAsync {...this.props} />
                });
            }
        }

        componentWillUnmount() {
            this.mounted = false;
        }

        render() {
            const ComponentAsync = this.state.component || <div />;

            return (
                <ReactPlaceholder
                    ready={ComponentAsync !== null}
                    rows={7}
                    type="text"
                >
                    {ComponentAsync}
                </ReactPlaceholder>
            );
        }
    }

    return AsyncComponent;
}
