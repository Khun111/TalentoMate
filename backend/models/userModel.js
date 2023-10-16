import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: [true, 'This field is required'], unique: true },
    password: { type: String, required: [true, 'This field is required'], },
    role: { type: String, required: [true, 'This field is required'], },
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