import { Facade, IFacade } from '../../lib/facade';
import * as schema from './ModuleSchema';

export interface IModuleFacade extends IFacade {}

export class ModuleFacade extends Facade {
    constructor(){
        super('Module', schema.default);
    }
}