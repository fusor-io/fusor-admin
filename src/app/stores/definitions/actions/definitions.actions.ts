import { createAction, props } from '@ngrx/store';

import { Definitions } from '../../../models';
import { DefinitionsQuery } from '../type';

export const loadDefinitions = createAction('[definitions] Load', props<{ query: DefinitionsQuery }>());
export const loadDefinitionsSuccess = createAction('[definitions] Load success', props<{ data: Definitions }>());
export const loadDefinitionsFailed = createAction('[definitions] Load failed', props<{ error: unknown }>());
