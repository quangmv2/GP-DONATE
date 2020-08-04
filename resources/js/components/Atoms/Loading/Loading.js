import React, { memo } from 'react';
import './loading.module.scss';

const Loading = (props) => {
  return (
    <div className={"loading"}>
      <div className={"loader"} style={{width: props.width, height: props.height}}>
      </div>
    </div>
  )
}
export default memo(Loading);

Loading.defaultProps = {
  width: 40,
  height: 40
}