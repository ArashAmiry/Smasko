import { createConnection } from "mongoose";
import PASSWORD from "../db_password";



export const conn = createConnection(`mongodb+srv://nilssvanstedt:${PASSWORD}@smasko.7kref43.mongodb.net/?retryWrites=true&w=majority`);