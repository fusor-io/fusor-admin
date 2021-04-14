import { Action, createReducer, on } from '@ngrx/store';
import { produce } from 'immer';

import * as ownActions from '../actions/params.actions';
import { State } from '../type';

export const initialState: State = {
  inProgress: false,
  error: undefined,
  data: [],
};

const featureReducer = createReducer(
  initialState,

  on(ownActions.loadParams, state =>
    produce(state, newState => {
      newState.inProgress = true;
      newState.error = undefined;
    }),
  ),

  on(ownActions.loadParamsSuccess, (state, action) =>
    produce(state, newState => {
      newState.inProgress = false;
      newState.data = action.data;
    }),
  ),

  on(ownActions.loadParamsFailed, (state, action) =>
    produce(state, newState => {
      newState.inProgress = false;
      newState.error = action.error;
    }),
  ),
);

export const reducer = (state: State | undefined, action: Action) => featureReducer(state, action);
