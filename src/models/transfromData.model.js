import mongoose, { Schema } from "mongoose";

// Define a schema for the transformed data
const transformedDataSchema = new Schema({
    leadId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Lead",
        required: true
    },
    campaignId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Campaign",
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    leadStatus: {
        type: String,
        required: true
    },
    campaignInfo: {
        type: Map,
        of: String // Adjust based on the structure of the campaign data
    }
}, { timestamps: true });

export const TransformedData = mongoose.model("TransformedData", transformedDataSchema);
