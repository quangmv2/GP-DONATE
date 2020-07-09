import React from 'react';
import './UserProfile.scss';
import BottomNavigator from "../../Molecules/BottomNav/BottomNavigator";
import {Link} from 'react-router-dom';
import { ButtonAnt } from 'components/Atoms';
import { FormattedMessage } from "react-intl";
import UserPropositions from './UserPropositions';
import FlatList from 'flatlist-react';

const UserProfile = () => {
    const renderFields = () => {
        return _.map(UserPropositions, ({ label, name }) => {
          return (
            <Link className='propositons-container'>
             <p numberOfLines='2' >Between Heaven  Earth</p>
             </Link>
          );
        });
      }
    let buttonContent = (<FormattedMessage
        defaultMessage={
            "userProfile.edit"
        }
        id={"userProfile.edit"}
    />)
    return (
        <div className='user-image-container'>
            <div className="top-navbar-giver-home">
                <div className="navbar-giver-home-container">
                    <img
                        src={"./images/_0009_Scott Harrison.jpg"}
                        className="giver-avatar"
                    />
                    <div className="info-user">
                        <p className="username">
                            Alina
                        </p>
                        <p className='user-charity'>Charity: Water</p>
                    </div>
                   
                </div>
                <img src={"./images/icon/setting.svg"}
                        className="Setting" />
            </div>
            <div className='user-account-profile'>
                <div className='account-profile-info'>
                    <span className='account-profile-number'>05</span>
                    <p>Projects</p>
                </div>
                <div className='account-profile-info'>
                    <span className='account-profile-number'>54K</span>
                    <p>Likes</p>
                </div>
                <div className='account-profile-info'>
                    <span className='account-profile-number'>102K</span>
                    <p>Followers</p>
                </div>
                <div className='account-profile-info'>
                    <span className='account-profile-number'>25</span>
                    <p>Following</p>
                </div>
                
            </div>
            <div>
                <Link className='link-to-propositions-container'>
                <p>See all Propositions</p>
                <img src={"./images/icon/arrow-next.svg"}
                class="Arrow-next"></img>
                </Link>
            </div>
            <div className='prop-container'>
            {renderFields()}
            </div>
            <div className="form-control outlineButton edit-button-container">
                <Link to="/input-code">
                    <ButtonAnt
                        className="btn-block btn-round btn-red edit-profile-container"
                    >
                            {buttonContent}
                    </ButtonAnt>
                </Link>
            </div>
            <div>
            </div>
            <BottomNavigator />
        </div>
    )

};
export default UserProfile;