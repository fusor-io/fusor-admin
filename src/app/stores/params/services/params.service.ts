import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { NodeParamValues } from '../../../models';

@Injectable({ providedIn: 'root' })
export class ParamsApiService {
  private readonly _api = 'http://localhost:3000';

  constructor(private readonly _httpClient: HttpClient) {}

  load(): Observable<NodeParamValues> {
    return this._httpClient.get<NodeParamValues>(`${this._api}/aggregate/filter`);
  }
}
