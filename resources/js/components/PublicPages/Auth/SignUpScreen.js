import React from 'react';
import SignInBackground from '../../Atoms/AuthBackground/SignInBackground';
import userIcon from '../../../../../public/images/user-icon.png';
import signUpFields from './signUpFields';
import FilledButton from '../../Atoms/AuthButton/FilledButton';
import OutlineButton from '../../Atoms/AuthButton/OutlineButton';
import BottomText from "../../Atoms/AuthButton/BottomText";
import './signUp.scss';

export class SignUpScreen extends React.Component{
    renderFields() {
        return _.map(signUpFields, ({label, icon, type}) => {
            
          return (
            <div className='formContainer'>
            <p className='label'>{label}</p>
      <div class="inputContainer">
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
           <SignInBackground>
                    <p className='text1'>Sign Up</p>
                    <p className='text2'>Making generosity easy</p>
                    </SignInBackground>
                    <div className='formFields'>
         {this.renderFields()}
         </div>
         <div className='filledButton'>
               <FilledButton
               href='/signup' 
               buttonContainer=' Create an account'
               />
          </div> 
          <div className='outlineButton'>
               <OutlineButton
               href='/signup' 
               buttonContainer='Got an Invitation Code'
               />
          </div> 
          <div className='bottomTextContainer'>
    <BottomText 
    href='/'
    text='Already onboard'
    linkContent='  Sign In'
    />
    </div>
          </div>
    )
};
}
export default SignUpScreen;
