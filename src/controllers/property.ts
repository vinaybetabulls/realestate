module.exports.testController = async (req: any, res: any) => {
  try {
     res.send({msg: "test"})
  } catch (error) {}
};

module.exports.addProperty = async (req: any, res: any) => {
  try {
      console.log(req)
      res.send("add property")
  } catch (error) {
      
  }
};
