/**
 * Start server
 */
import express from "express";
import authRouter from "./authRoutes"
import employeeRouter from "./routes/employeeRoutes";
import cors from 'cors'
//import authRouter from "./authRoutes"


const app = express();
app.use(express.json());


app.use(authRouter);
app.use(employeeRouter);
app.use(cors());

const port = process.env.PORT || 5000

app.listen(port, () => { console.log('listening on', port) });
