import React, {Component} from 'react';
import { Button, Col } from 'framework7-react';
import './button.scss';




class OutlineButton extends React.Component {
    render() {
      return(
         
       
          <Button outline large className='outlineButton' >{this.props.buttonContain}</Button>
       
      
      )
    }
  }
export default OutlineButton;