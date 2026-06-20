import express from "express";
import userRoute from './routes/user_route.js';
import productRoute from "./routes/product_route.js";
import orderRouter from "./routes/orderRoute.js";
import adminStatsRouter from "./routes/adminStats.js"
import connectDB from "./db/dbconection.js";
import error_middleware from "./middleware/error_middleware.js";
import cors from "cors";
import 'dotenv/config';
import path from "path";


const app = express();

//Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://dastoor-shawls-maker.vercel.app"
    ],
    credentials: true
  })
);

app.use(express.json());


// Allow Express to serve local image files
app.use("/assets", express.static(path.join(process.cwd(), "assets")));


//Routeing+++
app.use('/api/auth',userRoute);
app.use('/api/product',productRoute);
app.use("/api/orders", orderRouter);
app.use("/api/admin",adminStatsRouter );


//Connection to Mongo DB && Clodinary 
connectDB();

//Error Handle-+++++
app.use(error_middleware);

//Port
const Port = process.env.PORT;
app.listen(Port,()=>console.log(`Port is listen : ${Port}`));