import MongoDbConnection from "../lib/mongo";
import PropertyService from "../services/property.service";

module.exports.testController = async (req: any, res: any) => {
  try {
    res.send({ msg: "test" });
  } catch (error) {}
};

module.exports.addProperty = async (req: any, res: any) => {
  const result = await PropertyService.addProperty(req, res);
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
