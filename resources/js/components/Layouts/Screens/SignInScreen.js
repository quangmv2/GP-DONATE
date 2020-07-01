import React, {Component} from 'react';
import { Link, Row, Input, Block, Icon } from 'framework7-react';
import './SignUp.scss';
import SignUpBackground from '../../UI/Auth/SignUpBackground';
import FilledButton from '../../UI/Auth/FilledButton';
import OutlineButton from '../../UI/Auth/OutlineButton';
import signInFields from '../../UI/Auth/signInFields';




class SignInScreen extends React.Component {
  renderFields() {
    return _.map(signInFields, ({label, icon, type}) => {
      return (
        <div className='formContainer'>
        <p className='label'>{label}</p>
      
  <div class="row inputContainer">
    <div class="col-10"><i class="f7-icons inputIcon">{icon}</i></div>
    <div class="col-90 textInput"> <input type={type} /> </div>
  </div>
  <hr className='borderInput'/>
        
        </div>
        
      
      )
    })
  }
    render() {
      return(
          <div>
            
              <SignUpBackground>
              <p className='text1'>Sign In</p>
          <p className='text2'>To keep connected with us</p>
              </SignUpBackground>
             <div className='formFields'>
              {this.renderFields()}
              </div>
              <Link><p className='fg-pw-text'>Forgot your password?</p></Link>
              <div className='filledButton'>
              <FilledButton
              buttonContain='Sign In'
              />
               </div>
               
              
              <p className='bottomText'>I'm a newbie <Link ><p className='bottomLink'>Sign Up</p></Link></p>
             
          
          </div>
      )
    }
  }
export default SignInScreen;