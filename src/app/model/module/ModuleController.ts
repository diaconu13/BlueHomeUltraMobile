import { Controller } from "../../lib/controller";
import { ModuleFacade, IModuleFacade } from "./ModuleFacade";


/**
 *
 *
 * @export
 * @class ModuleController
 * @extends {Controller}
 */
export class ModuleController extends Controller {
  facade: ModuleFacade;
  constructor() {
    const facade = new ModuleFacade();
    super(facade);
    this.facade = facade;
  }
}