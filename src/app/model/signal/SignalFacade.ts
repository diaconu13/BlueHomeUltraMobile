import { Facade, IFacade } from '../../lib/facade';
import * as schema from './SignalSchema';

export interface ISignalFacade extends IFacade {}

export class SignalFacade extends Facade {
    constructor(){
        console.log("creating Signal schema ");
        super('Signal', schema.default);
    }
}

//export default new SignalFacade('Signal', signalSchema)
