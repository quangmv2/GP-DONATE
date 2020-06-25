import React from "react";
import { connect } from "react-redux";
import cn from "classnames";
import { listLang } from "constants";
import { Menu, Dropdown } from "antd";

import { createStructuredSelector } from "reselect";
import { getLanguageCode } from "modules/translates/selectors";
import { switchLanguage } from "modules/translates/actions";

import { GlobalOutlined } from "@ant-design/icons";

const { SubMenu } = Menu;
const MenuLanguage = ({
    isMenu = false,
    language,
    switchLanguageCall,
    mode
}) => {
    const currentLanguage = listLang.find(l => l.lang === language);
    const renderOptionLanguage = () => {
        return (
            <Menu onClick={onSelectLanguage}>
                {listLang.map(obj => (
                    <Menu.Item key={obj.lang}>
                        <div className="lang-menu-item">
                            <span className="ml-10">{obj.name}</span>
                        </div>
                    </Menu.Item>
                ))}
            </Menu>
        );
    };

    const onSelectLanguage = ({ key }) => {
        language !== key && switchLanguageCall(key);
    };
    if (isMenu) {
        return (
            <Menu mode={mode}>
                <SubMenu
                    className="hidden-screen"
                    onClick={onSelectLanguage}
                    title={
                        <>
                            <GlobalOutlined />
                            <span className="lang-text">
                                {currentLanguage.lang}
                            </span>
                        </>
                    }
                >
                    {listLang.map(obj => (
                        <Menu.Item key={obj.lang}>
                            <div className="lang-menu-item">
                                <span className="ml-10">{obj.name}</span>
                            </div>
                        </Menu.Item>
                    ))}
                </SubMenu>
            </Menu>
        );
    } else {
        return (
            <Dropdown overlay={renderOptionLanguage}>
                <div
                    className={cn(
                        "ant-dropdown-link",
                        "language-icon",
                        "language-header"
                    )}
                >
                    <GlobalOutlined />
                    <span className="lang-text">{currentLanguage.lang}</span>
                </div>
            </Dropdown>
        );
    }
};

const mapStateToProps = createStructuredSelector({
    language: getLanguageCode()
});

const mapDispatchToProps = {
    switchLanguageCall: languageCode => switchLanguage(languageCode)
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuLanguage);
