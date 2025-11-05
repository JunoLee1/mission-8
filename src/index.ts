import express from "express";
import apiRoutes from "./routes/index.routes.js"
import cors from "cors"


const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.use("/api",apiRoutes);

app.listen(PORT, ()=> {
    console.log(`서버실행중${PORT}`)
});
