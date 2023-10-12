import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/talentomate').then(() => console.log('Connected mongoose')).catch(err => console.error(err));

const userSchema = new mongoose.Schema({
    email: { type: String, required: [true, 'This field is required'], unique: true },
    password: { type: String, required: [true, 'This field is required'], },
    role: { type: String, required: [true, 'This field is required'], },
    attendanceRecords: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AttendanceRecord',
    },
    ],
})

const User = mongoose.model('users', userSchema);

// const AttendanceSchema = new mongoose.Schema({
//     user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'User',
//     },
//     date: {
//         type: String,
//         required: [true, 'This field is required'],
//     },
//     staus: String,
// });

// const Attendance = mongoose.model('attendanceRecords', AttendanceSchema);
export default {
    User,
}