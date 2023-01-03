import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import env from "dotenv";
import postRoute from "./routes/postRoute.js";

env.config();
const app = express();

app.use(express.json())
app.use(cors());
app.use("/", postRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>"Connected To Server")
mongoose.connect(process.env.CONNECTION_URL)
const db = mongoose.connection
db.on('error',(error)=>console.log(error.message))
db.once('open',()=>console.log("Connected To db"))

