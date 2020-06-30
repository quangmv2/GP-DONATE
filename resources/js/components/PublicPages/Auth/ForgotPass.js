import React from 'react';
import SignInBackground from '../../Atoms/AuthBackground/SignInBackground';
import userIcon from '../../../../../public/images/user-icon.png';
import FilledButton from '../../Atoms/AuthButton/FilledButton';
import OutlineButton from '../../Atoms/AuthButton/OutlineButton';
import BottomText from "../../Atoms/AuthButton/BottomText";
import './signUp.scss';

import forgotPassFields from './forgotPassFields';

export class ForgotPass extends React.Component{
    renderFields() {
        return _.map(forgotPassFields, ({label, type}) => {
            
          return (
            <div className='formContainer'>
            <p className='label'>{label}</p>
      <div class=" inputContainer">
       <img className='formIcon' src={userIcon}/>
        <div class="textInput"> <input className='input' type={type} /> </div>
      
      <hr className='borderInput'/>
      </div>
            </div>
            
          
          )
        })
      };
  render() {  
    return (
       <div className='container'>
           
                    <p className='text1'>Forgot password</p>
                    <p className='text2'>Please enter your email address</p>
                   
                    <div className='formFields'>
         {this.renderFields()}
         </div>
         <div className='filledButton'>
               <FilledButton
               href='/reset-password' 
               buttonContainer='Send a code'
               />
          </div> 
          <div className='bottomTextContainer'>
    <BottomText 
    href='/'
    text='Im a newbie'
    linkContent='  Sign Up'
    />
    </div>
          
          </div>
    )
};
}
export default ForgotPass;
