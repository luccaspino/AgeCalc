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
    const hoje = new Date();
    const anoAtual = hoje.getFullYear();
    const mesAtual = hoje.getMonth() + 1;
    const diaAtual = hoje.getDate();

    // Verificação de campos obrigatórios
    if (!dia.trim()) novosErros.day = "This field is required";
    if (!mes.trim()) novosErros.month = "This field is required";
    if (!ano.trim()) novosErros.year = "This field is required";

    if (Object.keys(novosErros).length > 0) return novosErros;

    // Conversão para números
    const diaNum = parseInt(dia);
    const mesNum = parseInt(mes);
    const anoNum = parseInt(ano);

    // Validações básicas
    if (diaNum < 1 || diaNum > 31) novosErros.day = "Must be a valid day";
    if (mesNum < 1 || mesNum > 12) novosErros.month = "Must be a valid month";
    if (anoNum > anoAtual) novosErros.year = "Must be in the past";

    // Validação de datas futuras no ano atual
    if (anoNum === anoAtual) {
      if (mesNum > mesAtual || (mesNum === mesAtual && diaNum > diaAtual)) {
        novosErros.year = "Must be in the past";
      }
    }

    // Validação de dias no mês
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

    if (mesNum in diasNoMes && diaNum > diasNoMes[mesNum]) {
      novosErros.day = novosErros.day = "Must be a valid day";
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

    // Mostrar 0 em vez de -- quando a diferença for zero
    setIdade({
      years: anos === 0 ? "0" : anos.toString(),
      months: meses === 0 ? "0" : meses.toString(),
      days: dias === 0 ? "0" : dias.toString()
    });
  };

  return (
    <div className="container">
      <div className="app">
        <Forms onDateChange={handleMudancaData} errors={erros} />
        <div className="divider">
          <hr />
          <button onClick={calcularIdade} className="botao-calcular">
            <img 
              src="/images/icon-arrow.svg" 
              alt="Calculate age" 
              className="icone-seta"
            />
          </button>
        </div>
        <Results age={idade} />
      </div>
    </div>
  );
};

export default App;
