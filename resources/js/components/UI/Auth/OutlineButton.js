import React, {Component} from 'react';
import { Button, Col } from 'framework7-react';
import './button.scss';




class OutlineButton extends React.Component {
    render() {
      return(
         
       
<<<<<<< HEAD
          <Button outline large className='outlineButton' >{this.props.buttonContain}</Button>
=======
          <Button 
          href={this.props.href}
          outline large className='outlineButton' >{this.props.buttonContain}</Button>
>>>>>>> 62ca758e69d3ff2ff308d24105acbe96faebdfa0
       
      
      )
    }
  }
export default OutlineButton;