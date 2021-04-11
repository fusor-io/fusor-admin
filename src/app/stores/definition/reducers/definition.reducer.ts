import { Action, createReducer, on } from '@ngrx/store';
import { produce } from 'immer';

import * as ownActions from '../actions/definition.actions';
import { State } from '../type';

export const initialState: State = {
  inProgress: false,
  error: undefined,
  data: undefined,
};

const featureReducer = createReducer(
  initialState,

  on(ownActions.loadDefinition, state =>
    produce(state, newState => {
      newState.inProgress = true;
      newState.error = undefined;
      newState.data = undefined;
    }),
  ),

  on(ownActions.loadDefinitionSuccess, (state, action) =>
    produce(state, newState => {
      newState.inProgress = false;
      newState.data = action.data;
    }),
  ),

  on(ownActions.loadDefinitionFailed, (state, action) =>
    produce(state, newState => {
      newState.inProgress = false;
      newState.error = action.error;
    }),
  ),

  on(ownActions.saveDefinition, (state, action) =>
    produce(state, newState => {
      newState.inProgress = true;
      newState.error = undefined;
      newState.data = action.data;
    }),
  ),

  on(ownActions.saveDefinitionSuccess, state =>
    produce(state, newState => {
      newState.inProgress = false;
    }),
  ),

  on(ownActions.saveDefinitionFailed, (state, action) =>
    produce(state, newState => {
      newState.inProgress = false;
      newState.error = action.error;
    }),
  ),
);

export const reducer = (state: State | undefined, action: Action) => featureReducer(state, action);
