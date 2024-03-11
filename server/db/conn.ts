import { Connection, createConnection } from "mongoose";
import PASSWORD from "../db_password";



async function makeConnection(): Promise<Connection> {
    return createConnection(`mongodb+srv://nilssvanstedt:${PASSWORD}@smasko.7kref43.mongodb.net/?retryWrites=true&w=majority`);
}

export const conn: Promise<Connection>  = makeConnection();