import React, {useState} from 'react';
import Role from '../../../../../public/images/role.png';
import FilledButton from '../../Atoms/AuthButton/FilledButton';
import BottomText from '../../Atoms/AuthButton/BottomText';
import './chooseRole.scss';
export default function ChooseRoleScreen() {
  const [userRole, setUserRole] = useState();

  const onChangeValue = (event) => {
    setUserRole(event.target.value);
    console.log(userRole);
  };
  let content = <FilledButton buttonContain='Let the journey begin' />
  if (userRole == '0') {
    content = (
      <FilledButton href='/success-sign-up' buttonContain='Let the journey begin' />
    );
  } else  {
    content = (
      <FilledButton href='/input-code' buttonContain='Let the journey begin' />
    );
  }
  

      return( 
        <div className="container ">
        <p className='cr-t1'>One more step</p>
        <p className='cr-t2'>Who will you be</p>
        <div className="row">
  <div className="column" >
      <div className='row'>
  <div className="col-20"><input type='radio' className='radio' name="role" value="1" />  </div>
    <div className="col-80"><p className='roleText'>Generous <br /> Patron</p></div>
  </div></div>
  <div className="column">
      <div className='row'>
  <div className="col-20"><input type='radio' className='radio' name="role" value="0"/> </div>
<div className="col-80"><p className='roleText'>Generous <br /> Implementer</p></div>
  </div></div>
</div>
        
        
        <img src={Role} className='image'/>
          <div className='filledButton'>
          {content}
           </div>
           <div className='bottomTextContainer'>
    <BottomText 
    text='You  cant change your role in per account'
    />
    </div>
      
      </div>
  )
}

