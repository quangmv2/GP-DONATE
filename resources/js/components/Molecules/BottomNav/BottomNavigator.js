import React, { memo, useEffect } from 'react';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import PersonOutlineRoundedIcon from '@material-ui/icons/PersonOutlineRounded';
import { Link } from 'react-router-dom';
import { PRIVATE_ROUTE } from 'constants';

import {
  selectUserInfo,
  selectIsLogged
} from "modules/auth/selectors";
import './bottomNav.scss';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

const BottomNavigator = props => {

  const { userInfo } = props;
  console.log(window.location.pathname);
  return (
    <div className='bottom-nav-container'>
      <div className='bottom-nav'>
        <div className='bottom-nav-icon-container'>
          <Link to={PRIVATE_ROUTE.HOME} className={window.location.pathname === "/" ? 'active' : ''}>
            <HomeIcon className='icon-bottom-nav' />
            Home
          </Link>
        </div>
        <div className='bottom-nav-icon-container'>
          <Link to='/search' className={window.location.pathname === "/search" ? 'active' : ''}>
            <SearchIcon className='icon-bottom-nav' />
            Search
          </Link>
        </div>
        {
          userInfo && userInfo.roles && userInfo.roles.length > 0 && userInfo.roles[0].name != "taker" ?
            <div className='bottom-nav-icon-container '>
              <Link to={PRIVATE_ROUTE.POST_OFFER} className='center-button'>
                <div className='circle-plus-wrapper'>
                  <div className='cirlce-plus-icon'></div>
                </div>
                Post Offer
              </Link>
            </div>:
            <></>
        }
        <div className='bottom-nav-icon-container'>
          <Link to='/activities' className={window.location.pathname === "/activities" ? 'active' : ''}>
            <StarBorderRoundedIcon className='icon-bottom-nav' />
            Activities
          </Link>
        </div>
        <div className='bottom-nav-icon-container'>
          <Link to='/profile-setting' className={window.location.pathname === "/my-profile" ? 'active' : ''}>
            <PersonOutlineRoundedIcon className='icon-bottom-nav' />
            Account
          </Link>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  userInfo: selectUserInfo(),
  logged: selectIsLogged()
});
const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(memo(BottomNavigator));
