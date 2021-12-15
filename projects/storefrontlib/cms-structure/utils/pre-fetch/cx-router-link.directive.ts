import { LocationStrategy } from '@angular/common';
import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLinkWithHref,
  UrlTree,
} from '@angular/router';
import {
  CmsService,
  ImageGroup,
  PageContext,
  PageType,
  Product,
  ProductScope,
  ProductService,
  RoutingService,
} from '@spartacus/core';
import { Subscription } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { CxLinkBuilder } from './cx-link.builder';

@Directive({
  selector: '[cxRouterLink]',
  exportAs: 'cxRouterLink',
})
export class CxRouterLinkDirective
  extends RouterLinkWithHref
  implements OnDestroy
{
  @Input() cxRouterLinkData?: { type: 'product' | 'cms'; id: string };

  protected cxCommands: any[] | null = null;
  protected cxRouter: Router;
  protected cxRoute: ActivatedRoute;
  protected subscriptions = new Subscription();

  constructor(
    router: Router,
    route: ActivatedRoute,
    locationStrategy: LocationStrategy,

    protected elementRef: ElementRef<HTMLAnchorElement>,
    protected cxLinkBuilder: CxLinkBuilder,

    // products
    protected productService: ProductService,

    // cms
    protected routingService: RoutingService,
    protected cmsService: CmsService
  ) {
    super(router, route, locationStrategy);
    this.cxRouter = router;
    this.cxRoute = route;
  }

  // @override
  @Input()
  set cxRouterLink(commands: any[] | string | null | undefined) {
    if (commands != null) {
      this.cxCommands = Array.isArray(commands) ? commands : [commands];
    } else {
      this.cxCommands = null;
    }
  }

  // @override
  get urlTree(): UrlTree {
    return this.cxRouter.createUrlTree(this.cxCommands ?? [], {
      relativeTo:
        this.relativeTo !== undefined ? this.relativeTo : this.cxRoute,
      queryParams: this.queryParams,
      fragment: this.fragment,
      queryParamsHandling: this.queryParamsHandling,
      preserveFragment: attrBoolValue(this.preserveFragment),
    });
  }

  @HostListener('mouseenter') onHover() {
    if (this.cxRouterLinkData?.type === 'product') {
      this.preFetchProductData(this.cxRouterLinkData.id);
    }
  }

  protected preFetchProductData(id: string): void {
    const scopes: ProductScope[] = [
      ProductScope.LIST,
      ProductScope.DETAILS,
      ProductScope.ATTRIBUTES,
      ProductScope.VARIANTS,
    ];
    this.subscriptions.add(
      this.productService
        .get(id, scopes)
        .pipe(
          take(2),
          tap((product) => this.preFetchImages(product))
        )
        .subscribe()
    );

    const predictedContext: PageContext = { id, type: PageType.PRODUCT_PAGE };
    this.subscriptions.add(
      this.cmsService.getPage(predictedContext).subscribe()
    );
  }

  protected preFetchImages(product: Product | undefined): void {
    if (!product) {
      return;
    }

    const imageGroups = ([] as ImageGroup[])
      .concat(product.images?.PRIMARY ?? [])
      .concat(product.images?.GALLERY ?? []);

    imageGroups.forEach((group) => {
      Object.keys(group).forEach((type) => {
        const url = group[type].url;
        if (url) {
          this.cxLinkBuilder.injectPreFetch(url, 'image');
        }
      });
    });
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    this.subscriptions.unsubscribe();
  }
}

function attrBoolValue(s: any): boolean {
  return s === '' || !!s;
}
