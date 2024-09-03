import type { ValidatorAccount } from 'libra-reports/src/types/system';
import { persisted } from 'svelte-persisted-store';

export const validatorDB = persisted<ValidatorAccount[]>('validators', []);
