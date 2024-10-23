import { Router} from "express";
import { generatePdfReport } from "../controller/report.controller.js";

const documnetRouter = Router()

documnetRouter.route("/get-pdf").post(generatePdfReport)

export default  documnetRouter