import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginStatusModule } from './login/login.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects, metaReducers } from './store';
import { UserLoaderService } from '../data/user-loader.service';

@NgModule({
  imports: [
    CommonModule,
    LoginStatusModule,
    StoreModule.forFeature('tokens', reducers, { metaReducers }),
    EffectsModule.forFeature(effects)
  ],
  declarations: [],
  providers: [UserLoaderService]
})
export class AuthModule {}
