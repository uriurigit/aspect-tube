import { environment } from './environment';
import { EnvironmentConstants } from './environment-constants';

export const productionMode = (EnvironmentConstants.production === environment.mode);
export const developmentMode = (EnvironmentConstants.development === environment.mode);
