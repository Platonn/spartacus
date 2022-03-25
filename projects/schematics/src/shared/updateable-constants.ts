// TODO:#schematics - [at the end] rename the file?
import { SchematicsException } from '@angular-devkit/schematics';
import {
  ASM_MODULE,
  ASM_ROOT_MODULE,
  ASM_SCHEMATICS_CONFIG,
} from './lib-configs/asm-schematics-config';
import {
  ADD_TO_CART_MODULE,
  ADD_TO_WISHLIST_MODULE,
  CART_BASE_MODULE,
  CART_BASE_ROOT_MODULE,
  CART_BASE_SCHEMATICS_CONFIG,
  CART_IMPORT_EXPORT_MODULE,
  CART_IMPORT_EXPORT_ROOT_MODULE,
  CART_IMPORT_EXPORT_SCHEMATICS_CONFIG,
  CART_QUICK_ORDER_SCHEMATICS_CONFIG,
  CART_SAVED_CART_SCHEMATICS_CONFIG,
  CART_WISHLIST_MODULE,
  CART_WISHLIST_ROOT_MODULE,
  CART_WISHLIST_SCHEMATICS_CONFIG,
  MINI_CART_MODULE,
  QUICK_ORDER_MODULE,
  QUICK_ORDER_ROOT_MODULE,
  SAVED_CART_MODULE,
  SAVED_CART_ROOT_MODULE,
} from './lib-configs/cart-schematics-config';
import {
  CHECKOUT_B2B_MODULE,
  CHECKOUT_B2B_ROOT_MODULE,
  CHECKOUT_B2B_SCHEMATICS_CONFIG,
  CHECKOUT_BASE_MODULE,
  CHECKOUT_BASE_ROOT_MODULE,
  CHECKOUT_BASE_SCHEMATICS_CONFIG,
  CHECKOUT_SCHEDULED_REPLENISHMENT_MODULE,
  CHECKOUT_SCHEDULED_REPLENISHMENT_ROOT_MODULE,
  CHECKOUT_SCHEDULED_REPLENISHMENT_SCHEMATICS_CONFIG,
} from './lib-configs/checkout-schematics-config';
import {
  CDC_MODULE,
  CDC_ROOT_MODULE,
  CDC_SCHEMATICS_CONFIG,
} from './lib-configs/integration-libs/cdc-schematics-config';
import {
  CDS_MODULE,
  CDS_SCHEMATICS_CONFIG,
} from './lib-configs/integration-libs/cds-schematics-config';
import {
  DIGITAL_PAYMENTS_MODULE,
  DIGITAL_PAYMENTS_SCHEMATICS_CONFIG,
} from './lib-configs/integration-libs/digital-payments-schematics-config';
import {
  EPD_SCHEMATICS_CONFIG,
  EPD_VISUALIZATION_MODULE,
  EPD_VISUALIZATION_ROOT_MODULE,
} from './lib-configs/integration-libs/epd-schematics-config';
import {
  ORDER_MODULE,
  ORDER_ROOT_MODULE,
  ORDER_SCHEMATICS_CONFIG,
} from './lib-configs/order-schematics-config';
import {
  ADMINISTRATION_MODULE,
  ADMINISTRATION_ROOT_MODULE,
  ORDER_APPROVAL_MODULE,
  ORDER_APPROVAL_ROOT_MODULE,
  ORGANIZATION_ADMINISTRATION_SCHEMATICS_CONFIG,
  ORGANIZATION_ORDER_APPROVAL_SCHEMATICS_CONFIG,
} from './lib-configs/organization-schematics-config';
import {
  PRODUCT_CONFIGURATOR_CPQ_SCHEMATICS_CONFIG,
  PRODUCT_CONFIGURATOR_RULEBASED_CPQ_MODULE,
  PRODUCT_CONFIGURATOR_RULEBASED_CPQ_ROOT_MODULE,
  PRODUCT_CONFIGURATOR_RULEBASED_CPQ_SCHEMATICS_CONFIG,
  PRODUCT_CONFIGURATOR_RULEBASED_MODULE,
  PRODUCT_CONFIGURATOR_RULEBASED_ROOT_MODULE,
  PRODUCT_CONFIGURATOR_RULEBASED_SCHEMATICS_CONFIG,
  PRODUCT_CONFIGURATOR_TEXTFIELD_MODULE,
  PRODUCT_CONFIGURATOR_TEXTFIELD_ROOT_MODULE,
  PRODUCT_CONFIGURATOR_TEXTFIELD_SCHEMATICS_CONFIG,
} from './lib-configs/product-configurator-schematics-config';
import {
  BULK_PRICING_MODULE,
  BULK_PRICING_ROOT_MODULE,
  IMAGE_ZOOM_MODULE,
  IMAGE_ZOOM_ROOT_MODULE,
  PRODUCT_BULK_PRICING_SCHEMATICS_CONFIG,
  PRODUCT_IMAGE_ZOOM_SCHEMATICS_CONFIG,
  PRODUCT_VARIANTS_SCHEMATICS_CONFIG,
  VARIANTS_MODULE,
  VARIANTS_ROOT_MODULE,
} from './lib-configs/product-schematics-config';
import {
  QUALTRICS_MODULE,
  QUALTRICS_ROOT_MODULE,
  QUALTRICS_SCHEMATICS_CONFIG,
} from './lib-configs/qualtrics-schematics-config';
import {
  SMARTEDIT_MODULE,
  SMARTEDIT_ROOT_MODULE,
  SMARTEDIT_SCHEMATICS_CONFIG,
} from './lib-configs/smartedit-schematics-config';
import {
  STOREFINDER_MODULE,
  STOREFINDER_ROOT_MODULE,
  STOREFINDER_SCHEMATICS_CONFIG,
} from './lib-configs/storefinder-schematics-config';
import {
  PERSONALIZATION_MODULE,
  PERSONALIZATION_ROOT_MODULE,
  TMS_AEP_MODULE,
  TMS_BASE_MODULE,
  TMS_GTM_MODULE,
  TRACKING_AEP_SCHEMATICS_CONFIG,
  TRACKING_GTM_SCHEMATICS_CONFIG,
  TRACKING_PERSONALIZATION_SCHEMATICS_CONFIG,
} from './lib-configs/tracking-schematics-config';
import {
  USER_ACCOUNT_MODULE,
  USER_ACCOUNT_ROOT_MODULE,
  USER_ACCOUNT_SCHEMATICS_CONFIG,
  USER_PROFILE_MODULE,
  USER_PROFILE_ROOT_MODULE,
  USER_PROFILE_SCHEMATICS_CONFIG,
} from './lib-configs/user-schematics-config';
import {
  SPARTACUS_ASM,
  SPARTACUS_CART,
  SPARTACUS_CDC,
  SPARTACUS_CDS,
  SPARTACUS_CHECKOUT,
  SPARTACUS_DIGITAL_PAYMENTS,
  SPARTACUS_EPD_VISUALIZATION,
  SPARTACUS_ORDER,
  SPARTACUS_ORGANIZATION,
  SPARTACUS_PRODUCT,
  SPARTACUS_PRODUCT_CONFIGURATOR,
  SPARTACUS_QUALTRICS,
  SPARTACUS_SMARTEDIT,
  SPARTACUS_STOREFINDER,
  SPARTACUS_TRACKING,
  SPARTACUS_USER,
} from './libs-constants';
import { FeatureConfig, Module } from './utils/lib-utils';

