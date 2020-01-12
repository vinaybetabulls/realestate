import * as _ from "lodash";
import { uuid } from "uuidv4";
import AgentModel from "../model/agent.model";

export default class AgentService {
  public static async addAgent(req: any, res: any) {
    try {
      let agentId = uuid();
      console.log(req.swagger.params)
      const agentResult = await AgentModel.addAgent({
        agentId,
        agentName: _.get(req, "swagger.params.body.value.agentName"),
        agentEmail: _.get(req, "swagger.params.body.value.agentEmail"),
        agentPassword: _.get(req, "swagger.params.body.value.agentPassword"),
        agentPhone: _.get(req, "swagger.params.body.value.agentPhone"),
        role: _.get(req, 'swagger.params.body.value.role')
      });
      res.sed(agentResult)
    } catch (error) {
      res.send(error)
    }
  }
}
