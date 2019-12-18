// import  IDataSource from '../configs/database';
interface IDataSource {
    connectionString: string,
    dbName: string | undefined,
    options: Object
}
const datasource: IDataSource[] = [
    {
        connectionString: `mongodb://${process.env.MONGO_DB_HOST}:${process.env.MONGO_DB_PORT}`,
        dbName: process.env.MONGODB_DB_NAME,
        options: {
            poolSize: 20,
            authSource: 'admin',
            authMechanism: 'DEFAULT',
            auth: {
                username: process.env.MONGO_DB_USERNAME,
                password: process.env.MONGO_DB_PASSWORD
            },
            keepAlive: true,
            connectTimeoutMS: 60000,
            socketTimeoutMS: 60000,
            reconnectTries: Number.MAX_VALUE,
            reconnectInterval: 1000,
        }
    }
]

export default datasource;