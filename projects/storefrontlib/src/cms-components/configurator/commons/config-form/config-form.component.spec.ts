import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterState } from '@angular/router';
import {
  Configurator,
  ConfiguratorCommonsService,
  I18nTestingModule,
  RoutingService,
} from '@spartacus/core';
import { Observable, of } from 'rxjs';
import { ConfigAttributeHeaderComponent } from '../config-attribute-header/config-attribute-header.component';
import { ConfigAttributeRadioButtonComponent } from '../config-attribute-types/config-attribute-radio-button/config-attribute-radio-button.component';
import { ConfigFormComponent } from './config-form.component';

const PRODUCT_CODE = 'CONF_LAPTOP';

const mockRouterState: any = {
  state: {
    params: {
      rootProduct: PRODUCT_CODE,
    },
  },
};

class MockRoutingService {
  getRouterState(): Observable<RouterState> {
    return of(mockRouterState);
  }
}

class MockConfiguratorCommonsService {
  createConfiguration(
    productCode: string
  ): Observable<Configurator.Configuration> {
    const productConfig: Configurator.Configuration = {
      configId: 'a',
      consistent: true,
      complete: true,
      productCode: productCode,
    };
    return of(productConfig);
  }
}

describe('ConfigurationFormComponent', () => {
  let component: ConfigFormComponent;
  let fixture: ComponentFixture<ConfigFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [I18nTestingModule],
      declarations: [
        ConfigFormComponent,
        ConfigAttributeHeaderComponent,
        ConfigAttributeRadioButtonComponent,
      ],
      providers: [
        {
          provide: RoutingService,
          useClass: MockRoutingService,
        },

        {
          provide: ConfiguratorCommonsService,
          useClass: MockConfiguratorCommonsService,
        },
      ],
    })
      .overrideComponent(ConfigAttributeHeaderComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigFormComponent);
    component = fixture.componentInstance;
  });

  it('should create component', () => {
    expect(component).toBeDefined();
  });

  it('should get product code as part of product configuration', () => {
    component.ngOnInit();
    fixture.detectChanges();
    let productCode: string;
    component.configuration$.subscribe(
      (data: Configurator.Configuration) => (productCode = data.productCode)
    );

    expect(productCode).toEqual(PRODUCT_CODE);
  });
  it('should get product code as part of product configuration', () => {
    component.ngOnInit();
    fixture.detectChanges();
    let productCode: string;
    component.configuration$.subscribe(
      (data: Configurator.Configuration) => (productCode = data.productCode)
    );

    expect(productCode).toEqual(PRODUCT_CODE);
  });
});
