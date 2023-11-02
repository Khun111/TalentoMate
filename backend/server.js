/**
 * Start server
 */
import 'dotenv/config';
import express from "express";
import swaggerUi from "swagger-ui-express"
import swaggerJSDoc from 'swagger-jsdoc';
import authRouter from "./routes/authRoutes"
import employeeRouter from "./routes/employeeRoutes";
import attendanceRouter from "./routes/attendanceRoutes";
import leaveRouter from "./routes/leaveRoutes";
import cors from 'cors'
//import authRouter from "./authRoutes"

import mongoose from 'mongoose';

mongoose.connect('mongodb+srv://<user>:<password>@<clustername>/<dbName>').then(() => console.log('Connected mongoose')).catch(err => console.error(err));




const app = express();
app.use(cors());
const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "TalentoMate Express API with Swagger",
            version: "0.1.0",
            description:
                "This is a REST API application for managing employees",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Oluwatobi",
                url: "https://github.com/Khun111",
                email: "amure387@email.com",
            },
        },
        servers: [
            {
                url: "http://localhost:5000",
            },
        ],
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJSDoc(options);
app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs)
);
// const corsOptions = {
//     origin: ["http://127.0.0.1:3000"],
//     methods: ['GET', 'POST', 'DELETE','PUT', 'PATCH'],
//     credentials: true,
// };
// app.use(cors(corsOptions));
app.use(express.json());


app.use(authRouter);
app.use(employeeRouter);
app.use(attendanceRouter);
app.use(leaveRouter);

const port = process.env.PORT || 5000

app.listen(port, () => { console.log('listening on', port) });
