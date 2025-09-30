import { environment as dev } from './environment';
import { environment as prod } from './environment.prod';

export const environment = __DEV__ ? dev : prod;
