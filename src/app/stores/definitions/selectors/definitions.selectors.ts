import { createFeatureSelector, createSelector } from '@ngrx/store';

import { DEFINITIONS_FEATURE_NAME } from '../const/feature-name.const';
import { State } from '../type';

export const selectDefinitionsState = createFeatureSelector<State>(DEFINITIONS_FEATURE_NAME);
export const selectDefinitions = createSelector(selectDefinitionsState, state => state.data);
export const selectInProgress = createSelector(selectDefinitionsState, state => state.inProgress);
export const selectError = createSelector(selectDefinitionsState, state => state.error);
