import { TranslationChunksConfig, TranslationResources } from '@spartacus/core';
import { en } from './en/index';

export const userTranslations: TranslationResources = {
  en,
};

export const userTranslationChunksConfig: TranslationChunksConfig = {
  user: ['updateEmailForm', 'register', 'loginForm', 'forgottenPassword'],
};
