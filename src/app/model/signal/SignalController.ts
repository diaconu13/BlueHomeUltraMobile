import { Controller } from "../../lib/controller";
import { SignalFacade } from "./SignalFacade";

/**
 * This is not used yet since the signal is stored on the device
 *
 * @export
 * @class SignalController
 * @extends {Controller}
 */
export class SignalController extends Controller {
  facade: SignalFacade;
  constructor() {
    const facade = new SignalFacade();
    super(facade);
    this.facade = facade;
  }
}