/**
 * Start server
 */
import express from "express";
//import authRouter from "./authRoutes"


const app = express();
app.use(express.json());
const port = process.env.PORT || 5000


app.use(authRouter);

app.listen(port, () => {console.log('listening on', port)});
