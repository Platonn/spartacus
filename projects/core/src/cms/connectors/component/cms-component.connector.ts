import { Injectable } from '@angular/core';
import { Observable, of, zip } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CmsComponent } from '../../../model/cms.model';
import { PageContext } from '../../../routing/models/page-context.model';
import { CmsConfig } from '../../config/cms-config';
import { CmsStructureConfigService } from '../../services/cms-structure-config.service';
import { CmsComponentAdapter } from './cms-component.adapter';

@Injectable({
  providedIn: 'root',
})
export class CmsComponentConnector {
  constructor(
    protected cmsStructureConfigService: CmsStructureConfigService,
    protected cmsComponentAdapter: CmsComponentAdapter,
    protected config: CmsConfig
  ) {}

  get<T extends CmsComponent>(
    id: string,
    pageContext: PageContext
  ): Observable<T> {
    return this.cmsStructureConfigService
      .getComponentFromConfig(id)
      .pipe(
        switchMap((configuredComponent) =>
          configuredComponent
            ? of(configuredComponent)
            : this.cmsComponentAdapter.load(id, pageContext)
        )
      );
  }

  getList(ids: string[], pageContext: PageContext): Observable<CmsComponent[]> {
    return this.cmsStructureConfigService.getComponentsFromConfig(ids).pipe(
      switchMap((configuredComponents) => {
        // check if we have some components that are not loaded from configuration
        const missingIds = configuredComponents.reduce(
          (acc, component, index) => {
            if (component === undefined) {
              acc.push(ids[index]);
            }
            return acc;
          },
          []
        );

        if (missingIds.length > 0) {
          const pageSize = this.config.componentsLoading?.pageSize || 50;
          const p: Observable<any>[] = [];
          const num = Math.floor(missingIds.length / pageSize);
          let curr = 0;
          while (curr <= num) {
            p.push(
              this.cmsComponentAdapter.findComponentsByIds(
                missingIds,
                pageContext,
                'DEFAULT',
                curr,
                pageSize
              )
            );
            curr++;
          }
          return zip(...p).pipe(
            map((comps) =>
              [...configuredComponents.filter(Boolean)].concat(...comps)
            )
          );
        } else {
          return of(configuredComponents);
        }
      })
    );
  }
}
