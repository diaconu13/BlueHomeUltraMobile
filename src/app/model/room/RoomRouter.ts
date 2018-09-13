import { RoomController } from './RoomController';
import { NextFunction, Request, Response } from "express"
import { Router } from "express";

const router: Router = Router();
const controller = new RoomController();

router.route('/')
.get((req: Request, res: Response, next: NextFunction) => controller.find(req, res, next))
.post((req: Request, res: Response, next: NextFunction) => controller.create(req, res, next));

router.route('/:id')
.put((req: Request, res: Response, next: NextFunction) => controller.update(req, res, next))
.get((req: Request, res: Response, next: NextFunction) => controller.findById(req, res, next))
.delete((req: Request, res: Response, next: NextFunction) => controller.remove(req, res, next));

export default router;
