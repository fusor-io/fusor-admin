import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { DEFINITIONS_FEATURE_NAME } from './const/feature-name.const';
import { DefinitionsStoreEffects } from './effects/definitions.effects';
import { DefinitionsFacadeService } from './facade/definitions.facade';
import { reducer } from './reducers/definitions.reducer';
import { DefinitionsApiService } from './services/definitions.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(DEFINITIONS_FEATURE_NAME, reducer),
    EffectsModule.forFeature([DefinitionsStoreEffects]),
  ],
  providers: [DefinitionsFacadeService, DefinitionsApiService],
})
export class DefinitionsServiceModule {}
