import express from 'express';
const router = express.Router();

router.get("/all", async(req, res)=>{
try{
const allTemplates = await Template.find();
res.status(200).json(allTemplates)
} catch (error){
    res.status(500).json({message: "server broke", error: error.message});
}   
});
export default router;