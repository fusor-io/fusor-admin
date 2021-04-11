import { Action, createReducer, on } from '@ngrx/store';
import { produce } from 'immer';

import * as ownActions from '../actions/definitions.actions';
import { State } from '../type';

export const initialState: State = {
  inProgress: false,
  error: undefined,
  data: undefined,
};

const featureReducer = createReducer(
  initialState,

  on(ownActions.loadDefinitions, state =>
    produce(state, newState => {
      newState.inProgress = true;
      newState.error = undefined;
      newState.data = undefined;
    }),
  ),

  on(ownActions.loadDefinitionsSuccess, (state, action) =>
    produce(state, newState => {
      newState.inProgress = false;
      newState.data = action.data;
    }),
  ),

  on(ownActions.loadDefinitionsFailed, (state, action) =>
    produce(state, newState => {
      newState.inProgress = false;
      newState.error = action.error;
    }),
  ),
);

export const reducer = (state: State | undefined, action: Action) => featureReducer(state, action);
