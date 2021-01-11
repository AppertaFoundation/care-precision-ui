/**
 * Global selectors
 */

//Session
import { createSelector } from 'reselect';

const sessionState = state => state.session;
const sessionSelector = createSelector(sessionState, session => session);

export { sessionSelector };
