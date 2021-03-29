import types from '../types/auth.types';

// const state = {
//   userName : 'cris',
//   logged   : true,
// };

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        ...action.payload,
        loged: true,
      };
    case types.logout:
      return {
        ...action.payload,
        loged: false,
      };
    default:
      return state;
  }
};

export default authReducer;
