import { response } from "express";
import Leave from "../models/leaveModel";
import User from "../models/userModel";
import { ObjectId } from 'mongodb'
/**
 * Class to manage Leave records;
 */
class LeaveControlller {
    /**
     * 
     * @param {*} req 
     * @param {*} res
     * function to create Leave record
     */
    static async create(req, res) {
        const { userId, start_date, end_date, reason } = req.body;
        try {
            const employee = await User.findById(userId);
            const leave = new Leave({ user: employee._id, start_date, end_date, reason });
            await leave.save();
            console.log(leave);
            employee.leaveRequests.push(leave._id);
            await employee.save();
            res.status(201).json({ leave });
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static async update(req, res) {
        const { id } = req.params
            , options = { new: true }
            , data = req.body;
            console.log(id, options, data);
        try {
            const leave = await Leave.findByIdAndUpdate(id, data, options)
            if (!leave) res.status(404).json({ error: 'Not Found' });
            res.status(200).json({ leave })
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static async read(req, res) {
        const { userId } = req.body;
        try {
            const employee = await User.findById(userId).populate('leaveRequests');
            console.log(employee);
            const leave = employee.leaveRequests;
            res.status(200).json({ leave });
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

    static async deleteOne(req, res) {
        const { id } = req.params;
        try {
            const leave = await Leave.findByIdAndRemove(id);
            if (!leave) res.status(404).json({ error: 'Not Found' });
            const employee = await User.findByIdAndUpdate(leave.user, { $pull: { leaveRequests: id } });
            if (!employee) response.status(500).json({ error: 'Error updsting employee' });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }

}

export default LeaveControlller;