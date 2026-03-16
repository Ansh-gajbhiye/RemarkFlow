import express from 'express';
import templateRoutes from './routes/template.route.js'
import cors from "cors";
import "dotenv/config";
import connectDB from './configs/db.js';
import reportRoutes from './routes/report.route.js';


const app = express ();
const PORT = process.env.PORT || 3000; 

await connectDB ()

app.use(cors());
app.use(express.json());
app.use("/api/templates", templateRoutes);
app.use("/api/report", reportRoutes);


app.get("/", (req, res)=>{
    res.send("server is running ");
});

app.listen(PORT , ()=>{
    console.log(`example app listening on port ${PORT}`);
})