import React from 'react';

export function isDevelopEnv() {
  return process.env.REACT_APP_NODE_ENV === 'development';
}

export const renderIcon = (iconName) => (
  <span className={iconName} data-test={iconName}>
    <span className="path1" />
    <span className="path2" />
    <span className="path3" />
  </span>
);

export const getBodyHeight = () => {
  const bodyWrapper = document.getElementById('body_wrapper');
  return bodyWrapper?.offsetHeight;
};

export const getTableHeight = () => window.innerHeight - 290;

export const replaceBetween = (org, start, end, ins) => {
  if (ins !== '') {
    return org.substring(0, start) + ins + org.substring(end);
  }
  return org;
};
