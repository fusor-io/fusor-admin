import { createFeatureSelector, createSelector } from '@ngrx/store';

import { DEFINITION_FEATURE_NAME } from '../const/feature-name.const';
import { State } from '../type';

export const selectDefinitionState = createFeatureSelector<State>(DEFINITION_FEATURE_NAME);
export const selectDefinition = createSelector(selectDefinitionState, state => state.data);
export const selectInProgress = createSelector(selectDefinitionState, state => state.inProgress);
export const selectError = createSelector(selectDefinitionState, state => state.error);
