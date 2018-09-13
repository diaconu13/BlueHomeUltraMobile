import { Document, Model } from "mongoose";
import * as mongoose from "mongoose";
import { NextFunction } from "express";
import { Query } from "mongoose";

export interface IFacade {
           Model                                         : Model<Document>;
  create  (body: any)                                    : Promise<Document>;
  find    ()                                             : Promise<Document[]>;
  findOne (condiftion: any)                              : Promise<Document>;
  findById(id: string)                                   : Promise<Document>;
  update  (condiftion: any, doc: any, next: NextFunction): Query<any>;
  remove  (condiftion: any, next: NextFunction)          : Promise<any>;
}

export class Facade {
  Model: Model<Document>;

  constructor(name: string, schema: mongoose.Schema) {
    console.log("instantiating ", name);
    try {
      console.log("try ", name);
      this.Model = mongoose.model(name, schema);
    } catch (error) {
      console.log("error ", name);
      let schema: Model<Document> = mongoose.model(name);
          this.Model              = schema;
    }

    // let alreadyHere = mongoose.model(name);
    // console.log(alreadyHere.schema);
    // if (alreadyHere.schema) {
    //   this.Model = alreadyHere;
    // } else {
    //   this.Model = mongoose.model(name, schema);
    // }
  }

  create(body: any):Promise<Document> {
    const model: Document = new this.Model(body);
    return model.save();
  }

  find(query: any = undefined): Promise<Document[]> {
    return this.Model.find(query).exec();
  }

  findOne(condition: any): Promise<Document> {
    return this.Model.findOne(condition).exec();
  }

  findById(id: string): Promise<Document> {
    return this.Model.findById(id).exec();
  }

  update(condition: any, doc: any): Query<any> {
    return this.Model.update(condition, doc);
  }

  remove(condition: any, next: NextFunction = undefined): Promise<any> {
    return this.Model.remove(condition, next).exec();
  }
}
