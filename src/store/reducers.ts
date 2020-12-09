/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit';
import { sessionReducer } from 'redux-react-session';
import { InjectedReducersType } from 'utils/types/injector-typings';
import { assessmentReducer } from './assessmentTypeReducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers: InjectedReducersType = {}) {
  // Initially we don't have any injectedReducers,
  //so returning only session and others globals reducer to avoid the error
  if (Object.keys(injectedReducers).length === 0) {
    return combineReducers({
      session: sessionReducer,
      assessmentType: assessmentReducer,
    });
  } else {
    return combineReducers({
      session: sessionReducer,
      assessmentType: assessmentReducer,
      ...injectedReducers,
    });
  }
}
