import bola from "./assets/bola.png";
import ruleta from "./assets/ruleta.png";
import { useState, useEffect } from "react";

import "./App.css";


const $ = (element) => document.querySelector(element)

function App() {

  const [isWorking, setIsWorking] = useState(false)

  useEffect(()=>{
    fetch('http://localhost:3000/number')
    .then(valor => valor.json())
    .then(json => console.log(json))
  },[])

  

  function handleClick(e){

    setIsWorking(true)
    
    const bola = $('.bola')
    const ruleta = $('.ruleta')

    let anguloActual = 0;

    // Velocidad de rotación (cuántos grados se moverá la bola por cada intervalo de tiempo)
    const velocidadRotacion = 1; // Puedes ajustar este valor

    const radio = 150; // Radio de la ruleta

    const anguloFinal = 360;

    // Usamos setInterval para simular la animación
    const intervalo = setInterval(() => {
        anguloActual += velocidadRotacion;

        // Calcular las coordenadas X e Y de la bola según el ángulo
        const x = radio * Math.sin(anguloActual * (Math.PI / 180));
        const y = radio * -Math.cos(anguloActual * (Math.PI / 180));

        bola.style.left = `calc(50% + ${x}px - 5px)`; // 5px es la mitad del ancho de la bola
        bola.style.top = `calc(50% + ${y}px - 5px)`; // 5px es la mitad de la altura de la bola

        if (anguloActual >= anguloFinal) {
            clearInterval(intervalo); // Detener la animación cuando se alcance el ángulo final
            setIsWorking(false)
        }
    }, 10);

    // bola.classList.toggle('girar')
    ruleta.classList.add('girar')

    setTimeout(()=> ruleta.classList.remove('girar'),5000)

    // bola.style.transform = 'translateY(20px)'

    // for (let i=0;i<=720;i++){ 


  }


  return (
    <>
      <div className="container">
        <img className="ruleta" src={ruleta} alt="" />
        <img className="bola" src={bola} alt="" />
      </div>
      <button onClick={handleClick} className={isWorking ? `hidden` : ''}>Rodar</button>
    </>
  );
}

export default App;
