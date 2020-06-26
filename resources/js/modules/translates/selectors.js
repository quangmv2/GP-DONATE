import { createSelector } from 'reselect';
import { SYSTEM_TRANSLATE } from './constants';
const getTranslateState = state => state[SYSTEM_TRANSLATE];
const getLanguageCode = () =>
  createSelector(
    getTranslateState,
    state => state.get('languageCode'),
  );

export { getLanguageCode };
