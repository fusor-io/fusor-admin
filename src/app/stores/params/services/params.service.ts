import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { NodeParamValues } from '../../../models';

@Injectable({ providedIn: 'root' })
export class ParamsApiService {
  private readonly _api = environment.apiUrl;

  constructor(private readonly _httpClient: HttpClient) {}

  load(): Observable<NodeParamValues> {
    // TODO implement last-modified header logic to reduce network traffic and updates of store
    return this._httpClient.get<NodeParamValues>(`${this._api}/aggregate/filter`);
  }
}
