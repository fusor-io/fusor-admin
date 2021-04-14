import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PARAMS_FEATURE_NAME } from '../const/feature-name.const';
import { State } from '../type';

export const selectParamsState = createFeatureSelector<State>(PARAMS_FEATURE_NAME);
export const selectParams = createSelector(selectParamsState, state => state.data);
export const selectInProgress = createSelector(selectParamsState, state => state.inProgress);
export const selectError = createSelector(selectParamsState, state => state.error);
