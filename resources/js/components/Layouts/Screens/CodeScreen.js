import React, {Component} from 'react';
import { Link, Input, Row, Icon } from 'framework7-react';
import SignUpBackground from '../../UI/Auth/SignUpBackground';
import FilledButton from '../../UI/Auth/FilledButton';
import OutlineButton from '../../UI/Auth/OutlineButton';

import './CodeScreen.scss';
import codeFields from '../../UI/Auth/codeFields';





class CodeScreen extends React.Component {
  renderFields() {
    return _.map(codeFields, ({label, name, type}) => {
      return (
        <div>
        <p className='label'>{label}</p>
        <Row>
        <Icon icon="icon-back"></Icon>
        <Input 
        name={name}
        type={type}
        />
      
       
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
          <p className='code-t1'>Sign up by</p>
          <p className='code-t2'>Invitation Code</p>
          </SignUpBackground>
        <div className='formFields'>
          {this.renderFields()}
          </div>
          <div className='filledButton'>
          <FilledButton 
          buttonContain='Submit Invitation Code'
          />
           </div>
           <div className='outlineButton'>
          <OutlineButton 
          buttonContain='Create an account'
          />
          </div>
          <p className='bottomText'>Already onboard? <Link><p className='bottomLink'>Sign In</p></Link></p>
         
      
      </div>
  )
}
}
export default CodeScreen;