import {
  ChangeDetectionStrategy,
  Component,
  Input,
  AfterViewInit,
  ElementRef,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { Breadcrumb } from '@spartacus/core';
import { Observable } from 'rxjs';
import { ICON_TYPE } from '../../../../../cms-components/misc/icon/icon.model';
import { FacetList } from '../facet.model';
import { FacetService } from '../services/facet.service';

/**
 * Active facets render the applied facet values as a list of focusable buttons
 * which can be used to remove the applied facet value.
 */
@Component({
  selector: 'cx-active-facets',
  templateUrl: './active-facets.component.html',
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ActiveFacetsComponent implements AfterViewInit {
  /** Active facets which are applied to the product results. */
  facetList$: Observable<FacetList> = this.facetService.facetList$;

  /** Configurable icon which is used for the active facet close button */
  @Input() closeIcon = ICON_TYPE.CLOSE;

  @ViewChildren('activeFilters') activeFilters: QueryList<ElementRef>;

  constructor(protected facetService: FacetService) {}

  ngAfterViewInit(): void {
    this.activeFilters.toArray();
  }

  getLinkParams(facet: Breadcrumb) {
    return this.facetService.getLinkParams(facet.removeQuery?.query?.value);
  }

  /**
   * The focus key is used to persist the focus on the facet when the DOM is being
   * recreated. We only apply the focus key for the given _active_ facet when there
   * the original facets is not available. This happens for non multi-valued facets.
   *
   * With this approach, the we keep the focus, either at the facet list or on the
   * active facets.
   */
  getFocusKey(facetList: FacetList, facet: Breadcrumb) {
    return facetList.facets?.find((f) =>
      f.values?.find((val) => val.name === facet.facetValueName)
    )
      ? ''
      : facet.facetValueName;
  }

  /**
   * Purpose of this function is to allow keyboard users to click on a filter they
   * wish to remove by pressing spacebar. Event not handled natively since active
   * filters are <a> elements.
   *
   * @param index of active filter selected
   * @param event spacebar keydown
   */
  removeFilterWithSpacebar(index: number, event?: Event): void {
    event?.preventDefault(); // Avoid spacebar scroll
    this.activeFilters.get(index)?.nativeElement.click();
  }
}
