import React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import './Success.scss';
import { Link } from 'react-router-dom';
import { ROUTE } from '../../../constants';
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const tutorialSteps = [
  {
    imgPath:
      'images/FullScreen/step1.jpg',
  },
  {
  
    imgPath:
      'images/FullScreen/step2.jpg',
  },
  {
    imgPath:
      'images/FullScreen/step3.jpg',
  }
  ]



const SuccessScreen = props => {
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div className='container'>
      <AutoPlaySwipeableViews
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {tutorialSteps.map((step, index) => (
          <div key={step.label}>
            {Math.abs(activeStep - index) <= 2 ? (
              <img  className ='image' src={step.imgPath} alt={step.label} />

            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
 
     {/* { activeStep !== maxSteps - 1 ?  <button className='next-button' onClick={handleNext}>Hello</button> :  <Link to={ROUTE.HOME}>To Home</Link>} */}
{  activeStep !== maxSteps - 1 ?  <button className='next-button' onClick={handleNext}>Hello</button> : <Link to={ROUTE.HOME} className='next-button'>To Home</Link>}
      <Link className ='skip-link' to={ROUTE.HOME}>To Home</Link>
 
    </div>
    
  );
}

export default SuccessScreen;