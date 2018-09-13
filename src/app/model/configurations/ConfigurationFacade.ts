import { Facade, IFacade } from '../../lib/facade';
import * as schema from './ConfiguratioSchema';

export interface IConfigurationFacade extends IFacade {}

export class ConfigurationFacade  extends Facade implements IConfigurationFacade {
    constructor(){
        super('Configuration', schema.default);
    }
}