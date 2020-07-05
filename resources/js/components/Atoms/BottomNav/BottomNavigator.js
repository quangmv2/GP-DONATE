import React from "react";
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import './bottomNav.scss';
import StarBorderRoundedIcon from '@material-ui/icons/StarBorderRounded';
import PersonOutlineRoundedIcon from '@material-ui/icons/PersonOutlineRounded';
export default function BottomNavigator() {


  return (
   <div className='bottom-nav-container'>
    <div className="bottom-nav">
      <div className='bottom-nav-icon-container'>
      <HomeIcon style={{ color: 'white', fontSize: '18px' }}/>
    <Link to='' className="active">Home</Link>
    </div>
    <div className='bottom-nav-icon-container'>
    <SearchIcon style={{ color: 'white', fontSize: '18px'}} />
    <Link to='' className="active">Search</Link>
    </div>
    <div className='bottom-nav-icon-container'>
    <AddCircleRoundedIcon style={{ color: '#ddae53', fontSize: '22px',
    position: 'relative',
    top: '-20px',
    zIndex: 2 }}/>
    <Link to='' className="active">Post Offer</Link>
    </div>
    <div className='bottom-nav-icon-container'>
    <StarBorderRoundedIcon style={{ color: 'white', fontSize: '18px' }} />
    <Link to='' className="active">Activities</Link>
    </div>
    <div className='bottom-nav-icon-container'>
    <PersonOutlineRoundedIcon style={{ color: 'white', fontSize: '18px' }}/>
    <Link to='' className="active">Account</Link>
    </div>
  </div>
  </div>
  
 
  );
}
