import Attendance from "./models/attendanceModel"
import redisClient from "./redis";
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
        const token = req.headers.authorization;
        const key = `auth_${token}`;
        const {date} = req.body
        try {
            const user = await redisClient.client.get(key)
            const data = new Attendance ({user, date});
            const attendance = await data.save();
            res.status(201).json({attendance})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    static async update (req, res) {
        const user = new ObjectId(req.params.id)
            , options = {new: true}
            , data = req.body;
        try {
            const attendance = await Attendance.findOneAndUpdate({user}, data, options)
            res.status(200).json({attendance})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    static async readAll (req, res) {
        try {
            const employees = await Attendance.find();
            res.status(200).json({employees});
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    static async readOne (req, res) {
        const user = new ObjectId(req.params.id)
        try {
            const employee = await Attendance.findOne({user});
            res.status(200).json({employee});
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    static async deleteOne (req, res) {
        const user = new ObjectId(req.params.id)
        try {
            const employee = await Attendance.findOneAndDelete({user});
            res.status(204).json({success: 'Deleted'});
        } catch (error) {
            res.status(500)json({error: error.message})
        }
    }
    
}