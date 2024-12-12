import React, { useState, useEffect } from 'react';
import './Cronometro.css'; // Importando o arquivo de CSS

function Cronometro() {
  const [segundos, setSegundos] = useState(0);
  const [minutos, setMinutos] = useState(0);
  const [horas, setHoras] = useState(0);
  const [iniciado, setIniciado] = useState(false);

  // Controlando o cronômetro
  useEffect(() => {
    let intervalo;
    if (iniciado) {
      intervalo = setInterval(() => {
        setSegundos((segundos) => segundos + 1);
      }, 1000);
    } else {
      clearInterval(intervalo);
    }

    return () => clearInterval(intervalo);
  }, [iniciado]);

  // Função para iniciar o cronômetro
  const iniciarCronometro = () => {
    setIniciado(true);
  };

  // Função para pausar o cronômetro
  const pausarCronometro = () => {
    setIniciado(false);
  };

  // Função para zerar o cronômetro
  const zerarCronometro = () => {
    setSegundos(0);
    setMinutos(0);
    setHoras(0);
    setIniciado(false);
  };

  // Atualizando minutos e horas conforme os segundos
  useEffect(() => {
    if (segundos === 60) {
      setSegundos(0);
      setMinutos(minutos + 1);
    }
    if (minutos === 60) {
      setMinutos(0);
      setHoras(horas + 1);
    }
  }, [segundos, minutos, horas]);

  return (
    <div className="cronometro-container">
      <h2>Cronômetro</h2>
      <div className="display">
        <span>{horas < 10 ? `0${horas}` : horas}</span> :
        <span>{minutos < 10 ? `0${minutos}` : minutos}</span> :
        <span>{segundos < 10 ? `0${segundos}` : segundos}</span>
      </div>
      <div className="buttons">
        {!iniciado ? (
          <button onClick={iniciarCronometro}>Iniciar</button>
        ) : (
          <button onClick={pausarCronometro}>Pausar</button>
        )}
        <button onClick={zerarCronometro}>Zerar</button>
      </div>
    </div>
  );
}

export default Cronometro;
