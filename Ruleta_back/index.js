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

    const min = 0;
    const max = 37;

    const rotationNum = 360/37 

    const ruleta = [
        0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 
        23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
    ];

    const randoValue = Math.floor((Math.random() * (max - min + 1)) + min);

    const indice = ruleta.indexOf(randoValue);

    const gradoGiro =Math.floor((rotationNum * indice));

    res.send({numero: randoValue,posicion:indice,grado:gradoGiro,num:rotationNum})

});



app.listen(PORT, () => console.log(`Listening in port ${PORT}`));