/**
 * A list of all schematics feature configurations.
 * _Must_ be updated when adding a new schematics
 * library or a feature.
 */
export const SCHEMATICS_CONFIGS: FeatureConfig[] = [
  // feature libraries start
  ASM_SCHEMATICS_CONFIG,

  CART_BASE_SCHEMATICS_CONFIG,
  CART_IMPORT_EXPORT_SCHEMATICS_CONFIG,
  CART_QUICK_ORDER_SCHEMATICS_CONFIG,
  CART_WISHLIST_SCHEMATICS_CONFIG,
  CART_SAVED_CART_SCHEMATICS_CONFIG,

  CHECKOUT_BASE_SCHEMATICS_CONFIG,
  CHECKOUT_B2B_SCHEMATICS_CONFIG,
  CHECKOUT_SCHEDULED_REPLENISHMENT_SCHEMATICS_CONFIG,

  ORDER_SCHEMATICS_CONFIG,

  ORGANIZATION_ADMINISTRATION_SCHEMATICS_CONFIG,
  ORGANIZATION_ORDER_APPROVAL_SCHEMATICS_CONFIG,

  PRODUCT_CONFIGURATOR_TEXTFIELD_SCHEMATICS_CONFIG,
  PRODUCT_CONFIGURATOR_RULEBASED_SCHEMATICS_CONFIG,
  PRODUCT_CONFIGURATOR_RULEBASED_CPQ_SCHEMATICS_CONFIG,
  PRODUCT_CONFIGURATOR_CPQ_SCHEMATICS_CONFIG,

  PRODUCT_BULK_PRICING_SCHEMATICS_CONFIG,
  PRODUCT_IMAGE_ZOOM_SCHEMATICS_CONFIG,
  PRODUCT_VARIANTS_SCHEMATICS_CONFIG,

  QUALTRICS_SCHEMATICS_CONFIG,

  SMARTEDIT_SCHEMATICS_CONFIG,

  STOREFINDER_SCHEMATICS_CONFIG,

  TRACKING_PERSONALIZATION_SCHEMATICS_CONFIG,
  TRACKING_GTM_SCHEMATICS_CONFIG,
  TRACKING_AEP_SCHEMATICS_CONFIG,

  USER_ACCOUNT_SCHEMATICS_CONFIG,
  USER_PROFILE_SCHEMATICS_CONFIG,

  // integration libraries start
  CDC_SCHEMATICS_CONFIG,

  CDS_SCHEMATICS_CONFIG,

  DIGITAL_PAYMENTS_SCHEMATICS_CONFIG,

  EPD_SCHEMATICS_CONFIG,
];

