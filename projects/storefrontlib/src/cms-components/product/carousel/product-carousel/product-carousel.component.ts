import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  CmsProductCarouselComponent as model,
  Product,
  ProductScope,
  ProductService,
} from '@spartacus/core';
import { Observable } from 'rxjs';
import { filter, map, startWith, tap } from 'rxjs/operators';
import { CmsComponentData } from '../../../../cms-structure/page/model/cms-component-data';

@Component({
  selector: 'cx-product-carousel',
  templateUrl: './product-carousel.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCarouselComponent {
  protected readonly PRODUCT_SCOPE = ProductScope.LIST;

  protected readonly componentData$: Observable<
    model
  > = this.componentData.data$.pipe(filter(Boolean));

  protected products: Map<string, Observable<Product>> = new Map();

  /** A unique key for the focusable group  */
  focusGroup: string;

  /**
   * returns an Observable string for the title.
   */
  title$: Observable<string> = this.componentData$.pipe(
    map((data) => data.title)
  );

  /**
   * Observable that holds an Array of Observables. This is done, so that
   * the component UI could consider to lazy load the UI components when they're
   * in the viewpoint.
   */
  items$: Observable<string[]> = this.componentData$.pipe(
    map((data) => data.productCodes.trim().split(' ')),
    tap((data) => (this.focusGroup = data.join('')))
  );

  constructor(
    protected componentData: CmsComponentData<model>,
    protected productService: ProductService
  ) {}

  getProduct(code: string): Observable<Product> {
    if (!this.products.get(code)) {
      this.products.set(
        code,
        this.productService.get(code, this.PRODUCT_SCOPE).pipe(
          startWith({
            code,
          })
        )
      );
    }
    return this.products.get(code);
  }

  isGhost(ghost: Product): boolean {
    const { code, ...props } = ghost;
    return Object.keys(props).length === 0;
  }
}
