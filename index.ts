import express from "express";
import * as swaggerTools from "swagger-tools";
import * as swaggerUi from "swagger-ui-express";
import MongoDbConnection from "./src/lib/mongo";
import jsyml from 'js-yaml'
import { pathToFileURL } from "url";
import path from 'path'

require('dotenv-safe').config({
  example: process.env.CI ? '.env.ci.example' : '.env.example'
});
const swaggerDoc = jsyml.safeLoad(`${process.cwd}/swagger.json`);
const swaggerRouterOption = {
  controllers: path.join(__dirname,'/src/controllers')
}
let mongo = new MongoDbConnection();
const app: any = express();
let mongodbURL = process.env.MONGO_URI  || 'monodb://localhost:27017/';
let dbName = process.env.DB_NAME || 'test';
mongo.init(mongodbURL, dbName);

swaggerTools.initializeMiddleware(swaggerDoc, (middleware) => {
  app.use(middleware.swaggerMetadata())
  app.use(middleware.swaggerRouter(swaggerRouterOption))
  // todo
})

app.use
