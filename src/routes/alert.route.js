import { Router } from "express";
import { checkCampaignConditions, checkLeadConditions } from "../controller/report.controller";

const alertRouter = Router()

alertRouter.route("/check-campaign-alerts").get(checkCampaignConditions)
alertRouter.route("/check-lead-alerts").get(checkLeadConditions)
