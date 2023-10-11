import mongoose from "./db";

AttendanceSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    date : {
        type: String,
        required: [true, 'This field is required'],
    },
    staus: String,
});

Attendance = mongoose.model('attendanceRecords', AttendanceSchema);
export default Attendance;