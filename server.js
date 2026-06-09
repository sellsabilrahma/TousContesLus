import express from "express";
import cors from "cors";
import { config } from "dotenv";
import connectDB from "./config/DBconnect.js";
import { livreRouter } from "./Livres/livresRouter.js";

config();

const app = express()
const port = process.env.PORT || 4000

connectDB(process.env.DATABASE_NAME)

app.use(express.json())
app.use(cors())
app.use(express.static("public"));

app.use("/api", livreRouter);

app.get('/', (req, res) => {
    res.send("API IS WORKING")
})

app.listen(port, () => console.log(`Server started on port ${port}`));