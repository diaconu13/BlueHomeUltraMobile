import { Router,NextFunction, Request, Response } from "express";
import * as express from "express";
import { DeviceController } from "./DeviceController";

const router: Router = express.Router();
const controller: DeviceController     = new DeviceController(false);


router
  .route("/")
  .get((req: Request, res: Response, next: NextFunction) => controller.findAll(req, res, next))
  .post((req: Request, res: Response, next: NextFunction) => controller.create(req, res, next));

  
router.route("/schedule/:id")
  .get((req: Request, res: Response, next: NextFunction) => controller.getSchedule(req, res, next));
router.route("/command")
  .post((req: Request, res: Response, next: NextFunction) => controller.setCommand(req, res, next));
router.route("/register")
  .post((req: Request, res: Response, next: NextFunction) => controller.registerDevice(req, res, next));
  router.route("/delete")
  .post((req: Request, res: Response, next: NextFunction) => controller.deleteDevice(req, res, next));

router
  .route("/:id")
  .put((req: Request, res: Response, next: NextFunction) => controller.update(req, res, next))
  .get((req: Request, res: Response, next: NextFunction) => controller.findById(req, res, next))
  .delete((req: Request, res: Response, next: NextFunction) => controller.remove(req, res, next));

export default router;