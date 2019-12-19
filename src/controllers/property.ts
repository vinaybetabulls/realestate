import MongoDbConnection from "../lib/mongo";
import PropertyService from "../services/property.service";
module.exports.testController = async (req: any, res: any) => {
  try {
    res.send({ msg: "test" });
  } catch (error) {}
};

module.exports.addProperty = async (req: any, res: any) => {
  try {
    const result = await PropertyService.addProperty(req.body);
    res.send(result);
  } catch (error) {
    console.log(error)
  }
};
module.exports.getProperty = async (req:any,res:any) => {
  try {
    const properties: any[] = await PropertyService.getProperties();
    console.log("controller");
    console.log(properties)
    res.json({properties:properties, "message":"properties list"})
  } catch (error) {
    
  }
}



