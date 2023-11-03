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
        console.log("req.body: ", req.body)
        try {
            const employee = await User.findById(userId);
            console.log("employee._id.toString(): ", employee._id.toString())
            const leave = new Leave({ user: employee._id.toString(), start_date, end_date, reason });
            await leave.save();
            console.log("Leave data", leave);
            employee.leaveRequests.push(leave._id.toString());
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
        const { id } = req.params;
        console.log("id from frontend: ", id)
        try {
            const employee = await User.findById(id).populate('leaveRequests');
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