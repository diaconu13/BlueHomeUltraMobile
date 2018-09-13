import { Controller } from "../../lib/controller";
import { RoomFacade, IRoomFacade } from "./RoomFacade";

/**
 *
 *
 * @export
 * @class RoomController
 * @extends {Controller}
 */
export class RoomController extends Controller {
  facade: RoomFacade;
  constructor() {
    const facade = new RoomFacade();
    super(facade);
    this.facade = facade;
  }
}