/*
 * SPDX-FileCopyrightText: 2022 SAP Spartacus team <spartacus-team@sap.com>
 *
 * SPDX-License-Identifier: Apache-2.0
 */

import { NgModule } from '@angular/core';
import { provideDefaultConfig } from '@spartacus/core';
import { CommonModule } from '@angular/common';
import { YotporeviewComponent } from './yotporeview/yotpo-review.component';
import { YotpostarratingComponent } from './yotpostarrating/yotpo-star-rating.component';
import { defaultYotpoConfig } from './yotpoconfig/default-yotpo-config';

@NgModule({
  imports: [CommonModule],
  exports: [YotporeviewComponent, YotpostarratingComponent],
  declarations: [YotporeviewComponent, YotpostarratingComponent],
  providers: [provideDefaultConfig(defaultYotpoConfig)],
})
export class YotpoModule {}
