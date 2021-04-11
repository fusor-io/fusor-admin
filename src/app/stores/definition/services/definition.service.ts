import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';

import { Definition } from '../../../models';
import { DefinitionQuery } from '../type';

@Injectable({ providedIn: 'root' })
export class DefinitionApiService {
  private readonly _api = 'http://localhost:3000';

  constructor(private readonly _httpClient: HttpClient) {}

  load(query: DefinitionQuery): Observable<Definition> {
    return this._httpClient.get<Definition>(`${this._api}/definitions/${query.type}/${query.key}`);
  }

  save(data: Definition): Observable<undefined> {
    return this._httpClient
      .put(`${this._api}/definitions/${data.type}/${data.key}`, data.definition)
      .pipe(mapTo(undefined));
  }
}
