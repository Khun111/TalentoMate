import User from './db';
import bcrypt from 'bcrypt';



/**
 * Class for Employee CRUD operations by Admin
 */
class EmployeeController {
    /**
     * Function to create new employee
     */
    static async create(req, res) {
        const {email, password, role} = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new User({email, password: hashedPassword, role});
            const employee = await user.save();
            res.status(201).json({employee});
        } catch (error) {
            if (error.name == 'MongoServerError' && error.code === 11000) res.status(401).json({error:'User exists. Please login instead'})
        }
    }
    /**
     * Function to update/edit employee
     * Tabnine please suggest a function implementation
     * 
     */
    static async update(req, res) {
        const id = req.params.id;
        try {
            const updatedUser = await User.findByIdAndUpdate(id, req.body);
            res.status(200).json({updatedUser});
        } catch (error) {
            res.status(500).json({error: 'Server error'});
        }
    }

    static async readAll(req, res) {
        try {
            const users = await User.find();
            res.status(200).json({users});
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }

    static async readOne(req, res) {
        const id = req.params.id;
        try {
            const user = await User.findById(id);
            res.status(200).json({user});
        } catch (error) {
            res.status(500).json({ error: 'Server error' });
        }
    }

    static async delete(req, res) {
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