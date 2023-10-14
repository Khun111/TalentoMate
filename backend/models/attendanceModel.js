import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    date: {
        type: String,
        required: [true, 'This field is required'],
    },
    status: String,
});

const Attendance = mongoose.model('attendanceRecords', AttendanceSchema);
export default Attendance;