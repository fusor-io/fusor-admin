import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs/operators';

import { environment } from '../../../environments/environment';
import { FbConfigDto, FbConfigQrCodeDto } from './home.type';

@Component({
  selector: 'fa-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  private readonly _api = environment.apiUrl;
  readonly config$ = this._httpClient.get<FbConfigDto>(`${this._api}/fb-config`).pipe(
    map(config =>
      JSON.stringify({
        id: config.projectId,
        num: config.projectNumber,
        key: config.apiKey,
      } as FbConfigQrCodeDto),
    ),
  );

  constructor(private readonly _httpClient: HttpClient) {}
}
