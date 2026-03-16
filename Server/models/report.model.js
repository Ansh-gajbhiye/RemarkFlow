import mongoose, { Schema } from "mongoose";

const reportScheme = new Schema ({
    losNumber: {
            type: String,
            required:true,
    }, 
    applicantName: {
            type: String,
            required:true,
    }, 
    finalText: {
            type: String,
            required:true,
    }, 
})

const Report = mongoose.model("report", reportScheme)
export default Report