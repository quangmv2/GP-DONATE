
import React, {Component} from 'react';
import { Page, Radio, Link, Row } from 'framework7-react';

import FilledButton from '../../UI/Auth/FilledButton';

import './ChooseRole.scss';
import Role from '../../../../../public/images/role.png';
import 'framework7-icons';





class SuccessSignUp extends React.Component {
    render() {
      return(
        <Page>
       
         
       <Link> <i className="f7-icons">chevron_left</i><p className='back-text'>Back</p></Link>
        
        <Link></Link>
    
        <p className='cr-t1'>Welcome</p>
        <p className='cr-t2'>Sign Up Success</p>
       
        
        
        <img src={Role} className='image'/>
    
          <div className='cf-choice'>
          <FilledButton 
          href='/'
          buttonContain='Back To Login'
          />
           </div>
          
      
      </Page>
  )
}
}
export default SuccessSignUp;