import { Facade, IFacade } from "./facade";
import { NextFunction, Request, Response } from "express";
import { Document } from "mongoose";
import { Query, Promise } from "mongoose";

export class Controller {
  public facade: Facade;

  constructor(facade: IFacade) {
    facade = facade;
  }

  public create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    return this.facade
      .create(req.body)
      .then(doc => res.status(201).json(doc))
      .catch(err => next(err));
  }

  public find(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> {
    console.log("controller js");
    return this.facade
      .find(req.query)
      .then(collection => res.status(200).json(collection))
      .catch(err => next(err));
  }

  public findInternal(query: Query<any>): Promise<Document[]> {
    return this.facade.find(query);
  }

  public findOne(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    return this.facade
      .findOne(req.query)
      .then(doc => res.status(200).json(doc))
      .catch(err => next(err));
  }

  public findById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    return this.facade
      .findById(req.params.id)
      .then(doc => {
        if (!doc) {
          return res.sendStatus(404);
        }
        return res.status(200).json(doc);
      })
      .catch(err => next(err));
  }

  public update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    return this.facade
      .update({ _id: req.params.id }, req.body)
      .then(results => {
        if (results.n < 1) {
          return res.sendStatus(404);
        }
        if (results.nModified < 1) {
          return res.sendStatus(304);
        }
        res.sendStatus(204);
      })
      .catch(err => next(err));
  }

  public updateInternal(condition: any, doc: any): Query<any> {
    return this.facade.update(condition, doc);
  }

  public remove(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<any> {
    return this.facade
      .remove({ _id: req.params.id })
      .then(doc => {
        if (!doc) {
          return res.sendStatus(404);
        }
        return res.sendStatus(204);
      })
      .catch(err => next(err));
  }
}
