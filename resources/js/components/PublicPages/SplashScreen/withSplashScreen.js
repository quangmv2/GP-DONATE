import React, {Component} from 'react';
import './splash-screen.css';
import ima1 from '../../../../../public/images/Bitmap1.png';
import ima2 from '../../../../../public/images/Bitmap.png';
import logo from '../../../../../public/images/logo.png';

function SplashScreen() {
  return (
    <div class="fullheight-wrapper splash-screen">
    <div className="container ">
      <img src={ima1} className="image1" />
      <img src={ima2} className="image2" />
      <img src={logo} className="logo" />
      </div>
 </div>
    
  );
}

function withSplashScreen(WrappedComponent) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        loading: true,
      };
    }

    async componentDidMount() {
      try {
        setTimeout(() => {
          this.setState({
            loading: false,
          });
        }, 300000)
      } catch (err) {
        console.log(err);
        this.setState({
          loading: false,
        });
      }
    }

    render() {
      
      if (this.state.loading) return SplashScreen();

      
      return <WrappedComponent {...this.props} />;
    }
  };
}

export default withSplashScreen;