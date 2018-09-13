import { Controller } from "../../lib/controller";
import { ConfigurationFacade } from "./ConfigurationFacade";

/**
 *
 *
 * @export
 * @class ConfigurationController
 * @extends {Controller}
 */
export class ConfigurationController extends Controller {
  facade: ConfigurationFacade;
  constructor() {
    const facade = new ConfigurationFacade();
    super(facade);
    this.facade = facade;
  }
}