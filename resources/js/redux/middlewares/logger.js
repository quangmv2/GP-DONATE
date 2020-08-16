const logger = store => next => action => {
  // console.group(action.type);
  // console.log("dispatching: ", action);
  // console.log("next state: ", store.getState().toJS());
  // console.groupEnd(action.type);
  const result = next(action);
  return result;
};

export default logger;
