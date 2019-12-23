import PropertyModel from "../model/property.model";
export default class PropertyService {
  public static async addProperty(property: any) {
    const propertyObj = await PropertyModel.saveProperty(property);
    return propertyObj;
  }

  public static async getProperties() {
      const properties: any = await PropertyModel.getPrperties();
      return properties;
  }
}
