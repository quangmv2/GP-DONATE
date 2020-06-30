import React, { Component} from 'react';




class FilledButton extends Component {
    render() {
      return(
          <a href={this.props.href}>
              <button className='buttonContainer'>{this.props.buttonContainer}</button>
          </a>

         
       
      )
    }
 
  }
export default FilledButton;