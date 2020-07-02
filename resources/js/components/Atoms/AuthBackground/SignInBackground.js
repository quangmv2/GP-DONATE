import React, { Component} from 'react';
import './SignInBackground.scss';



class SignInBackground extends Component {
    render() {
      return(
          <div className='bgImage'>
          {this.props.children}
          </div>
         
       
      )
    }
 
  }
export default SignInBackground;