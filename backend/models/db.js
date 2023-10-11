import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/talentomate').catch(err => console.error(err));
export default mongoose;