import { MongoClient, MongoError } from "mongodb";
export default class PropertyModel {
  public static async saveProperty(property: any) {
     const saveProperty=()=>{
    return new Promise((resolve,resject)=>{
    MongoClient.connect(
      "mongodb://localhost:27017/",
      async (err: MongoError, result: MongoClient) => {
        const db = result.db("realestate");
       resolve( await db.collection("property").insertOne(property));
        
      })
    
})
}
  return   saveProperty()
}

  public static async getPrperties (pageNo:number,limit:number) {
    
//  let skip= limit * (pageNo - 1)
//   let records = limit
  const getproperty=()=>{
    return new Promise((resolve,reject)=>{
   return MongoClient.connect(
        "mongodb://localhost:27017/",
        async (err: MongoError, result: MongoClient) => {
          const db = result.db("realestate");
          if(result){
          resolve(await db.collection("property").find({}).skip(limit * (pageNo - 1)).limit(limit).toArray())
          }else{
            reject(err)
          }
        }
      )
    })
  }
  return await getproperty()
}
 public static async  getPropertyById(propertyId:any){
  const getPropertyById=()=>{
    return new Promise((resolve,reject)=>{
      return MongoClient.connect(
        "mongodb://localhost:27017/",async (err: MongoError, result: MongoClient) => {
          const db=result.db('realestate');
          if(result){
            resolve(db.collection("property").findOne({propertyId:propertyId}))
          }else{
            reject(err)
          }
      })
   })
  }
   return  await getPropertyById()
 }
 public  static  async deletePropertyById(propertyId:any){
  const  deletepropertyId=()=>{
    return new Promise ((resolve,reject)=>{
      return  MongoClient.connect('mongodb://localhost:27017', async(err:MongoError,result:MongoClient)=>{
         const  db=result.db('realestate');
         if(result){
           return db.collection('property').deleteOne({propertyId:propertyId})
         }else{
          reject(err)
         }

      })

    })
  }
 return   await deletepropertyId()
 }
}

