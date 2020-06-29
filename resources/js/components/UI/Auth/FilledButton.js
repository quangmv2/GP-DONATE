import React, {Component} from 'react';
import { Button, Col } from 'framework7-react';
<<<<<<< HEAD
=======

>>>>>>> 62ca758e69d3ff2ff308d24105acbe96faebdfa0
import './button.scss';



class FilledButton extends React.Component {
    render() {
      return(
         
       
<<<<<<< HEAD
          <Button large className="filledButton" >{this.props.buttonContain}</Button>
=======
          <Button 
          click={this.props.onClick}
          href={this.props.href}
          large className="filledButton" >{this.props.buttonContain}</Button>
>>>>>>> 62ca758e69d3ff2ff308d24105acbe96faebdfa0
       
      
      )
    }
  }
export default FilledButton;