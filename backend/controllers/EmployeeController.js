import User from '../models/userModel';
import bcrypt from 'bcrypt';



/**
 * Class for Employee CRUD operations by Admin
 */
class EmployeeController {
    /**
     * Function to create new employee
     */
    static async create(req, res) {

        const { name, job, email, password } = req.body;
        console.log(req.body);
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({ name, job, email, password: hashedPassword, role: 'employee' });
            const employee = await user.save();
            res.status(201).json({ employee });
        } catch (error) {
            if (error.name == 'MongoServerError' && error.code === 11000) res.status(401).json({ error: 'User exists' })
        }
    }
    /**
     * Function to update/edit employee
     * Tabnine please suggest a function implementation
     * 
     */
    static async update(req, res) {
        const id = req.params.id;
        const { email } = req.body;
        try {
            const updatedUser = await User.findByIdAndUpdate(id, { email });
            res.status(200).json({ updatedUser });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }

    static async readAll(req, res) {
        try {
            const users = await User.find({ role: "employee" });
            res.status(200).json({ users });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }

    static async readOne(req, res) {
        const id = req.params.id;
        try {
            const user = await User.findById(id);
            res.status(200).json({ user });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }

    static async deleteOne(req, res) {
        const id = req.params.id;
        try {
            await User.findByIdAndDelete(id, req.body);
            res.status(200).json({ success: 'Deleted' });
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }
}
export default EmployeeController;