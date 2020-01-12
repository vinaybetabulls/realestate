import MongoDbConnection from "../lib/mongo";
import PropertyService from "../services/property.service";
import JWT from '../lib/jwt';
module.exports.testController = async (req: any, res: any) => {
  try {
    res.send({ msg: "test" });
  } catch (error) { }
};

module.exports.addProperty = async (req: any, res: any) => {
  // JWT.verify(req.swagger.params);
  console.log(req.swagger.params.autherization.value)
  let result: any = await JWT.verify(req.swagger.params.autherization.value);
  console.log("result....", result)
  if (result && result.role === 'agent') {
    await PropertyService.addProperty(req, res, result.agentId);
  }
  else {
    res.status(401).send('Authenication Failed')
  }
};
module.exports.getProperty = async (req: any, res: any) => {
  const properties = await PropertyService.getProperties(req, res);
};
module.exports.getPropertyById = async (req: any, res: any) => {
  let propertyId = req.swagger.params.propertyId.value;
  const getPropertybyid = await PropertyService.getPropertyById(req, res);
};

module.exports.deletePropertyById = async (req: any, res: any) => {
  const deletePropertyById = await PropertyService.deletePropertyById(req, res);
};
