import mongoose from "mongoose";

const LeaveSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    start_date: {
        type: Date,
        required: [true, 'This field is required'],
    },
    end_date: {
        type: Date,
        required: [true, 'This field is required'],
    },
    reason: {
        type: String,
    },
},
    { timestamps: true }
);

const Leave = mongoose.model('Leave', LeaveSchema);
export default Leave;