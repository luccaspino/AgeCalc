import React, { useState } from 'react';
import Forms from './components/Forms/Forms';
import Results from './components/Results/Results';
import './App.css';

const App = () => {
  const [data, setData] = useState({ day: '', month: '', year: '' });
  const [idade, setIdade] = useState({ years: '--', months: '--', days: '--' });
  const [erros, setErros] = useState({ day: '', month: '', year: '' });

  const anoBissexto = (ano) => {
    return (ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0;
  };

  const validarDados = (dia, mes, ano) => {
    let novosErros = {};

    // Validações independentes para cada campo
    if (!dia.trim()) {
      novosErros.day = "This field is required";
    } else {
      const diaNum = parseInt(dia);
      if (isNaN(diaNum) || diaNum < 1 || diaNum > 31) {
        novosErros.day = "Must be a valid day";
      }
    }

    if (!mes.trim()) {
      novosErros.month = "This field is required";
    } else {
      const mesNum = parseInt(mes);
      if (isNaN(mesNum) || mesNum < 1 || mesNum > 12) {
        novosErros.month = "Must be a valid month";
      }
    }

    if (!ano.trim()) {
      novosErros.year = "This field is required";
    } else {
      const anoNum = parseInt(ano);
      const anoAtual = new Date().getFullYear();
      if (isNaN(anoNum) || anoNum > anoAtual) {
        novosErros.year = "Must be in the past";
      }
    }

    // Validações combinadas apenas se todos os campos estiverem preenchidos e válidos individualmente
    const diaValido = !novosErros.day && dia.trim();
    const mesValido = !novosErros.month && mes.trim();
    const anoValido = !novosErros.year && ano.trim();

    if (diaValido && mesValido && anoValido) {
      const diaNum = parseInt(dia);
      const mesNum = parseInt(mes);
      const anoNum = parseInt(ano);

      const diasNoMes = {
        1: 31,
        2: anoBissexto(anoNum) ? 29 : 28,
        3: 31,
        4: 30,
        5: 31,
        6: 30,
        7: 31,
        8: 31,
        9: 30,
        10: 31,
        11: 30,
        12: 31,
      };

      if (diaNum > diasNoMes[mesNum]) {
        novosErros.day = `Must be between 1-${diasNoMes[mesNum]}`;
      }

      const dataTeste = new Date(anoNum, mesNum - 1, diaNum);
      if (dataTeste.getDate() !== diaNum || 
          dataTeste.getMonth() + 1 !== mesNum || 
          dataTeste.getFullYear() !== anoNum) {
        novosErros.day = "Must be a valid date";
      }
    }

    return novosErros;
  };

  const handleMudancaData = (campo, valor) => {
    setData({ ...data, [campo]: valor });
    setErros({ ...erros, [campo]: '' });
  };

  const calcularIdade = () => {
    const errosValidacao = validarDados(data.day, data.month, data.year);
    setErros(errosValidacao);
    
    if (Object.keys(errosValidacao).length > 0) {
      return;
    }

    const dataNascimento = new Date(
      parseInt(data.year),
      parseInt(data.month) - 1,
      parseInt(data.day)
    );
    const hoje = new Date();

    let anos = hoje.getFullYear() - dataNascimento.getFullYear();
    let meses = hoje.getMonth() - dataNascimento.getMonth();
    let dias = hoje.getDate() - dataNascimento.getDate();

    if (dias < 0) {
      meses--;
      dias += new Date(hoje.getFullYear(), hoje.getMonth(), 0).getDate();
    }
    if (meses < 0) {
      anos--;
      meses += 12;
    }

    setIdade({ years: anos, months: meses, days: dias });
  };

  return (
    <div className="container">
      <div className="app">
        <Forms onDateChange={handleMudancaData} errors={erros} />
        <div className="divider">
          <hr />
          <button onClick={calcularIdade} className="calculate-button">
            <img 
              src="/images/icon-arrow.svg" 
              alt="Calculate age" 
              className="arrow-icon"
            />
          </button>
        </div>
        <Results age={idade} />
      </div>
    </div>
  );
};

export default App;
