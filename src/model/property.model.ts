import { MongoClient, MongoError } from "mongodb";
import MongoDbConnection from '../lib/mongo';

interface Property {
  propertyName: string,
  propertyLocation: string,
  propertyDescription: string,
  peropertyId: string,
  bedRooms? : number,
  bathRooms? : number,
  area: number,
  yearBuild? : number
}
let mongodb = new MongoDbConnection();
const url = `mongodb://${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}/`;
export default class PropertyModel {
  public url: string | any;
  constructor() {

  }
  public static async addProperty(property: Property) {
    try {
      const _saveProperty = () => {
        return new Promise((resolve, reject) => {
          MongoClient.connect(url, async (err: MongoError, result: MongoClient) => {
            const db = result.db('realestate');
            let dbResponse = await db.collection('properties').insertOne(property);
            resolve(dbResponse);
          })
        })
      }
      return await _saveProperty()
    } catch (error) {
      throw new Error(error)
    }

  }

  public static async getPrperties(resPerPage: number, page: number) {
    try {
      const _getProperties = () => {
        return new Promise((resolve, reject) => {
          MongoClient.connect(url, async (err: MongoError, result: MongoClient) => {
            const db = result.db('realestate');
            let dbResponse: any = await db.collection('properties').find({}).skip((resPerPage * page) - resPerPage)
              .limit(resPerPage).toArray();
            let count = await db.collection('realestate').find({}).count();
            let properties = {
              products: dbResponse,
              pages: Math.ceil(count / resPerPage),
              numOfResults: dbResponse.length,
              currentPage: page
            };
            resolve(properties);
          })
        })
      }
      return await _getProperties();
    } catch (error) {
      throw new Error(error)
    }

  }

  public static async getPropertyById(propertyId: string) {
    try {
      const _getPropertyById = () => {
        return new Promise((resolve, reject) => {
          MongoClient.connect(url, async (err: MongoError, result: MongoClient) => {
            const db = result.db('realestate');
            let dbResponse = await db.collection('properties').findOne({ propertyId: propertyId });
            resolve(dbResponse);
          })
        })
      }
      return await _getPropertyById();
    } catch (error) {
      throw new Error(error)
    }
  }
}
