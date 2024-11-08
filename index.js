import express from 'express'
import mongoose from 'mongoose';
import cors from "cors"
import { Auth, getMe, Record } from './Controllers/AuthController.js'; 

const app = express()

mongoose
    .connect('mongodb+srv://Trigger:TheTrigger1911@tg-bot-test.omlfd.mongodb.net/?retryWrites=true&w=majority&appName=tg-bot-test')
    .then(() => console.log('connected'))
    .catch((err) => console.log("Error with MongoDB", err))

app.use(express.json())
app.use(cors({
    origin: "*"
}))

app.post('/auth', Auth); 
app.get("/getMe", getMe)
app.get("/newRecord", Record)

app.listen(
    4000, (err) => {
        console.log('server started');
        if (err) {
            console.log(err)
        }
    }
)