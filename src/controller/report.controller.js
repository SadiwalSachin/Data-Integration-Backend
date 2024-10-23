import { asyncHandler } from "../utility/asyncHandler.js";
import { TransformedData } from "../models/transfromData.model.js";
import { createPdf } from "../utility/createPdf.js";
import { sendEmail } from "../utility/email.js";
import { Campaign } from "../models/campaign.model.js";
import { Lead } from "../models/lead.model.js";

const generatePdfReport = asyncHandler(async (req, res) => {
  const transformedData = await TransformedData.find();

  if (!transformedData) {
    res
    .status(500)
    .json({
      success: false,
      message: "Some internal error occured while getting pdf",
    });
  }

  createPdf(transformedData, res);
});

const checkCampaignConditions = asyncHandler(async (req, res) => {
  // Find campaigns with the status 'running' and with a budget below a threshold (example: $100)
  const campaigns = await Campaign.find({
    status: "running",
    budget: { $lt: 100 },
  });

  // If any campaigns meet the condition, send an alert
  if (campaigns.length > 0) {
    campaigns.forEach((campaign) => {
      const emailText = `Campaign "${campaign.name}" is running low on budget. Current budget: ${campaign.budget}`;
      sendEmail("admin@yourdomain.com", "Campaign Budget Alert", emailText);
    });
    return res
      .status(200)
      .json({ message: "Alerts sent for low budget campaigns." });
  } else {
    return res
      .status(200)
      .json({ message: "No campaigns require alerts at this time." });
  }
});

const checkLeadConditions = asyncHandler(async (req, res) => {
  // Find leads that have been 'contacted' but not yet converted within 7 days
  const leads = await Lead.find({
    status: "contacted",
    updatedAt: { $lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
  });

  // Send email alert for leads that meet the condition
  if (leads.length > 0) {
    leads.forEach((lead) => {
      const emailText = `Lead "${lead.firstName} ${lead.lastName}" has been contacted but not converted for over 7 days.`;
      sendEmail("sales@yourdomain.com", "Lead Conversion Alert", emailText);
    });
    return res
      .status(200)
      .json({ message: "Alerts sent for leads not converted." });
  } else {
    return res
      .status(200)
      .json({ message: "No leads require alerts at this time." });
  }
});

export { generatePdfReport, checkCampaignConditions, checkLeadConditions };
