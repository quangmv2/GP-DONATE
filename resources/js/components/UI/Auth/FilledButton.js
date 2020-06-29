import React, {Component} from 'react';
import { Button, Col } from 'framework7-react';
import './button.scss';



class FilledButton extends React.Component {
    render() {
      return(
         
       
          <Button large className="filledButton" >{this.props.buttonContain}</Button>
       
      
      )
    }
  }
export default FilledButton;