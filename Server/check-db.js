import mongoose from "mongoose";
import 'dotenv/config';
import template from "./models/template.model.js";
import Report from "./models/report.model.js";

async function seeInsideValute() {
    try {
        console.log("connecting to database");
        await mongoose.connect(process.env.MONGODB_URI);

        const allTemplates = await template.find();
        const allReports = await Report.find();

        console.log("\n================ TEMPLATES IN VAULT ================");
        console.dir(allTemplates, { depth: null, colors: true });

        console.log("\n================ REPORTS IN VAULT ==================");
        console.dir(allReports, { depth: null, colors: true });

        console.log("\n closing connection  ");
        process.exit(0);

    } catch (error) {
        console.log("Error:", error.message);
        process.exit(1);
    }
}
seeInsideValute();