/**
 * Maps sub-features to their parent feature.
 */
export const {
  /**
   * Mapping of features to Spartacus library.
   *
   * E.g.:
   *
   * {
   * ...,
   *  '@spartacus/checkout': ['Checkout', 'Checkout-B2B', 'Checkout-Scheduled-Replenishment'],
   * ...
   * }
   */
  libraryFeatureMapping,
  /**
   * Mapping of feature-modules to the Spartacus library.
   *
   * E.g.:
   *
   * {
   * ...,
   * '@spartacus/checkout': ['CheckoutModule', 'CheckoutB2BModule',
   * 'CheckoutScheduledReplenishmentModule'],
   * ...
   * }
   */
  libraryFeatureModuleMapping,
  /**
   * Mapping of root feature-modules to the Spartacus library.
   *
   * E.g.:
   *
   * {
   * ...,
   * '@spartacus/checkout': ['CheckoutRootModule', 'CheckoutB2BRootModule',
   * 'CheckoutScheduledReplenishmentRootModule'],
   * ...
   * }
   */
  libraryRootModuleMapping,
  /**
   * Mapping of schematics configurations to the Spartacus library.
   *
   * E.g.:
   *
   * {
   * ...,
   * '@spartacus/checkout': [baseConfig, b2bConfig, scheduledReplenishmentConfig],
   * ...
   * }
   */
  librarySchematicConfigMapping,
} = generateMappings();

