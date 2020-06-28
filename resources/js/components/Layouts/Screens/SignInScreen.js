import React, {Component} from 'react';
import { Link, Row, Input, Block, Icon } from 'framework7-react';
import './SignUp.scss';
import SignUpBackground from '../../UI/Auth/SignUpBackground';
import FilledButton from '../../UI/Auth/FilledButton';
import OutlineButton from '../../UI/Auth/OutlineButton';
import signInFields from '../../UI/Auth/signInFields';




class SignInScreen extends React.Component {
  renderFields() {
    return _.map(signInFields, ({label, name, type}) => {
      return (
        <div>
        <p>{label}</p>
        <Row>
        <Input 
        type={type}
        />
       <Icon icon="icon-back"></Icon>
       </Row>
        <hr />
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