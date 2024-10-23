import axios from "axios"
import { asyncHandler } from "../utility/asyncHandler.js"
import { Lead } from "../models/lead.model.js"
import { Campaign } from "../models/campaign.model.js"
import { TransformedData } from "../models/transfromData.model.js"
import leadJsonData from "../json/leadData.json" assert { type: "json"}
import campaignJsonData from "../json/campaignData.json" assert { type:"json"}

const getAllLeadData = asyncHandler( async (req,res) => {

    const leadData = await axios.get("url-from-data-come")

    if(!leadData){
        res.json({
            success:false,
            message:"Unable to get the data from api"
        })
    }

    await Lead.insertMany(leadJsonData)

    return res
    .status(201)
    .json({
        success:true,
        data:leadData.data,
        message:"Lead data successfully came"
    })

} )

const getAllCampaignData = asyncHandler( async (req,res) => {

    const campaignData = await axios.get("url-from-data-come")

    if(!campaignData){
        res.json({
            success:false,
            message:"Unable to get the data from api"
        })
    }

    await Campaign.insertMany(campaignData.data)

    return res
    .status(201)
    .json({
        success:true,
        data:campaignData.data,
        message:"Campaign data successfully came"
    })

} )

// ETL process
const getAllTransformedData = asyncHandler( async (req,res) => {

    const leadData = await Lead.find()

    if(!leadData){
        res.json({
            success:false,
            message:"Unable to get the data from api"
        })
    }

    const pipeline = [
        // Join leads with campaigns based on a related field (assuming a campaignId in the Lead)
        {
            $lookup: {
                from: "campaigns",  // Campaign collection name
                localField: "_id",  // Matching field in Lead
                foreignField: "leadId",  // Assuming campaign has a leadId field
                as: "campaignInfo"
            }
        },
        // Unwind the joined campaign info (if multiple campaigns per lead)
        {
            $unwind: {
                path: "$campaignInfo",
                preserveNullAndEmptyArrays: true
            }
        },
        // Transformation: create fullName field and extract relevant campaign info
        {
            $project: {
                leadId: "$_id",
                campaignId: "$campaignInfo._id",
                fullName: { $concat: ["$firstName", " ", "$lastName"] },
                email: "$email",
                phoneNo: "$phoneNo",
                company: "$company",
                leadStatus: "$status",
                campaignInfo: "$campaignInfo"
            }
        },
        // Filter out leads without a campaign, if necessary
        {
            $match: {
                campaignId: { $exists: true }
            }
        }
    ];

    // Execute the aggregation
    const transformedLeads = await Lead.aggregate(pipeline);

    // Insert the transformed data into the TransformedData collection
    await TransformedData.insertMany(transformedLeads);

    return res
    .status(201)
    .json({
        success:true,
        data:campaignData.data,
        message:"Transformed data successfully came"
    })

} )

export {getAllLeadData,getAllCampaignData,getAllTransformedData}