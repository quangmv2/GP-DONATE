import React from "react";
import {
    App,
    NavRight,
    Panel,
    View,
    Page,
    Navbar,
    Block,
    Row,
    Col,
    Button,
    Popup,
    Link,
    LoginScreenTitle,
    BlockFooter,
    ListButton,
    ListInput,
    List,
    BlockTitle,
    ListItem,
    NavLeft,
    NavTitle,
    Toolbar,
    LoginScreen
} from "framework7-react";

import publicRoutes from "../router/public";

export default function(props) {
    // Framework7 parameters here
    const f7params = {
        id: "com.demoapp.test", // App bundle ID
        name: "Framework7", // App name,
        theme: "auto",
        // App routes
        routes: [...publicRoutes]
    };

    return (
        <App params={f7params}>
            <Panel left reveal themeDark>
                <View id="left-panel-view">
                    <Page>
                        <Navbar title="Left Panel" />
                        <Block strong>
                            <p>Left panel content goes here</p>
                        </Block>
                        <BlockTitle>Load page in panel</BlockTitle>
                        <List>
                            <ListItem link="/about/" title="About"></ListItem>
                            <ListItem link="/form/" title="Form"></ListItem>
                        </List>
                        <BlockTitle>Load page in main view</BlockTitle>
                        <List>
                            <ListItem
                                link="/about/"
                                title="About"
                                view="#main-view"
                                panelClose
                            ></ListItem>
                            <ListItem
                                link="/form/"
                                title="Form"
                                view="#main-view"
                                panelClose
                            ></ListItem>
                        </List>
                    </Page>
                </View>
            </Panel>

            <Panel right cover themeDark>
                <View id="right-panel-view">
                    <Page>
                        <Navbar title="Right Panel" sliding></Navbar>
                        <Block>
                            <p>Right panel content goes here</p>
                        </Block>
                        <BlockTitle>Load page in panel</BlockTitle>
                        <List>
                            <ListItem link="/about/" title="About"></ListItem>
                            <ListItem link="/form/" title="Form"></ListItem>
                        </List>
                        <BlockTitle>Load page in main view</BlockTitle>
                        <List>
                            <ListItem
                                link="/about/"
                                title="About"
                                view="#main-view"
                                panelClose
                            ></ListItem>
                            <ListItem
                                link="/form/"
                                title="Form"
                                view="#main-view"
                                panelClose
                            ></ListItem>
                        </List>
                    </Page>
                </View>
            </Panel>

            {/* Main View */}
            <View id="main-view" main>
                <Page>
                    <Navbar>
                        <NavLeft>
                            <Link panelOpen="left">Left Panel</Link>
                        </NavLeft>
                        <NavTitle>My App</NavTitle>
                        <NavRight>
                            <Link panelOpen="right">Right Panel</Link>
                        </NavRight>
                    </Navbar>
                    <Toolbar bottom>
                        <Link>Left Link</Link>
                        <Link>Right Link</Link>
                    </Toolbar>
                    <Block strong>
                        <p>
                            Here is your blank Framework7 app. Let's see what we
                            have here.
                        </p>
                    </Block>
                    <BlockTitle>Navigation</BlockTitle>
                    <List>
                        <ListItem link="/about/" title="About"></ListItem>
                        <ListItem link="/form/" title="Form"></ListItem>
                    </List>
                    <BlockTitle>Modals</BlockTitle>
                    <Block strong>
                        <Row>
                            <Col width="50">
                                <Button fill raised popupOpen="#popup">
                                    Popup
                                </Button>
                            </Col>
                            <Col width="50">
                                <Button
                                    fill
                                    raised
                                    loginScreenOpen="#login-screen"
                                >
                                    Login Screen
                                </Button>
                            </Col>
                        </Row>
                    </Block>
                    <BlockTitle>Panels</BlockTitle>
                    <Block strong>
                        <Row>
                            <Col width="50">
                                <Button fill raised panelOpen="left">
                                    Left Panel
                                </Button>
                            </Col>
                            <Col width="50">
                                <Button fill raised panelOpen="right">
                                    Right Panel
                                </Button>
                            </Col>
                        </Row>
                    </Block>
                    <List>
                        <ListItem
                            link="/dynamic-route/blog/45/post/125/?foo=bar#about"
                            title="Dynamic Route"
                        ></ListItem>
                        <ListItem
                            link="/load-something-that-doesnt-exist/"
                            title="Default Route (404)"
                        ></ListItem>
                    </List>
                </Page>
            </View>

            {/* Popup */}
            <Popup id="popup">
                <View>
                    <Page>
                        <Navbar title="Popup">
                            <NavRight>
                                <Link popupClose>Close</Link>
                            </NavRight>
                        </Navbar>
                        <Block>
                            Lorem ipsum dolor sit amet, consectetur adipisicing
                            elit. Neque, architecto. Cupiditate laudantium rem
                            nesciunt numquam, ipsam. Voluptates omnis, a
                            inventore atque ratione aliquam. Omnis iusto nemo
                            quos ullam obcaecati, quod.
                        </Block>
                    </Page>
                </View>
            </Popup>

            {/* Login Screen */}
            <LoginScreen id="login-screen">
                <View>
                    <Page loginScreen>
                        <LoginScreenTitle>Login</LoginScreenTitle>
                        <List form>
                            <ListInput
                                label="Username"
                                name="username"
                                placeholder="Username"
                                type="text"
                            />
                            <ListInput
                                label="Password"
                                name="password"
                                type="password"
                                placeholder="Password"
                            />
                        </List>
                        <List>
                            <ListButton
                                title="Sign In"
                                loginScreenClose
                            ></ListButton>
                            <BlockFooter>
                                <p>Click Sign In to close Login Screen</p>
                            </BlockFooter>
                        </List>
                    </Page>
                </View>
            </LoginScreen>
        </App>
    );
}
