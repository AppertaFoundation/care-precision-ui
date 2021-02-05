import { createSelector } from 'reselect';

const auth = state => state.auth || { username: null };

export const selectAuth = createSelector(auth, auth => auth.username);

const LOG_IN = 'LOG_IN';
const LOG_OUT = 'LOG_OUT';

export const signIn = value => ({
  type: LOG_IN,
  payload: value,
});

export const logOut = () => ({
  type: LOG_OUT,
});
interface IinitialState {
  username: string | null;
}
const initialState: IinitialState = {
  username: null,
};
export function authReducer(state = initialState, action) {
  switch (action.type) {
    case 'LOG_IN':
      return { username: action.payload.username };
    case 'LOG_OUT':
      return { username: null };
    default:
      return state;
  }
}
