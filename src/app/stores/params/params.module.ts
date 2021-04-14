import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { PARAMS_FEATURE_NAME } from './const/feature-name.const';
import { ParamsStoreEffects } from './effects/params.effects';
import { ParamsFacadeService } from './facade/params.facade';
import { reducer } from './reducers/params.reducer';
import { ParamsApiService } from './services/params.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(PARAMS_FEATURE_NAME, reducer),
    EffectsModule.forFeature([ParamsStoreEffects]),
  ],
  providers: [ParamsFacadeService, ParamsApiService],
})
export class ParamsServiceModule {}
