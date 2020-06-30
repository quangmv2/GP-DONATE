import React from 'react';
import SignInBackground from '../../Atoms/AuthBackground/SignInBackground';
import userIcon from '../../../../../public/images/user-icon.png';
import { Link }from 'react-router-dom';
import FilledButton from '../../Atoms/AuthButton/FilledButton';
import OutlineButton from '../../Atoms/AuthButton/OutlineButton';
import BottomText from "../../Atoms/AuthButton/BottomText";
import './inputCode.scss';
import inputFields from './inputFields';

export class InputCode extends React.Component{
    renderFields() {
        return _.map(inputFields, ({label, icon, type}) => {
            
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
                    <p className='ic-t1'>Sign up by</p>
                    <p className='ic-t2'>Invitation Code</p>
                    </SignInBackground>
                    <div className='formFields'>
         {this.renderFields()}
         </div>
         <div className='filledButton'>
               <FilledButton
               href='/' 
               buttonContainer='Submit Invitation Code'
               />
          </div> 
          <div className='outlineButton'>
               <OutlineButton
               href='/' 
               buttonContainer='Create an account'
               />
          </div> 
          <div className='bottomTextContainer'>
  <Link to='/'>        
    <BottomText 
    //href='/'
    text='Already onboard'
    linkContent='  Sign In'
    />
    </Link>
    </div>
          </div>
    )
};
}
export default InputCode;
