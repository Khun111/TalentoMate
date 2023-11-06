import { response } from "express";
import Attendance from "../models/attendanceModel";
import User from "../models/userModel";
import { ObjectId } from 'mongodb'
/**
 * Class to manage attendance records;
 */
class AttendanceControlller {
    /**
     * 
     * @param {*} req 
     * @param {*} res
     * function to create attendance record
     */
    static async create (req, res) {
        const {userId, status} = req.body;
        try {
            const employee = await User.findById(userId);
            const attendance = new Attendance({user : employee._id, status});
            await attendance.save();
            console.log(attendance);
            employee.attendanceRecords.push(attendance._id);
            await employee.save();
            res.status(201).json({attendance});
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    static async update (req, res) {
        const { id, status } = req.body;
        console.log(id, status)
        try {
            const attendance = await Attendance.findByIdAndUpdate(id, { status })
            if (!attendance) res.status(404).json({error: 'Not Found'});
            res.status(200).json({attendance})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    static async read (req, res) {
        const { id } = req.params;
        try {
            const employee = await User.findById(id).populate('attendanceRecords');
            console.log(employee);
            const attendance = employee.attendanceRecords;
            res.status(200).json({attendance});
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
 
    static async deleteOne (req, res) {
        const {id}= req.params;
        try {
            const attendance = await Attendance.findByIdAndRemove(id);
            if(!attendance) res.status(404).json({error: 'Not Found'});
            const employee = await User.findByIdAndUpdate (attendance.user, {$pull: {attendanceRecords: id }});
            if (!employee) response.status(500).json({error: 'Error updating employee'});
            res.status(204).send();
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
    
}

export default AttendanceControlller;