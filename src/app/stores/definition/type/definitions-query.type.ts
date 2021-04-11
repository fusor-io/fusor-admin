import { DefinitionType } from '../../../models';

export interface DefinitionsQuery {
  type: DefinitionType;
}

export interface DefinitionQuery {
  type: DefinitionType;
  key: string;
}
