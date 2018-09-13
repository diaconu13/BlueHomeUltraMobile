import { Facade, IFacade } from '../../lib/facade';
import * as schema from './RoomSchema';

export interface IRoomFacade extends IFacade {}

export class RoomFacade extends Facade {
    constructor(){
        super('Room', schema.default);
    }
}
