import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import route from "./routes/userRoute.js";


dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(cors());


const PORT = process.env.PORT || 8080;
const URL = process.env.MONGOURL;

mongoose.connect(URL)
    .then(()=>{

        console.group("DB connected successfully");
        app.listen(PORT, () => {
            console.log(`Listening on port ${PORT}`);
      });
})
    .catch(error => console.log(error));


    app.use("/api",route);