import React, {Component} from 'react';
import './SignUpBackground.scss';



class SignUpBackground extends React.Component {
    render() {
      return(
         
              
          <div className='bgImage'>
          {this.props.children}
          </div>
         
       
      )
    }
  }
export default SignUpBackground;