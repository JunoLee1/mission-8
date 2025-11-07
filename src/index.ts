import express from "express";
import apiRoutes from "./routes/index.routes.js"
import cors from "cors"

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.use(cors());

app.use("/api",apiRoutes);


export default app