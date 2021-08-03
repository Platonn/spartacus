import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StateModule } from '../../state/state.module';
import { effectsTransitional } from './effects/transitional_4_1';
import { metaReducers, reducerToken } from './reducers/index';
import { reducerTransitionalProvider } from './reducers/transitional_4_1';
import { USER_FEATURE } from './user-state';

@NgModule({
  imports: [
    CommonModule,
    StateModule,
    StoreModule.forFeature(USER_FEATURE, reducerToken, { metaReducers }),
    EffectsModule.forFeature(effectsTransitional),
    RouterModule,
  ],
  providers: [reducerTransitionalProvider],
})
export class UserStoreTransitional_4_1_Module {}
