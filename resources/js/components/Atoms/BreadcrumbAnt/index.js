import React, { PureComponent } from "react";
import { Breadcrumb } from "antd";
import { withRouter, NavLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import PropTypes from "prop-types";
import { ROUTE } from "constants";
import "./breadcrumb.scss";
import { upperFirst } from "lodash";

export class BreadcrumbAnt extends PureComponent {
  componentDidUpdate(prevProps) {
    const { location } = this.props;
    const { location: prevLocation } = prevProps;

    if (
      prevLocation.pathname === location.pathname &&
      prevLocation.search === location.search &&
      prevLocation.hash === location.hash &&
      prevLocation.key !== location.key
    ) {
      window.location.reload();
    }
  }
  render() {
    let xhtml = null;
    const { hidden, location } = this.props;
    const routes = location && location.pathname.split("/").filter((i) => i);

    const breadcrumbs = (routes || []).map((item, index) => {
      const router = `/${routes.slice(0, index + 1).join("/")}`;
      const text = upperFirst(item.replace(/-/g, "_"));
      return {
        text,
        router,
      };
    });

    if (!hidden) {
      xhtml = (
        <Breadcrumb
          className="breadcrum-and--wrapper"
          separator={
            <span className="icon-ic-arr-right-1 breadcrum-and--arrow-icon" />
          }
        >
          <Breadcrumb.Item>
            <NavLink to={ROUTE.HOME}>
              <FormattedMessage defaultMessage="home" id="homepage.title" />
            </NavLink>
          </Breadcrumb.Item>
          {(breadcrumbs || []).map((br) => {
            return (
              br.router && (
                <Breadcrumb.Item key={br.router}>
                  <NavLink to={`${br.router}`}>
                    <FormattedMessage
                      defaultMessage={br.text.replace("_", " ")}
                      id={"screen." + br.text.toLowerCase()}
                    />
                  </NavLink>
                </Breadcrumb.Item>
              )
            );
          })}
        </Breadcrumb>
      );
    }
    return xhtml;
  }
}

BreadcrumbAnt.defaultProps = {
  hidden: false,
};

BreadcrumbAnt.propTypes = {
  hidden: PropTypes.bool,
  location: PropTypes.any,
};

export default withRouter(BreadcrumbAnt);
