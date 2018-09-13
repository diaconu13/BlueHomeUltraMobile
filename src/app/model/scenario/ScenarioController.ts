import { Controller } from "../../lib/controller";
import { ScenarioFacade, IScenarioFacade } from "./ScenarioFacade";

/**
 *
 *
 * @export
 * @class ScenarioController
 * @extends {Controller}
 */
export class ScenarioController extends Controller {
  facade: ScenarioFacade;
  constructor() {
    const facade = new ScenarioFacade();
    super(facade);
    this.facade = facade;
  }
}