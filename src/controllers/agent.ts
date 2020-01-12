import AgentSerice from "../services/admin.service";
module.exports.addAgent = async (req: any, res: any, next: any) => {
  try {
    console.log("agent controller....");
    await AgentSerice.addAgent(req, res);
  } catch (error) {
    console.log(error);
  }
};

