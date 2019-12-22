import PropertyService from "../services/property.service";

module.exports.testController = async (req: any, res: any) => {
  try {
    res.send({ msg: "test" });
  } catch (error) { }
};

module.exports.addProperty = async (req: any, res: any) => {
  try {
    const result = await PropertyService.addProperty(req, res);
    console.log(req.swagger.params.file.value.buffer)
    res.send(result);
  } catch (error) {
    console.log(error)
  }
};
module.exports.getProperty = async (req: any, res: any) => {
  try {
    await PropertyService.getProperties(req, res);
  } catch (error) {

  }
}
module.exports.getPropertyById = async (req:any, res: any) => {
  try {
    await PropertyService.getPropertyById(req, res);
  } catch (error) {
    
  }
}



