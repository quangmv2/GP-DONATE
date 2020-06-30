import React, { Component} from 'react';




class OutlineButton extends Component {
    render() {
      return(
          <a href={this.props.href}>
              <button className='ol-bn-container'>{this.props.buttonContainer}</button>
          </a>

         
       
      )
    }
 
  }
export default OutlineButton;