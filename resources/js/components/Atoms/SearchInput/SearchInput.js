import React, { useState, useEffect } from "react";
import cn from 'classnames';
import PropTypes from "prop-types";
import "./styles.scss";

const SearchInput = props => {

  const [focus, setFocus] = useState(false);

  const onFocusInput = () => {
      setFocus(true);
  }

  const onBlueInput = () => {
      setFocus(false);
  }

  const { content } = props;

  return (
    <div className="search-container">
        <input 
          type="text" 
          placeholder="Search"
          onFocus={ onFocusInput } 
          onBlur={ onBlueInput } 
          onChange={props.onChange}
          value={props.value}
        />
        <button className={cn(focus ?"icon-search-active": "icon-search-normal"," icon-search")}></button>
    </div>
  );
};

SearchInput.defaultProps = {

};

SearchInput.propTypes = {

};

export default SearchInput;
