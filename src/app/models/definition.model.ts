import { JsonMap } from './../type/json.type';

export interface Definition {
  type: string;
  key: string;
  definition: JsonMap;
}

export type Definitions = Definition[];

export enum DefinitionType {
  flow = 'flow',
  stateMachine = 'sm',
  collector = 'collector',
  exporter = 'exporter',
}
