import { createAction, props } from '@ngrx/store';

import { NodeParamValues } from '../../../models';

export const loadParams = createAction('[params] Load');
export const loadParamsSuccess = createAction('[params] Load success', props<{ data: NodeParamValues }>());
export const loadParamsFailed = createAction('[params] Load failed', props<{ error: unknown }>());
