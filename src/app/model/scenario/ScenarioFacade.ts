import { Facade, IFacade } from '../../lib/facade';
import * as schema from './ScenarioSchema';

export interface IScenarioFacade extends IFacade {}

export class ScenarioFacade extends Facade {
    constructor(){
        super('Scenario', schema.default);
    }
}