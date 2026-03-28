import express from "express";
import Report from "../models/report.model.js";
import Template from "../models/template.model.js"; // 1. Capital T for the Model

const router = express.Router();

router.post('/create', async (req, res)=>{
   try {
      const newreports = new Report(req.body);
      const savedreports = await newreports.save();
      res.status(201).json({message:"saved reports", data: savedreports});
   } catch (error) {
      res.status(500).json({message:"not saved ", error: error.message});
   }
});

// POST route to generate a report
router.post('/generate', async (req, res)=>{
   try {   
      // 2. Lowercase 'template' for the data from the user
      const { template, finalreport } = req.body; 
      
      const foundtemplate = await Template.findOne({ name: template });
      
      if (!foundtemplate) {
         return res.status(404).json({ message: "template not found" });
      } else {
         // 3. Keep the variable name perfectly consistent
         let finalParagraph = foundtemplate.content;
         
         for (const key in finalreport) {
            const searchRule = new RegExp(`\\$\\{${key}\\}`, 'g');
            finalParagraph = finalParagraph.replace(searchRule, finalreport[key]);
         }
         
         return res.status(200).json({
            message: "report merged!",
            generatedReport: finalParagraph
         });
      }
      
   } catch (error) {
      // 4. Handle the error so the server doesn't hang
      res.status(500).json({ message: "Generation failed", error: error.message });
   }
});

export default router;