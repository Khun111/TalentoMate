import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    status: {
        type: String,
        enum: ['Present', 'Absent'],
    },
},
{timestamps: true}
);

const Attendance = mongoose.model('Attendance', AttendanceSchema);
export default Attendance;