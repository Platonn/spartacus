import { Injectable } from '@angular/core';
import { Actions, ofType } from '@ngrx/effects';
import {
  RestoreSavedCartSuccessEvent,
  SaveCartSuccessEvent,
} from '@spartacus/cart/saved-cart/root';
import {
  CheckoutQueryFacade,
  CheckoutState,
  DeliveryAddressClearedEvent,
  DeliveryAddressSetEvent,
  DeliveryModeClearedEvent,
  DeliveryModeSetEvent,
  OrderPlacedEvent,
  PaymentDetailsCreatedEvent,
  PaymentDetailsSetEvent,
  ReloadCheckoutQueryEvent,
  ResetCheckoutQueryEvent,
} from '@spartacus/checkout/root';
import {
  ActiveCartService,
  CartActions,
  CurrencySetEvent,
  LanguageSetEvent,
  LoginEvent,
  LogoutEvent,
  OCC_USER_ID_ANONYMOUS,
  QueryNotifier,
  QueryService,
  QueryState,
  UserIdService,
} from '@spartacus/core';
import { combineLatest, Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { CheckoutConnector } from '../connectors/checkout/checkout.connector';

@Injectable()
export class CheckoutQueryService implements CheckoutQueryFacade {
  protected getQueryReloadEvents(): QueryNotifier[] {
    return [
      ReloadCheckoutQueryEvent,
      // TODO: Register reload event dispatchers for events below
      LanguageSetEvent,
      CurrencySetEvent,
    ];
  }
  protected getQueryResetEvents(): QueryNotifier[] {
    return [
      ResetCheckoutQueryEvent,
      // TODO: Register reset event dispatchers for events below
      DeliveryAddressSetEvent,
      LogoutEvent,
      LoginEvent,
      DeliveryAddressClearedEvent,
      DeliveryModeSetEvent,
      DeliveryModeClearedEvent,
      SaveCartSuccessEvent,
      RestoreSavedCartSuccessEvent,
      PaymentDetailsCreatedEvent,
      PaymentDetailsSetEvent,
      // query state should be reset when checkout is finished (should be undefined after the following events)
      OrderPlacedEvent,
      this.actions$.pipe(ofType(CartActions.MERGE_CART_SUCCESS)),
    ];
  }

  protected checkoutQuery$ = this.query.create<CheckoutState>(
    () => {
      return combineLatest([
        this.userIdService.takeUserId(),
        this.activeCartService.takeActiveCartId(),
      ]).pipe(
        take(1),
        switchMap(([userId, cartId]) => {
          if (
            !userId ||
            !cartId ||
            (userId === OCC_USER_ID_ANONYMOUS &&
              !this.activeCartService.isGuestCart())
          ) {
            throw new Error('Checkout conditions not met');
          }
          return this.checkoutConnector.getCheckoutDetails(userId, cartId);
        })
      );
    },
    {
      reloadOn: this.getQueryReloadEvents(),
      resetOn: this.getQueryResetEvents(),
    }
  );

  constructor(
    protected activeCartService: ActiveCartService,
    protected userIdService: UserIdService,
    protected query: QueryService,
    protected checkoutConnector: CheckoutConnector,
    protected actions$: Actions
  ) {}

  getCheckoutDetails(): Observable<CheckoutState | undefined> {
    return this.checkoutQuery$.get();
  }

  getCheckoutDetailsState(): Observable<QueryState<CheckoutState>> {
    return this.checkoutQuery$.getState();
  }
}
