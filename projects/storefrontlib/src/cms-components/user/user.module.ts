import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UrlModule } from '@spartacus/core';
import { CheckoutLoginModule } from './checkout-login/checkout-login.module';
import { LoginFormModule } from './login-form/login-form.module';
import { LoginRegisterModule } from './login-register/login-register.module';
import { LoginRouteModule } from './login-route/login-route.module';
import { LoginModule } from './login/login.module';
import { LogoutModule } from './logout/logout.module';
import { RegisterComponentModule } from './register/register.module';

/**
 * @deprecated since 3.2, moved to @spartacus/user package.
 */
@NgModule({
  imports: [
    LoginModule,
    LoginFormModule,
    LoginRegisterModule,
    LogoutModule,
    LoginRouteModule,
    CheckoutLoginModule,
    ReactiveFormsModule,
    RouterModule,
    UrlModule,
    RegisterComponentModule,
  ],
})
export class UserComponentModule {}
