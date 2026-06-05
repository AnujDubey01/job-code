const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const connectDB  = require("./config/db");
const userRoutes = require('./routes/user.route')
const companyRoutes = require('./routes/company.route')
const jobRoutes = require('./routes/job.route')
dotenv.config();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOption = {
    origin: 'http://localhost:5173',
    credentials: true
}

app.use(cors(corsOption));

app.get('/' ,(req,res) => {
    res.send("Hello World");
})

const PORT = process.env.PORT || 3000


app.use('/api/v1/user', userRoutes);
app.use('/api/v1/company', companyRoutes);
app.use('/api/v1/job', jobRoutes);

app.listen(PORT,()=> {
    connectDB();
    console.log("Server started on port 3600");
})