const logger = store => next => action => {
  console.group(action.type);
  console.log("dispatching: ", action);
  const result = next(action);
  console.log("next state: ", store.getState().toJS());
  console.groupEnd(action.type);
  return result;
};

export default logger;
