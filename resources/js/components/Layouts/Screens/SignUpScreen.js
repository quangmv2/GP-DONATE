import React, {Component} from 'react';
import { Link, Page, Input, Block, List, Row} from 'framework7-react';
import './SignUp.scss';
import SignUpBackground from '../../UI/Auth/SignUpBackground';
import FilledButton from '../../UI/Auth/FilledButton';
import OutlineButton from '../../UI/Auth/OutlineButton';
import signUpFields from '../../UI/Auth/signUpFields';



class SignUpScreen extends React.Component {
  renderFields() {
    return _.map(signUpFields, ({label, icon, type}) => {
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
          <Page>
           
              <SignUpBackground>
                
              <p className='text1'>Sign Up</p>
              <p className='text2'>Welcome to Generous People</p>
            
              </SignUpBackground>
                <div className='formFields'>
                {this.renderFields()}
             </div>
              <div className='filledButton'>
              <FilledButton
              buttonContain='Create an account'
              />
              </div>
               <div className='outlineButton'>
              <OutlineButton 
              buttonContain='Got an Invitation Code'
              />
              </div>
        
              <p className='bottomText'>Already onboard? <Link><p className='bottomLink'>Sign In</p></Link></p>
             
          
          </Page>
      )
    }
  }
export default SignUpScreen;