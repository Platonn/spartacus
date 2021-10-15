import { CheckoutEvent } from '@spartacus/checkout/root';
import { ReplenishmentOrder } from '@spartacus/core';

/**
 * Indicates that a user has scheduled replenishment order.
 */
export class ReplenishmentOrderScheduledEvent extends CheckoutEvent {
  /**
   * Event's type
   */
  static readonly type = 'ReplenishmentOrderScheduledEvent';
  /**
   * Replenishment Order
   */
  replenishmentOrder: ReplenishmentOrder;
}
