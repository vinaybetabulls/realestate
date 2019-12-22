import PropertyModel from "../model/property.model";
import { uuid } from 'uuidv4'
export default class PropertyService {
  public static async addProperty(req: any, res: any) {
    try {
      let property = req.swagger.params.body.value;
      property.propertyId = uuid();
      const propertyObj = await PropertyModel.addProperty(property);
      // res.statusCode = 200;
      // res.setHeader('application/json');
      res.json({ message: 'Property Saved Scuccessfully', propertyObj })
    } catch (error) {
      // res.statusCode = error.status;
      // res.error = error.title
      res.json({ message: 'Property not saved', error })
    }


  }

  public static async getProperties(req: any, res: any) {
    const resPerPage = 10; // results per page
    const page = parseInt(req.swagger.params.page.value, 10)|| 1; // Page 
    const properties: any = await PropertyModel.getPrperties(resPerPage, page);
    res.send(properties)
  }

  public static async getPropertyById(req: any, res: any) {
    try {
      let propertyId = req.swagger.params.propertyId.value;
      let property = await PropertyModel.getPropertyById(propertyId);
      res.send(property)
    } catch (error) {

    }

  }
}
