import bola from "./assets/bola.png";
import ruleta from "./assets/ruleta.png";
import { useState, useEffect } from "react";

import "./App.css";


const $ = (element) => document.querySelector(element)

const buttons = new Array(37).fill(0);

function App() {


  const [isWorking, setIsWorking] = useState(false);
  const [cantApostar, setCantApostar] = useState(0);
  const [respuesta, setRespuesta] = useState(null);

  console.log(buttons)

  useEffect(() => {
    fetch('http://localhost:3000/number')
      .then(valor => valor.json())
      .then(json => console.log(json))
  }, [])



  async function handleClick(e) {

    const data = await fetch('http://localhost:3000/number')
    const grade = await data.json()
    console.log({ grade })


    setIsWorking(true)

    const bola = $('.bola')
    const ruleta = $('.ruleta')

    let anguloActual = 0;

    // Velocidad de rotación (cuántos grados se moverá la bola por cada intervalo de tiempo)
    const velocidadRotacion = 1; // Puedes ajustar este valor

    const radio = 160; // Radio de la ruleta

    const anguloFinal = grade.grado;
    console.log(anguloFinal)
    // Usamos setInterval para simular la animación
    const intervalo = setInterval(() => {
      anguloActual += velocidadRotacion;

      // Calcular las coordenadas X e Y de la bola según el ángulo
      const x = radio * Math.sin(anguloActual * (Math.PI / 180));
      const y = radio * -Math.cos(anguloActual * (Math.PI / 180));

      bola.style.left = `calc(50% + ${x}px - 5px)`; // 5px es la mitad del ancho de la bola
      bola.style.top = `calc(50% + ${y}px - 5px)`; // 5px es la mitad de la altura de la bola

      if (anguloActual >= anguloFinal + 360) {
        clearInterval(intervalo); // Detener la animación cuando se alcance el ángulo final
        setIsWorking(false)
      }
    }, 10);

    const numberData = await fetch('', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ number: parseInt(cantApostar, 10) })
    });

    const numberResponse = await numberData.json();
    setResult(numberResponse.result);

    // bola.classList.toggle('girar')
    ruleta.classList.add('girar')

    setTimeout(() => ruleta.classList.remove('girar'), 5000)

    // bola.style.transform = 'translateY(20px)'

    // for (let i=0;i<=720;i++){ 


  }


  function handleClickButton(e) {
    console.log(e.target.value)

  }


  return (
    <>
      <div className="container">
        <img className="ruleta" src={ruleta} alt="" />
        <img className="bola" src={bola} alt="" />
      </div>

      <button className={`${isWorking ? `hidden` : ''}`} onClick={handleClick} >

        <span>Girar!</span><i></i>
      </button>

      <article className="buttons">
        {
          buttons.map((button, i) => <input onClick={handleClickButton} type='button' value={i} />)
        }
      </article>
      <input
        type="number"
        value={cantApostar}
        onChange={(e) => setCantApostar(e.target.value)}
      />
    </>
  );
}

export default App;