export function generateMappings(): {
  libraryFeatureMapping: Record<string, string[]>;
  libraryFeatureModuleMapping: Record<string, string[]>;
  libraryRootModuleMapping: Record<string, string[]>;
  librarySchematicConfigMapping: Record<string, FeatureConfig[]>;
} {
  const featureMapping: Record<string, string[]> = {};
  const featureModuleMapping: Record<string, string[]> = {};
  const rootModuleMapping: Record<string, string[]> = {};
  const configMapping: Record<string, FeatureConfig[]> = {};

  for (const featureConfig of SCHEMATICS_CONFIGS) {
    populateFeatureMapping(featureMapping, featureConfig);
    populateFeatureModuleMapping(featureModuleMapping, featureConfig);
    populateRootModulesMapping(rootModuleMapping, featureConfig);
    populateConfigMapping(configMapping, featureConfig);
  }

  return {
    libraryFeatureMapping: featureMapping,
    libraryFeatureModuleMapping: featureModuleMapping,
    libraryRootModuleMapping: rootModuleMapping,
    librarySchematicConfigMapping: configMapping,
  };
}

function populateFeatureMapping(
  mapping: Record<string, string[]>,
  featureConfig: FeatureConfig
): void {
  const feature = featureConfig.library.mainScope;
  const featureName = featureConfig.library.cli;

  const existingFeatureMapping = mapping[feature] ?? [];
  // avoid adding duplicates
  if (existingFeatureMapping.includes(featureName)) {
    return;
  }

  mapping[feature] = [...existingFeatureMapping, featureName];
}

function populateFeatureModuleMapping(
  mapping: Record<string, string[]>,
  featureConfig: FeatureConfig
): void {
  const feature = featureConfig.library.mainScope;

  const existingFeatureMarkerMapping = mapping[feature] ?? [];
  const featureModules = ([] as Module[])
    .concat(featureConfig.featureModule)
    .map((fm) => fm.name);

  // avoid adding duplicates
  if (
    existingFeatureMarkerMapping.some((existing) =>
      featureModules.includes(existing)
    )
  ) {
    return;
  }

  mapping[feature] = [...existingFeatureMarkerMapping, ...featureModules];
}

function populateRootModulesMapping(
  mapping: Record<string, string[]>,
  featureConfig: FeatureConfig
): void {
  const feature = featureConfig.library.mainScope;

  const existingRootMarkerMapping = mapping[feature] ?? [];
  const rooModules = ([] as Module[])
    .concat(featureConfig.rootModule ?? [])
    .map((rm) => rm.name);

  // avoid adding duplicates
  if (
    existingRootMarkerMapping.some((existing) => rooModules.includes(existing))
  ) {
    return;
  }

  mapping[feature] = [...existingRootMarkerMapping, ...rooModules];
}

function populateConfigMapping(
  mapping: Record<string, FeatureConfig[]>,
  featureConfig: FeatureConfig
): void {
  const existingConfigs = mapping[featureConfig.library.mainScope] ?? [];
  mapping[featureConfig.library.mainScope] = [
    ...existingConfigs,
    featureConfig,
  ];
}

/**
 * Based on the given value,
 * it returns the key of the given object.
 */
export function getKeyByMappingValueOrThrow(
  mapping: Record<string, string[]>,
  value: string
): string {
  for (const key in mapping) {
    if (!mapping.hasOwnProperty(key)) {
      continue;
    }

    if ((mapping[key] ?? []).includes(value)) {
      return key;
    }
  }

  throw new SchematicsException(
    `Given value ${value} not found in ${JSON.stringify(mapping)}`
  );
}

/**
 * Maps the sub-feature's configurations to its parent feature.
 * E.g. User's sub-features contains name configurations for
 * Account and Profile: USER_ACCOUNT_MODULE, USER_ACCOUNT_ROOT_MODULE,
 * USER_PROFILE_MODULE, USER_PROFILE_ROOT_MODULE,
 */
/**
 * TODO:#schematics - remove, as it's built dynamically based on the `SCHEMATICS_CONFIGS`.
 * Remove after implementing the wrapper modules.
 */
