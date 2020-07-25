import React, { useState, useEffect } from "react";
import "./UserProfile.scss";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import BottomNavigator from "../../Molecules/BottomNav/BottomNavigator";
import { Link } from "react-router-dom";
import { ButtonAnt } from "components/Atoms";
import { FormattedMessage } from "react-intl";
import { useParams } from 'react-router-dom';
import UserPropositions from "./UserPropositions";
import { GET_PROFILE, GET_PROPOSITIONS, GET_IMAGE, PRIVATE_ROUTE } from "../../../constants/routes";
import { fetchService } from "../../../services/fetch/fetchService";
import {
    selectUserInfo
} from "modules/auth/selectors";
import { StarFilled, GlobalOutlined  } from "@ant-design/icons";
const UserProfile = ( props ) => {
    const { userInfo } = props;
    let { userId } = useParams();
    const [ user, setUser ] = useState([]);
    const [roles, setRoles ] = useState([]);
    const [ propositions, setPropositions ] = useState([]);
    useEffect(() => {
       fetchUser();
console.log(userInfo.roles[0].name);
    
    }, []);
    useEffect(() => {
        fetchPropositions();
     }, []);
    const fetchUser = async (id) => {
        const [users] = await fetchService.fetch(GET_PROFILE( userId ), {
          method: 'GET'
        });
        setUser(users);
        setRoles(users.roles[0].name);
        console.log(users);
        
      }
      const fetchPropositions = async (id) => {
        const [propositon] = await fetchService.fetch(GET_PROPOSITIONS( userId ), {
          method: 'GET'
        });
        setPropositions(propositon.data); 
       
      }

    let avatar = (
        <div style={{ position: 'relative' }}>
            <StarFilled className="icon-star" style={{ fontSize: '15px' }} />
            <img
                className='giver-avatar'
                src="/images/10.jpg"
            ></img>
        </div>
    )
    let button = (
        <button className='follow-button'>
            <p>Follow</p>
        </button>
    )
    if (user.code_id == null) {
        avatar = (
            <img
                className='giver-avatar'
                src="/images/10.jpg"
            ></img>

        )
    }
      let buttonContent = (
        <Link to={PRIVATE_ROUTE.EDITPROFILE} >
        <ButtonAnt className="btn-block btn-round btn-red edit-profile-container">
        <FormattedMessage
            defaultMessage={"userProfile.sendMess"}
            id={"userProfile.sendMess"}
        />
        </ButtonAnt>
    </Link>
        
    );
    if(userInfo.id == user.id) {
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
        return _.map(propositions, ({title, photo_thumbnail})=> {
            return (

                <Link className="propositons-container">
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
        <div className={user.full_photo == null ? "nonPhotoCnntainer" : "userProfileContainer"} >
            <div className="image-background-div">
                <img className="image-background"  src={GET_IMAGE(user.full_photo)}/>
            </div>
            <div className="top-navbar-giver-home">
                <div className="navbar-giver-home-container">
                  {avatar}
                    <div className="info-user">
    <p className="username">{user.first_name} {user.last_name}</p>
                        <p className="user-charity">Charity: Water</p>
                    </div>
                </div>
                {button}
                
            </div>
            <div className="user-account-profile">
                {roles == 'taker' ? null : 
                <>
                <div className="account-profile-info">
            <span className="account-profile-number">{propositions.length}</span>
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
            <div>
                {roles == 'taker' ? <div className="link-to-propositions-container discription"><p >Discription about us</p></div> : <Link className="link-to-propositions-container">
                    <p >See all Propositions</p>
                    <img
                        src="/images/icon/arrow-next.svg"
                        className="Arrow-next"
                    ></img>
                </Link>}
            </div>
            {roles == 'taker' ? <><div className='link-to-propositions-container discription-detail'><p>The Mondetta Charity Foundation is a nonprofit organize bringing school & education to people in Uganda wwhen a community gets access to education, it can change everything</p></div>
            <div className='link-to-propositions-container link-taker-container'><GlobalOutlined className='link-taker-icon' /><p>www.mondettacharityfoundation.org</p></div>
             </>: <div className="prop-container">{renderFields()}</div>}
            <div className="form-control outlineButton edit-button-container">
                
                        {buttonContent}
                   
            </div>
            <div></div>
            <BottomNavigator />
        </div>
    );
};
const mapStateToProps = createStructuredSelector({
    userInfo: selectUserInfo()
});
export default connect(mapStateToProps)((UserProfile));
