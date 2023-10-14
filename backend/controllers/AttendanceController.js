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
        const {userId} = req.body;
        try {
            const employee = await User.findById(userId);
            const attendance = new Attendance({user : employee._id, date: Date.now()});
            await attendance.save();
            console.log(attendance);
            employee.attendanceRecords.push(attendance._id);
            await employee.save();
            res.status(201).json({success: 'Atendance saved successfully'});
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    static async update (req, res) {
        const {id} = req.params
            , options = {new: true}
            , data = req.body;
        try {
            const attendance = await Attendance.findByIdAndUpdate(id, data, options)
            if (!attendance) res.status(404).json({error: 'Not Found'});
            res.status(200).json({attendance})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    static async read (req, res) {
        const { userId } = req.body;
        try {
            const employee = await User.findById(userId).populate({path: 'attendanceRecords', model: Attendance});
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
            if(!employee) res.status(404).json({error: 'Not Found'});
            const employee = await User.findByIdAndUpdate (attendance.user, {$pull: {attendanceRecords: id }});
            if (!employee) response.status(500).json({error: 'Error updsting employee'});
            res.status(204).json({success: 'Deleted'});
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
    
}

export default AttendanceControlller;