/**
 * Start server
 */
import express from 'express';
import cors from 'cors'
//import authRouter from "./authRoutes"


const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000


//app.use(authRouter);

app.listen(port, () => {console.log('listening on', port)});
