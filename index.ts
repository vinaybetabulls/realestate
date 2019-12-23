import express from "express";
import * as swaggerTools from "swagger-tools";
import * as swaggerUi from "swagger-ui-express";
import MongoDbConnection from "./src/lib/mongo";
import jsyml from 'js-yaml'
import { pathToFileURL } from "url";
import path from 'path';
import bodyParser from "body-parser";
const fs = require('fs');

require('dotenv-safe').config({
  example:  '.env.example'
});
const swaggerInfo = fs.readFileSync(`${process.cwd()}/src/swagger.json`,'utf-8')
const swaggerDoc = jsyml.safeLoad(swaggerInfo);
const swaggerRouterOption = {
  controllers: path.join(__dirname,'/src/controllers')
}
let mongo = new MongoDbConnection();
const app: any = express();
console.log(process.env.MONGO_DB_HOST)
mongo.init(require('./src/configs/database').default);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({limit:'1000mb',extended:true}))
swaggerTools.initializeMiddleware(swaggerDoc, (middleware) => {
  app.use(middleware.swaggerMetadata())
  app.use(middleware.swaggerRouter(swaggerRouterOption))
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(require('./src/swagger.json'),undefined,undefined,undefined,undefined,undefined,'test'))
})

app.listen(4500)
