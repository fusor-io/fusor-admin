import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { Definitions } from '../../../models';
import { DefinitionsQuery } from '../type';

@Injectable({ providedIn: 'root' })
export class DefinitionsApiService {
  private readonly _api = environment.apiUrl;

  constructor(private readonly _httpClient: HttpClient) {}

  load(query: DefinitionsQuery): Observable<Definitions> {
    return this._httpClient.get<Definitions>(`${this._api}/definitions/${query.type}`);
  }
}
