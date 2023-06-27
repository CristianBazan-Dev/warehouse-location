import express from 'express'; 
import cors from 'cors'; 
import dotenv from 'dotenv'
import mongoose from 'mongoose';

// Basic functions of the server 
const app = express() 
app.use(express.json()); 
app.use(cors); 
dotenv.config(); 

// Routes 


// DB connection (mongooDB)
const URI = process.env.MONGODB_URI; 
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true, 
})
.then(() => {
    console.log("Connected to MongoDB")
})
.catch((err) => {
    console.log(err)
})

// DB connection (sql)


// Server initialization 
const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
    console.log("Server on port", PORT)
})