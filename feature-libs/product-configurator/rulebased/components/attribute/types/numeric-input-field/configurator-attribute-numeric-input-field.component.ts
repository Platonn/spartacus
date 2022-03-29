import { getLocaleId } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  isDevMode,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { ICON_TYPE } from '@spartacus/storefront';
import { timer } from 'rxjs';
import { debounce, take } from 'rxjs/operators';
import { ConfiguratorUISettingsConfig } from '../../../config/configurator-ui-settings.config';
import { ConfiguratorAttributeInputFieldComponent } from '../input-field/configurator-attribute-input-field.component';
import {
  ConfiguratorAttributeNumericInputFieldService,
  ConfiguratorAttributeNumericInterval,
} from './configurator-attribute-numeric-input-field.component.service';
import { TranslationService } from '@spartacus/core';

class DefaultSettings {
  numDecimalPlaces: number;
  numTotalLength: number;
  negativeAllowed: boolean;
}

@Component({
  selector: 'cx-configurator-attribute-numeric-input-field',
  templateUrl: './configurator-attribute-numeric-input-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfiguratorAttributeNumericInputFieldComponent
  extends ConfiguratorAttributeInputFieldComponent
  implements OnInit, OnDestroy
{
  numericFormatPattern: string;
  locale: string;
  iconType = ICON_TYPE;
  intervals: ConfiguratorAttributeNumericInterval[] | undefined;

  @Input() language: string;

  constructor(
    protected configAttributeNumericInputFieldService: ConfiguratorAttributeNumericInputFieldService,
    protected config: ConfiguratorUISettingsConfig,
    protected translation: TranslationService
  ) {
    super(config);
  }

  /**
   * Do we need to display a validation message
   */
  mustDisplayValidationMessage(): boolean {
    const wrongFormat: boolean =
      (this.attributeInputForm.dirty || this.attributeInputForm.touched) &&
      this.attributeInputForm.errors?.wrongFormat;

    return wrongFormat;
  }

  ngOnInit() {
    //locales are available as 'languages' in the commerce backend
    this.locale = this.getInstalledLocale(this.language);

    let numDecimalPlaces = this.attribute.numDecimalPlaces;
    let numTotalLength = this.attribute.numTotalLength;
    let negativeAllowed = this.attribute.negativeAllowed;

    if (
      numDecimalPlaces === undefined ||
      numTotalLength === undefined ||
      negativeAllowed === undefined
    ) {
      //This won't happen in environments with the standard configurators deployed, as numeric
      //attributes do carry these settings. We still introduce default values to ease development
      //of extension use cases, but log a warning
      const defaultSettings = this.getDefaultSettings();
      numDecimalPlaces = defaultSettings.numDecimalPlaces;
      numTotalLength = defaultSettings.numTotalLength;
      negativeAllowed = defaultSettings.negativeAllowed;
      if (isDevMode()) {
        console.warn(
          'Meta data for numeric attribute not present, falling back to defaults'
        );
      }
    }

    this.attributeInputForm = new FormControl('', [
      this.configAttributeNumericInputFieldService.getNumberFormatValidator(
        this.locale,
        numDecimalPlaces,
        numTotalLength,
        negativeAllowed
      ),
    ]);

    this.numericFormatPattern =
      this.configAttributeNumericInputFieldService.getPatternForValidationMessage(
        numDecimalPlaces,
        numTotalLength,
        negativeAllowed,
        this.locale
      );
    if (this.attribute.userInput) {
      this.attributeInputForm.setValue(this.attribute.userInput);
    }

    if (this.attribute.intervalInDomain) {
      this.intervals =
        this.configAttributeNumericInputFieldService.getIntervals(
          this.attribute.values
        );
    }

    this.sub = this.attributeInputForm.valueChanges
      .pipe(
        debounce(() =>
          timer(
            this.config.productConfigurator?.updateDebounceTime?.input ??
              this.FALLBACK_DEBOUNCE_TIME
          )
        )
      )
      .subscribe(() => this.onChange());
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  /**
   * Returns a concatenated help text for multiple intervals.
   */
  getHelpTextForInterval(): string {
    let intervalText = '';
    let concatenatedIntervalText = '';
    if (this.intervals && this.intervals.length > 0) {
      this.intervals.forEach((interval, index) => {
        intervalText = this.getIntervalText(interval);
        if (index > 0) {
          intervalText =
            intervalText.charAt(0).toLowerCase() + intervalText.slice(1);
          this.translation
            .translate('configurator.a11y.combinedIntervalsText', {
              combinedInterval: concatenatedIntervalText,
              newInterval: intervalText,
            })
            .pipe(take(1))
            .subscribe((text) => (concatenatedIntervalText = text));
        } else {
          concatenatedIntervalText = intervalText;
        }
      });
    }
    return concatenatedIntervalText.trim();
  }

  /**
   * Returns the combined aria text for attribute and value and the interval help text
   */
  getAriaLabelComplete(): string {
    let completeAriaText = '';
    if (this.attribute.userInput?.length === 0) {
      this.translation
        .translate('configurator.a11y.valueOfAttributeBlank', {
          attribute: this.attribute.label,
        })
        .pipe(take(1))
        .subscribe((text) => (completeAriaText = text));
    } else {
      this.translation
        .translate('configurator.a11y.valueOfAttributeFull', {
          value: this.attribute.userInput,
          attribute: this.attribute.label,
        })
        .pipe(take(1))
        .subscribe((text) => (completeAriaText = text));
    }

    if (this.intervals && this.intervals.length > 0) {
      completeAriaText += ' ';
      completeAriaText += this.getHelpTextForInterval();
    }

    return completeAriaText;
  }

  protected getIntervalText(
    interval: ConfiguratorAttributeNumericInterval
  ): string {
    let intervalText = '';
    if (interval.minValue && interval.maxValue) {
      if (interval.minValue === interval.maxValue) {
        this.translation
          .translate('configurator.a11y.numericIntervalSingleValue', {
            value: interval.minValue,
          })
          .pipe(take(1))
          .subscribe((text) => (intervalText = text));
        return intervalText;
      }
      this.translation
        .translate('configurator.a11y.numericIntervalStandard', {
          minValue: interval.minValue,
          maxValue: interval.maxValue,
        })
        .pipe(take(1))
        .subscribe((text) => (intervalText = text));

      if (!interval.minValueIncluded || !interval.maxValueIncluded) {
        if (!interval.minValueIncluded && !interval.maxValueIncluded) {
          intervalText += ' ';
          intervalText += this.getAdditionalIntervalText(
            'configurator.a11y.numericIntervalStandardOpen'
          );
        } else {
          if (!interval.minValueIncluded) {
            intervalText += ' ';
            intervalText += this.getAdditionalIntervalText(
              'configurator.a11y.numericIntervalStandardLowerEndpointNotIncluded'
            );
          }
          if (!interval.maxValueIncluded) {
            intervalText += ' ';
            intervalText += this.getAdditionalIntervalText(
              'configurator.a11y.numericIntervalStandardUpperEndpointNotIncluded'
            );
          }
        }
      }
    } else {
      if (interval.minValue) {
        if (interval.minValueIncluded) {
          this.translation
            .translate(
              'configurator.a11y.numericInfiniteIntervalMinValueIncluded',
              {
                minValue: interval.minValue,
              }
            )
            .pipe(take(1))
            .subscribe((text) => (intervalText = text));
        } else {
          this.translation
            .translate('configurator.a11y.numericInfiniteIntervalMinValue', {
              minValue: interval.minValue,
            })
            .pipe(take(1))
            .subscribe((text) => (intervalText = text));
        }
      } else {
        if (interval.maxValue) {
          if (interval.maxValueIncluded) {
            this.translation
              .translate(
                'configurator.a11y.numericInfiniteIntervalMaxValueIncluded',
                {
                  maxValue: interval.maxValue,
                }
              )
              .pipe(take(1))
              .subscribe((text) => (intervalText = text));
          } else {
            this.translation
              .translate('configurator.a11y.numericInfiniteIntervalMaxValue', {
                maxValue: interval.maxValue,
              })
              .pipe(take(1))
              .subscribe((text) => (intervalText = text));
          }
        }
      }
    }
    return intervalText;
  }

  protected getAdditionalIntervalText(key: string): string {
    let intervalText = '';
    this.translation
      .translate(key)
      .pipe(take(1))
      .subscribe((text) => (intervalText = text));
    return intervalText;
  }

  protected getDefaultSettings(): DefaultSettings {
    return { numDecimalPlaces: 2, numTotalLength: 6, negativeAllowed: false };
  }

  protected getInstalledLocale(locale: string): string {
    try {
      getLocaleId(locale);
      return locale;
    } catch {
      this.reportMissingLocaleData(locale);
      return 'en';
    }
  }

  protected reportMissingLocaleData(lang: string): void {
    if (isDevMode()) {
      console.warn(
        `ConfigAttributeNumericInputFieldComponent: No locale data registered for '${lang}' (see https://angular.io/api/common/registerLocaleData).`
      );
    }
  }
}
