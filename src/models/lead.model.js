import mongoose , {Schema} from "mongoose";

const leadSchema = new Schema({
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phoneNo: {
            type: String,
            required: true,
            unique:true
        },
        company: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ['new', 'contacted', 'in_progress', 'closed'],
            default: 'new'
        },
    }
,{timestamps:true})

export const Lead = mongoose.model("lead",leadSchema)