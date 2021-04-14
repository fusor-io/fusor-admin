import { NodeParamValues } from '../../../models';

export interface State {
  readonly inProgress: boolean;
  readonly error: unknown;
  readonly data: NodeParamValues | undefined;
}
