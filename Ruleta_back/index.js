import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()

const app = express();

app.use(cors())

const PORT = process.env.PORT ?? 5000;


app.get('/',(req,res)=>{
    res.send('Hola mundo')
})


app.get('/number',(req,res)=>{
    const min = 0
    const max = 37

    res.send({value : Math.floor((Math.random() * (max - min + 1)) + min),name: 'juan pablo'})
})



app.listen(PORT, () => console.log(`Listening in port ${PORT}`));
