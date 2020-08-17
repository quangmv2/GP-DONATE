import React, { memo } from 'react';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import SearchIcon from '@material-ui/icons/Search';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import PersonOutlineRoundedIcon from '@material-ui/icons/PersonOutlineRounded';
import { Link } from 'react-router-dom';
import { PRIVATE_ROUTE } from 'constants';
import {
  selectUserInfo,
} from "modules/auth/selectors";
import './bottomNav.scss';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { FormattedMessage } from "react-intl";
import { useLocation } from "react-router-dom";

const BottomNavigator = props => {

  const location = useLocation();
  const { userInfo } = props;

  return (
    <div className='bottom-nav-container' style={props.style ?? null}>
      <div className='bottom-nav'>
        <div className='bottom-nav-icon-container'>
          <Link to="" className={location.pathname === "/" ? 'active' : ''}>
            <HomeOutlinedIcon className='icon-bottom-nav' />
            <FormattedMessage
              id="bottomNav.home"
              defaultMessage="bottomNav.home"
            />
          </Link>
        </div>
        <div className='bottom-nav-icon-container'>
          <Link to='/search' className={location.pathname === "/search" ? 'active' : ''}>
            <SearchIcon className='icon-bottom-nav' />
            <FormattedMessage
              id="bottomNav.search"
              defaultMessage="bottomNav.search"
            />
          </Link>
        </div>
        {
          userInfo && userInfo.roles && userInfo.roles.length > 0 && userInfo.roles[0].name != "taker" ?
            <div className='bottom-nav-icon-container '>
              <Link to={PRIVATE_ROUTE.POST_OFFER} className='center-button'>
                <div className='circle-plus-wrapper'>
                  <div className='cirlce-plus-icon'></div>
                </div>
                <FormattedMessage
                  id="bottomNav.post"
                  defaultMessage="bottomNav.post"
                />
              </Link>
            </div> :
            <></>
        }
        <div className='bottom-nav-icon-container'>
          <Link to='/activities' className={location.pathname === "/activities" ? 'active' : ''}>
            <StarBorderRoundedIcon className='icon-bottom-nav' />
            <FormattedMessage
              id="bottomNav.activities"
              defaultMessage="bottomNav.activities"
            />
          </Link>
        </div>
        <div className='bottom-nav-icon-container'>
          <Link to='/profile-setting' className={location.pathname === "/my-profile" ? 'active' : ''}>
            <PersonOutlineRoundedIcon className='icon-bottom-nav' />
            <FormattedMessage
              id="bottomNav.account"
              defaultMessage="bottomNav.account"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};
const mapStateToProps = createStructuredSelector({
  userInfo: selectUserInfo(),
});
const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(memo(BottomNavigator));
