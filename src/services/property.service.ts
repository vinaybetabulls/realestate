import PropertyModel from "../model/property.model";
import { uuid } from 'uuidv4';
import * as _ from 'lodash';
// import  multer  from  'multer' ;

// var storage=multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, '/src/images')
//   },
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' +uuid())
//   }
// })
// let upload = multer({ storage: storage })
export default class PropertyService {
  public static async addProperty(req: any, res: any, agentId: string) {
   // let property = req.swagger.params.images.value;
  
    let id = uuid();
    //console.log(property.buffer.toString('base64'))
    const propertyObj = await PropertyModel.saveProperty({
      propertyLocation: _.get(req, 'swagger.params.propertyLocation.value'),
      propertyDescription: _.get(req, 'swagger.params.propertyDescription.value'),
      squarefeet: _.get(req, 'swagger.params.squarefeet.value'),
      bedRooms: _.get(req, 'swagger.params.bedRooms.value'),
      bathRooms: _.get(req, 'swagger.params.bathRooms.value'),
      price: _.get(req, 'swagger.params.price.value'),
      propertyId: id,
      agentId
    });
    res.send(propertyObj)
  }

  public static async getProperties(req: any, res: any) {

    let pageNo = parseInt(req.swagger.params.page.value);
    let limit = parseInt(req.swagger.params.limit.value)
    if (pageNo < 0 || pageNo === 0) {
      pageNo = 1;
    }
    const properties: any = await PropertyModel.getPrperties(pageNo, limit);
    res.send(properties)
  }
  public static async getPropertyById(req: any, res: any) {
    let propertyId = req.swagger.params.propertyId.value;
    const getPropertyById: any = await PropertyModel.getPropertyById(propertyId)

    res.send(getPropertyById)
  }
  public static async deletePropertyById(req: any, res: any) {
    let propertyId = req.swagger.params.propertyId.value;
    const deletePropertyById = PropertyModel.deletePropertyById(propertyId)
    res.send("detelete property sucessfully")

  }
}
