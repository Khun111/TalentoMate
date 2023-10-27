import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'This field is required'], unique: true },
    email: { type: String, required: [true, 'This field is required'], unique: true },
    password: { type: String, required: [true, 'This field is required'], },
    role: { type: String, required: [true, 'This field is required'], },
    job: { type: String,},
    attendanceRecords: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attendance',
    },
    ],
    leaveRequests : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Leave',
    },
],
},
{ timestamps: true }
)

const User = mongoose.model('User', userSchema);
export default User;