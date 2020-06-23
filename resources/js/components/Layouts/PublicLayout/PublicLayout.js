import React, { Component } from "react";
import Image from "components/Atoms/Image";
import { PropTypes } from "prop-types";

import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { Layout, Menu } from "antd";
import { fetchService } from "services";

import { getLanguageCode } from "modules/translates/selectors";
import { switchLanguage } from "modules/translates/actions";
import cn from "classnames";
import { listLang, LANG_PARAM } from "constants";
import { MenuLanguage } from "components/Molecules";

import "./public-layout.scss";

class PublicLayout extends Component {
    menu = () => (
        <Menu onClick={this.handleSelectLanguage}>
            {listLang.map(obj => (
                <Menu.Item key={obj.lang}>
                    <div className="lang-menu-item">
                        {renderIcon(obj.icon)}
                        <span className="ml-10">{obj.name}</span>
                    </div>
                </Menu.Item>
            ))}
        </Menu>
    );

    handleSelectLanguage = ({ key }) => {
        const { language, switchLanguageCall } = this.props;
        fetchService.addDefaultHeader(LANG_PARAM, key);
        language !== key && switchLanguageCall(key);
    };

    render() {
        const { children, language } = this.props;

        const currentLanguage = listLang.find(l => l.lang === language);
        return (
            <Layout theme="light">
                <div className="header-public">
                    <div className="header-public__logo">
                        <Image
                            className="ml-20"
                            src={
                                process.env.PUBLIC_URL +
                                "/assets/images/logo/original.png"
                            }
                        />
                    </div>

                    <div className="header-public__right">
                        <MenuLanguage />
                    </div>
                </div>
                <div>{children}</div>
            </Layout>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    language: getLanguageCode()
});

const mapDispatchToProps = dispatch => {
    return {
        switchLanguageCall: languageCode => {
            dispatch(switchLanguage(languageCode));
        }
    };
};

PublicLayout.propTypes = {
    language: PropTypes.string,
    children: PropTypes.element
};

export default connect(mapStateToProps, mapDispatchToProps)(PublicLayout);
