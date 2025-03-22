import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({ dia: "", mes: "", ano: "" });
  const [idade, setIdade] = useState({ anos: "--", meses: "--", dias: "--" });
  const [erros, setErros] = useState({ dia: "", mes: "", ano: "" });
  const [valido, setValido] = useState(false);

  const AnoBissexto = (ano) => {
    return (ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0;
  };

  const validarDados = (dia, mes, ano) => {
    let novosErros = {};

    if (!dia.trim()) novosErros.dia = "This field is required";
    if (!mes.trim()) novosErros.mes = "This field is required";
    if (!ano.trim()) novosErros.ano = "This field is required";

    if (Object.keys(novosErros).length > 0) return novosErros;

    dia = parseInt(dia);
    mes = parseInt(mes);
    ano = parseInt(ano);

    const dataAtual = new Date();
    const dataInserida = new Date(ano, mes - 1, dia);

    // Verifica se a data é no futuro
    if (dataInserida > dataAtual) {
      novosErros.ano = "Must be in the past";
    }

    if (mes < 1 || mes > 12) {
      novosErros.mes = "Must be a valid month";
    }
    if (dia < 1 || dia > 31) {
      novosErros.dia = "Must be a valid day";
    }

    const diasNoMes = {
      1: 31,
      2: AnoBissexto(ano) ? 29 : 28,
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

    if (dia > diasNoMes[mes]) {
      novosErros.dia = "Must be a valid date";
    }

    return novosErros;
  };

  const calcularIdade = (dia, mes, ano) => {
    const dataNascimento = new Date(ano, mes - 1, dia);
    const dataAtual = new Date();

    let anos = dataAtual.getFullYear() - dataNascimento.getFullYear();
    let meses = dataAtual.getMonth() - dataNascimento.getMonth();
    let dias = dataAtual.getDate() - dataNascimento.getDate();

    if (dias < 0) {
      meses--;
      dias += new Date(dataAtual.getFullYear(), dataAtual.getMonth(), 0).getDate();
    }
    if (meses < 0) {
      anos--;
      meses += 12;
    }

    return { anos, meses, dias };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const novosErros = validarDados(formData.dia, formData.mes, formData.ano);
    if (Object.keys(novosErros).length > 0) {
      setErros(novosErros);
      setValido(false);
      return;
    }

    setErros({});
    setValido(true);

    const idade = calcularIdade(formData.dia, formData.mes, formData.ano);
    setIdade(idade);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErros({
      ...erros,
      [e.target.name]: "",
    });

    setValido(false);
  };

  const handleFocus = (e) => {
    setErros({
      ...erros,
      [e.target.name]: "",
    });
  };

  return (
    <div className="container">
      <div className="app">
        <form onSubmit={handleSubmit} noValidate>
          <div className="inputs-container">
            <label className={`input-group ${erros.dia ? "erro" : ""}`}>
              <span className="label-text">DAY</span>
              <input
                type="number"
                className={erros.dia ? "erro" : ""}
                placeholder="DD"
                name="dia"
                value={formData.dia}
                onChange={handleChange}
                onFocus={handleFocus}
              />
              {erros.dia && <p className="error-text">{erros.dia}</p>}
            </label>
            <label className={`input-group ${erros.mes ? "erro" : ""}`}>
              <span className="label-text">MONTH</span>
              <input
                type="number"
                className={erros.mes ? "erro" : ""}
                placeholder="MM"
                name="mes"
                value={formData.mes}
                onChange={handleChange}
                onFocus={handleFocus}
              />
              {erros.mes && <p className="error-text">{erros.mes}</p>}
            </label>
            <label className={`input-group ${erros.ano ? "erro" : ""}`}>
              <span className="label-text">YEAR</span>
              <input
                type="number"
                className={erros.ano ? "erro" : ""}
                placeholder="AAAA"
                name="ano"
                value={formData.ano}
                onChange={handleChange}
                onFocus={handleFocus}
              />
              {erros.ano && <p className="error-text">{erros.ano}</p>}
            </label>
          </div>
          <div className="divider">
            <hr />
            <button type="submit">
              <img src="src/assets/images/icon-arrow.svg" alt="submit" />
            </button>
          </div>
        </form>
        <div className="result">
          <p><span>{idade.anos}</span> years</p>
          <p><span>{idade.meses}</span> months</p>
          <p><span>{idade.dias}</span> days</p>
        </div>
      </div>
    </div>
  );
}

export default App;
