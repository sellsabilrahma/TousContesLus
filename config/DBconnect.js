import {connect} from "mongooose";

async function connectDB(dbName) {
    try {
        const uri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/";
        await connect(`${uri}${dbName}`);
        console.log(`MongoDB connecté à : ${dbName}`);
    } catch (error) {
        console.error("Erreue de connexion MongoDB :", error.message);
        process.exit(1);
    }
}

export default connectDB;