import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/talentomate').catch(err => console.error(err));

const userSchema = new mongoose.Schema({
    email: { type: String, required: [true, 'This field is required'], unique: true },
    password: { type: String, required: [true, 'This field is required'] },
    role: { type: String, required: [true, 'This field is required'] },
})

const User = mongoose.model('users', userSchema);
export default User;