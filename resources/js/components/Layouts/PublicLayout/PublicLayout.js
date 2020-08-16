import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { createStructuredSelector } from "reselect";
import { connect } from "react-redux";
import { Menu } from "antd";
import { fetchService } from "services";
import { getLanguageCode } from "modules/translates/selectors";
import { switchLanguage } from "modules/translates/actions";
import { listLang, LANG_PARAM } from "constants";
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
        return <div>{children}</div>;
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
