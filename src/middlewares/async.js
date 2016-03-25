export default function({ displatch }) {
  // will return next function, then run action function
  return next => action => {
    console.log(action);
    // If action does not have a payload
    // or, the payload does not have a .then property
    // we don't care about it, send it on
    if (!action.payload || !action.payload.then) {
      return next(action);
    }

    // Make sure the action's promise resolves
    action.payload
     .then(function(response) {
       // create a new action with teh old type, but
       // replace the promise with the response data
       const newAction = { ...action, payload:response }
       displatch(newAction);
     });
  }
  /* Equivalent to:
    return function(next) {
      return function(action);
      next(action);
    }
  */
}
