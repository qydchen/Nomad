import merge from 'lodash/merge';

import {
  RECEIVE_CURRENT_USER,
  RECEIVE_ERRORS,
  CLEAR_ERRORS,
  RECEIVE_CONFIRMATION,
  CLEAR_CONFIRMATION,
} from '../actions/session_actions';

const defaultUser = {
  currentUser: null,
  errors: []
};

const SessionReducer = (state = defaultUser, action) => {
  Object.freeze(state);
  let errors;
  let newState;
  switch(action.type) {
    case RECEIVE_CURRENT_USER:
      const currentUser = action.currentUser;
      return merge({}, defaultUser, { currentUser });
    case RECEIVE_ERRORS:
      return merge({}, state, { errors: action.errors });
    case CLEAR_ERRORS:
      return merge({}, state, { errors: [] });
    default:
      return state;
  }
};

export default SessionReducer;
