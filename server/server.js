import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import env from "dotenv";
import postRoute from "./routes/postRoute.js";

env.config();
const app = express();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors({ origin: "*" }));
app.use("/posts", postRoute);

app.use("/", (req, res) => {
  res.send("Hello to post redux api");
});

const PORT = process.env.PORT || 5000;
mongoose.set('strictQuery', true);
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`server running on port : http://localhost:${PORT}`);
    });
  })
  .catch((error) => console.log(`${error} did not connect`));
