import { createAction, props } from '@ngrx/store';

import { Definition } from '../../../models';
import { DefinitionQuery } from '../type';

export const loadDefinition = createAction('[definition] Load', props<{ query: DefinitionQuery }>());
export const loadDefinitionSuccess = createAction('[definition] Load success', props<{ data: Definition }>());
export const loadDefinitionFailed = createAction('[definition] Load failed', props<{ error: unknown }>());

export const saveDefinition = createAction('[definition] Save', props<{ data: Definition }>());
export const saveDefinitionSuccess = createAction('[definition] Save success');
export const saveDefinitionFailed = createAction('[definition] Save failed', props<{ error: unknown }>());