export const packageFeatureConfigMapping: Record<string, string[]> = {
  /** Feature modules lib start */
  [SPARTACUS_ASM]: [ASM_MODULE, ASM_ROOT_MODULE],
  [SPARTACUS_CART]: [
    CART_BASE_MODULE,
    MINI_CART_MODULE,
    ADD_TO_CART_MODULE,
    CART_BASE_ROOT_MODULE,
    CART_WISHLIST_MODULE,
    ADD_TO_WISHLIST_MODULE,
    CART_WISHLIST_ROOT_MODULE,
    SAVED_CART_MODULE,
    SAVED_CART_ROOT_MODULE,
    QUICK_ORDER_MODULE,
    QUICK_ORDER_ROOT_MODULE,
    CART_IMPORT_EXPORT_MODULE,
    CART_IMPORT_EXPORT_ROOT_MODULE,
  ],
  [SPARTACUS_CHECKOUT]: [
    CHECKOUT_BASE_MODULE,
    CHECKOUT_BASE_ROOT_MODULE,
    CHECKOUT_B2B_MODULE,
    CHECKOUT_B2B_ROOT_MODULE,
    CHECKOUT_SCHEDULED_REPLENISHMENT_MODULE,
    CHECKOUT_SCHEDULED_REPLENISHMENT_ROOT_MODULE,
  ],
  [SPARTACUS_ORDER]: [ORDER_MODULE, ORDER_ROOT_MODULE],
  [SPARTACUS_ORGANIZATION]: [
    ADMINISTRATION_MODULE,
    ADMINISTRATION_ROOT_MODULE,
    ORDER_APPROVAL_MODULE,
    ORDER_APPROVAL_ROOT_MODULE,
  ],
  [SPARTACUS_PRODUCT]: [
    BULK_PRICING_MODULE,
    BULK_PRICING_ROOT_MODULE,
    VARIANTS_MODULE,
    VARIANTS_ROOT_MODULE,
    IMAGE_ZOOM_MODULE,
    IMAGE_ZOOM_ROOT_MODULE,
  ],
  [SPARTACUS_PRODUCT_CONFIGURATOR]: [
    PRODUCT_CONFIGURATOR_TEXTFIELD_MODULE,
    PRODUCT_CONFIGURATOR_TEXTFIELD_ROOT_MODULE,
    PRODUCT_CONFIGURATOR_RULEBASED_MODULE,
    PRODUCT_CONFIGURATOR_RULEBASED_ROOT_MODULE,
    PRODUCT_CONFIGURATOR_RULEBASED_CPQ_MODULE,
    PRODUCT_CONFIGURATOR_RULEBASED_CPQ_ROOT_MODULE,
  ],
  [SPARTACUS_QUALTRICS]: [QUALTRICS_MODULE, QUALTRICS_ROOT_MODULE],
  [SPARTACUS_SMARTEDIT]: [SMARTEDIT_MODULE, SMARTEDIT_ROOT_MODULE],
  [SPARTACUS_STOREFINDER]: [STOREFINDER_MODULE, STOREFINDER_ROOT_MODULE],
  [SPARTACUS_TRACKING]: [
    TMS_BASE_MODULE,
    TMS_GTM_MODULE,
    TMS_AEP_MODULE,
    PERSONALIZATION_MODULE,
    PERSONALIZATION_ROOT_MODULE,
  ],
  [SPARTACUS_USER]: [
    USER_ACCOUNT_MODULE,
    USER_ACCOUNT_ROOT_MODULE,
    USER_PROFILE_MODULE,
    USER_PROFILE_ROOT_MODULE,
  ],
  /** Feature libs end */

  /** Integration libs start */
  [SPARTACUS_CDC]: [CDC_MODULE, CDC_ROOT_MODULE],
  [SPARTACUS_CDS]: [CDS_MODULE],
  [SPARTACUS_DIGITAL_PAYMENTS]: [DIGITAL_PAYMENTS_MODULE],
  [SPARTACUS_EPD_VISUALIZATION]: [
    EPD_VISUALIZATION_MODULE,
    EPD_VISUALIZATION_ROOT_MODULE,
  ],
  /** Integration libs end */
};
