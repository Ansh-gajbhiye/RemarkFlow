import express from "express";
import Report from "../models/report.model.js";

const router = express.Router();


router.post('/create', async (req, res)=>{
     try {
        const newreports = new Report(req. body);
        const savedreports = await newreports.save();
        res.status(201).json({message:"saved reports", data: savedreports})
     } catch (error) {
        res.status(500).json({message:"not saved ", error: error.message})
        
     }
})

router.post('/generate', async (req, res)=>{
 try {
   
 } catch (error) {
   
 }
})
export default router