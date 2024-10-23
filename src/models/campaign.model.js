import mongoose , {Schema}  from "mongoose";

const campaignSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['draft', 'running', 'completed', 'canceled'],
        default: 'draft'
    },
    budget: {
        type: Number,
        required: true
    },
    leads: [{
        type: Schema.Types.ObjectId,
        ref: 'Lead'
    }],
}
,{timestamps:true})

export const Campaign = mongoose.model("Campaign",campaignSchema)