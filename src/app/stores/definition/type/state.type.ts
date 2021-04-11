import { Definition } from '../../../models';

export interface State {
  readonly inProgress: boolean;
  readonly error: unknown;
  readonly data: Definition | undefined;
}
