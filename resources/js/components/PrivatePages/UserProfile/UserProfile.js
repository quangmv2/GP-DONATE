import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { Link } from "react-router-dom";
import { ButtonAnt } from "components/Atoms";
import { FormattedMessage } from "react-intl";
import { useParams } from 'react-router-dom';
import { GET_PROFILE, GET_PROPOSITIONS, GET_IMAGE, PRIVATE_ROUTE, TOGGLE_FOLLOW } from "../../../constants/routes";
import { fetchService } from "../../../services/fetch/fetchService";
import {
    selectUserInfo
} from "modules/auth/selectors";
import { StarFilled, GlobalOutlined } from "@ant-design/icons";
import MessagesDetail from "../Activities/MessageDetail/MessagesDetail";
import UserAvatar from "react-user-avatar";
import Propositions from "./Propositions";
import Loading from "../../Atoms/Loading/Loading";
import "./UserProfile.scss";
import "../ProfileSetting/ProfileSetting.scss";
import { NavigatorContext } from "../../../context/BottomNavigatorContextAPI";

const UserProfile = (props) => {
    const { userInfo } = props;
    let { userId } = useParams();
    const [user, setUser] = useState({});
    const [roles, setRoles] = useState([]);
    const [propositions, setPropositions] = useState([]);
    const [modal, setModal] = useState(false);
    const [open, setOpen] = useState(false);
    const [isfollow, setIsFollow] = useState(false);
    const currentUser = localStorage.getItem("USERNAME");

    const { setShowNavigator } = useContext(NavigatorContext);

    useEffect(() => {
        fetchUser();
        fetchPropositions();
        setShowNavigator(true);
    }, []);

    useEffect(() => {
        if (user && user.isFollow) setIsFollow(true);
    }, [user]);

    let isUser = userId ?? currentUser;
    if (userId == null && userInfo) {
        isUser = userInfo.username;
    }

    const fetchUser = async (id) => {
        const [users] = await fetchService.fetch(GET_PROFILE(isUser), {
            method: 'GET'
        });
        setUser(users);
        setRoles(users.roles[0].name);

    }
    const fetchPropositions = async (id) => {
        const [propositon] = await fetchService.fetch(GET_PROPOSITIONS(isUser), {
            method: 'GET'
        });
        setPropositions(propositon.data);

    }

    const clickToggleFollow = async () => {
        const [follow, status] = await fetchService.fetch(TOGGLE_FOLLOW(isUser), {
            method: 'PUT'
        });
        if (status == 201) {
            setIsFollow(true);
        } else setIsFollow(false);
    }


    let avatar = (
        <div style={{ position: 'relative' }}>
            {
                user && user.code_id ? <StarFilled className="icon-star" style={{ fontSize: '14px' }} /> : <></>
            }
            {
                user && user.personal_photo ?
                    <img
                        className='giver-avatar'
                        src={GET_IMAGE(user.personal_photo)}
                    />:
                <UserAvatar size={42} name={user && user.first_name ? user.first_name: "GP"} />
            }

        </div>
    )

    let button = (
        <button className={isfollow?'follow-button followed-button':'follow-button'} onClick={clickToggleFollow}>
            <p>{isfollow?'Following':'Follow'}</p>
        </button>
    )

    if (user.personal_photo == null && user.code_id == null) {
        avatar = (
            user.personal_photo ?
                <img
                    className='giver-avatar'
                    src={GET_IMAGE(user.personal_photo)}
                ></img> :
                <UserAvatar size="42" name={`${user.first_name}`} />

        )
    }
    let buttonContent = (
        <div onClick={() => { setOpen(true) }}>
            <ButtonAnt className="btn-block btn-round btn-red edit-profile-container">
                <FormattedMessage
                    defaultMessage={"userProfile.sendMess"}
                    id={"userProfile.sendMess"}
                />
            </ButtonAnt>
        </div>

    );
    if (userInfo && userInfo.id && userInfo.id == user.id) {
        buttonContent = (
            <Link to={PRIVATE_ROUTE.EDITPROFILE} >
                <ButtonAnt className="btn-block btn-round btn-red edit-profile-container">
                    <FormattedMessage
                        defaultMessage={"userProfile.edit"}
                        id={"userProfile.edit"}
                    />
                </ButtonAnt>
            </Link>

        );
        button = (
            <Link to={PRIVATE_ROUTE.PROFILESETTING}>
                <img src={"/images/icon/setting.svg"} className="Setting" /></Link>

        )
    }

    const renderFields = () => {
        return _.map(propositions, ({ title, photo_thumbnail }) => {
            return (
                <Link className="propositons-container" to="#" key={`post profile ${isUser} ${title} ${photo_thumbnail}`}>
                    <img
                        src={GET_IMAGE(photo_thumbnail)}
                        className='propostion-image'
                    />
                    <p>{title}</p>
                </Link>
            );
        });
    };

    return (
        <>
            {
                open ? <MessagesDetail data={user} closeWindow={() => setOpen(false)} /> : <></>
            }
            {
                modal && <Propositions username={userId ? userId : 'me'} closeWindow={() => setModal(false)} />
            }

            <div className='container' style={{
                display: modal || open ? 'none' : 'block'
            }} >
                <div className="full-photo-div">
                    {Object.keys(user).length > 1 ?
                        (user.full_photo ?
                            <img className="full-photo-background" src={GET_IMAGE(user.full_photo)} /> :
                            <img className="full-photo-background" src='/image-profile.png' />)
                        : <Loading />
                    }
                </div>
                <div className='home-container user-profile'>
                    <div className="top-navbar-giver-home">
                        <div className="navbar-giver-home-container profile-wrapper">
                            {avatar}
                            {user && (
                                <div className="info-user">
                                    <p className="username">{user.first_name == null ? user.username : user.first_name}</p>
                                    <p className="user-charity">  {user.foudation ? `Charity: ${user.foudation}` : null}</p>
                                </div>
                            )}

                        </div>
                        {button}
                    </div>
                    <div className="user-account-profile">
                        {roles == 'taker' ? null :
                            <>
                                <div className="account-profile-info">
                                    <span className="account-profile-number">{propositions && propositions.length}</span>
                                    <p>Projects</p>
                                </div>
                                <div className="account-profile-info">
                                    <span className="account-profile-number">{user.totalLike}</span>
                                    <p>Likes</p>
                                </div>
                            </>}
                        <div className="account-profile-info">
                            <span className="account-profile-number">{user.followed}</span>
                            <p>Followers</p>
                        </div>
                        <div className="account-profile-info">
                            <span className="account-profile-number">{user.following}</span>
                            <p>Following</p>
                        </div>
                    </div>
                    {propositions && propositions.length == 0 ? null : <div>
                        {roles == 'taker' ? <div className="link-to-propositions-container discription"><p >Discription about us</p></div> :
                            <div className="link-to-propositions-container" onClick={() => setModal(true)}>
                                <p >See all Propositions</p>
                                <img
                                    src="/images/icon/arrow-next.svg"
                                    className="Arrow-next"
                                ></img>
                            </div>}
                    </div>}
                    {roles == 'taker' ?
                        <>
                            <div className='link-to-propositions-container discription-detail'>
                                <p>Description about us:</p>
                            </div>
                            <div className='link-to-propositions-container link-taker-container'>
                                {/* <GlobalOutlined className='link-taker-icon' /> */}
                                <p>{ userInfo && userInfo.description ? userInfo.description : "" }</p>
                            </div>
                        </>
                        :
                        <div className="prop-container">{renderFields()}</div>
                    }
                    <div className={`form-control outlineButton ${propositions && propositions.length == 0 ? "edit-button-container nonProButton" : "edit-button-container"}`}>
                        {buttonContent}
                    </div>
                </div>
            </div>

        </>
    );
};
const mapStateToProps = createStructuredSelector({
    userInfo: selectUserInfo()
});
export default connect(mapStateToProps)((UserProfile));
