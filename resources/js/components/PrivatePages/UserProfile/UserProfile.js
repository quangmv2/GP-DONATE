import React, { useState, useEffect } from "react";
import "./UserProfile.scss";
import BottomNavigator from "../../Molecules/BottomNav/BottomNavigator";
import { Link } from "react-router-dom";
import { ButtonAnt } from "components/Atoms";
import { FormattedMessage } from "react-intl";
import { useParams } from 'react-router-dom';
import UserPropositions from "./UserPropositions";
import { GET_PROFILE } from "../../../constants/routes";
import { fetchService } from "../../../services/fetch/fetchService";


const UserProfile = ( props ) => {
    let { userId } = useParams();
    const [ user, setUser ] = useState([]);
    useEffect(() => {
       fetchUser()
     
    }, []);
    const fetchUser = async (id) => {
        const [users] = await fetchService.fetch(GET_PROFILE( userId ), {
          method: 'GET'
        });
        setUser(users);
        console.log(users)
      }
    const renderFields = () => {
       
        return _.map(UserPropositions, ({ label, name }) => {
            return (
                <Link className="propositons-container">
                    <p>Between Heaven Earth</p>
                </Link>
            );
        });
    };
    let buttonContent = (
        <FormattedMessage
            defaultMessage={"userProfile.edit"}
            id={"userProfile.edit"}
        />
    );
    return (
        <div className="userProfileContainer" >
            <div className="image-background-div">
                <img className="image-background" src={user.personal_photo} />
            </div>
            <div className="top-navbar-giver-home">
                <div className="navbar-giver-home-container">
                    <img
                        src={"./images/_0009_Scott Harrison.jpg"}
                        className="giver-avatar"
                    />
                    <div className="info-user">
                        <p className="username">{user.first_name} {user.last_name}</p>
                        <p className="user-charity">Charity: Water</p>
                    </div>
                </div>
                <img src={"./images/icon/setting.svg"} className="Setting" />
            </div>
            <div className="user-account-profile">
                <div className="account-profile-info">
                    <span className="account-profile-number">05</span>
                    <p>Projects</p>
                </div>
                <div className="account-profile-info">
            <span className="account-profile-number">{user.totalLike}</span>
                    <p>Likes</p>
                </div>
                <div className="account-profile-info">
                <span className="account-profile-number">{user.followed}</span>
                    <p>Followers</p>
                </div>
                <div className="account-profile-info">
                    <span className="account-profile-number">{user.following}</span>
                    <p>Following</p>
                </div>
            </div>
            <div>
                <Link className="link-to-propositions-container">
                    <p>See all Propositions</p>
                    <img
                        src="../../../../../public/images/icon/back.svg"
                        className="Arrow-next"
                    ></img>
                </Link>
            </div>
            <div className="prop-container">{renderFields()}</div>
            <div className="form-control outlineButton edit-button-container">
                <Link to="/edit-profile">
                    <ButtonAnt className="btn-block btn-round btn-red edit-profile-container">
                        {buttonContent}
                    </ButtonAnt>
                </Link>
            </div>
            <div></div>
            <BottomNavigator />
        </div>
    );
};
export default UserProfile;
