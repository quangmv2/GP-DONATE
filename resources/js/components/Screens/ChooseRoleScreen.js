import React, {Component} from 'react';
import { Page, Radio, Link, Row } from 'framework7-react';

import FilledButton from '../../UI/Auth/FilledButton';

import './ChooseRole.scss';
import Role from '../../../../../public/images/role.png';
import 'framework7-icons';





class ChooseRoleScreen extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();

    
    const { role } = this.form;
    const x = role.value;
    console.log(x);
  }
    render() {
      return(
        <Page>
       <Link><i className="f7-icons">chevron_left</i><p className='back-text'>Back</p></Link>
        
        <Link></Link>
    
        <p className='cr-t1'>One more step</p>
        <p className='cr-t2'>Who you will be</p>
        <form 

        class="row colContainer">
    <div className="col ">
      <div class="row giverCol">
    <div class="col-20"><Radio className='radio' name="role" value="Give"/>  </div>
    <div class="col-80"><p className='roleText'>The Giver</p></div>
  </div></div>
    <div class="col ">
      <div class="row takerCol">
    <div class="col-20"><Radio name="role" value="taker"/> </div>
    <div class="col-80"><p className=' takerText'>The Taker</p></div>
  </div></div>
  
  </form>
        
        
        <img src={Role} className='image'/>
    
          <div className='cf-choice'>
          <FilledButton 
          
          href='/success-sign-up'
          buttonContain='Confirm your choice'
          />
           </div>
           <p className='bottomText'>You can't change your role in per account</p>
      
      </Page>
  )
}
}
export default ChooseRoleScreen;