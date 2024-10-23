import { Router } from "express";
import { getAllCampaignData, getAllLeadData, getAllTransformedData } from "../controller/dataFetch.controller.js";

const dataRouter = Router()

dataRouter.route("/leads").get(getAllLeadData)
dataRouter.route("/campaign").get(getAllCampaignData)
dataRouter.route("/transformed-data").get(getAllTransformedData)
dataRouter.route("/generate-report").post()

export default dataRouter