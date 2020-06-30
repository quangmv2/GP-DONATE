
import React, { Component} from 'react';




class FilledButton extends Component {
    render() {
      return(
          <div>
            <p className='bottomText'>{this.props.text} <a className='bottomLink' href={this.props.href}>{this.props.linkContent}</a></p>
          </div>

         
       
      )
    }
 
  }
export default FilledButton;