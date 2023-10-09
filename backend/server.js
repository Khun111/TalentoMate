/**
 * Start server
 */
import express from "express";
import authRouter from "./authRoutes"
import employeeRouter from "./employeeRoutes";


const app = express();
app.use(express.json());
export const port = process.env.PORT || 5000


app.use(authRouter);
app.use(employeeRouter);

app.listen(port, () => {console.log('listening on', port)});
