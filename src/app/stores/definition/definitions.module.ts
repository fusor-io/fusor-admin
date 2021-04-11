import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { DEFINITION_FEATURE_NAME } from './const/feature-name.const';
import { DefinitionStoreEffects } from './effects/definition.effects';
import { DefinitionFacadeService } from './facade/definition.facade';
import { reducer } from './reducers/definition.reducer';
import { DefinitionApiService } from './services/definition.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature(DEFINITION_FEATURE_NAME, reducer),
    EffectsModule.forFeature([DefinitionStoreEffects]),
  ],
  providers: [DefinitionFacadeService, DefinitionApiService],
})
export class DefinitionServiceModule {}
