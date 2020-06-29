import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import "./dashboard.scss";

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    componentDidUpdate(prevProps) {}

    render() {
        const { errors, loading } = this.props;

        return (
            <div className="container ">
                <div className="ant-col-lg-24">private page</div>
            </div>
        );
    }
}

const mapDispatchToProps = {};

const mapStateToProps = createStructuredSelector({});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

Dashboard.defaultProps = {};

Dashboard.propTypes = {};

export default compose(withConnect, withRouter)(Dashboard);
