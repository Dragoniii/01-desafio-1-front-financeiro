const instance = axios.create({
  baseURL: "http://localhost:3000/debito",
});

if (sessionStorage.getItem("Token") === null) {
  window.location.assign("http://127.0.0.1:5500/");
}

function sair() {
  sessionStorage.removeItem("Token");
  window.location.assign("http://127.0.0.1:5500/");
}

function voltar() {
  window.history.back();
}

async function debito() {
  try {
    const resposta = await instance.get("/");
    const texto = resposta.data;
    const mensagem = document.getElementById("mensagem");
    mensagem.innerHTML = texto;
  } catch (error) {
    console.log(error);
  }
}

async function listarMovimentacoesDebito() {
  const resposta = await instance.get("/debitoList", {
    headers: {
      authorization: sessionStorage.getItem("Token"),
    },
  });
  const lista = resposta.data;
  const conteudo = document.getElementById("conteudo");

  const cabecalho = document.createElement("tr");
  ["Data", "Banco", "Valor", "Editar", "Apagar"].forEach((titulo) => {
    const celulaCabecalho = document.createElement("th");
    celulaCabecalho.innerHTML = titulo;
    cabecalho.appendChild(celulaCabecalho);
  });
  conteudo.innerHTML = "";
  conteudo.appendChild(cabecalho);

  let totalValor = 0;

  lista.forEach((movimentacao) => {
    const linha = document.createElement("tr");

    const celulaData = document.createElement("td");
    celulaData.innerHTML = movimentacao.data;
    linha.appendChild(celulaData);

    const celulaBanco = document.createElement("td");
    celulaBanco.innerHTML = movimentacao.banco;
    linha.appendChild(celulaBanco);

    const celulaValor = document.createElement("td");
    celulaValor.innerHTML = movimentacao.valor;
    linha.appendChild(celulaValor);
    totalValor += parseFloat(movimentacao.valor);

    const celulaEditar = document.createElement("td");
    const botaoEditar = document.createElement("button");
    botaoEditar.innerHTML = "Editar";
    celulaEditar.appendChild(botaoEditar);
    linha.appendChild(celulaEditar);

    const celulaApagar = document.createElement("td");
    const botaoApagar = document.createElement("button");
    botaoApagar.innerHTML = "Apagar";
    celulaApagar.appendChild(botaoApagar);
    linha.appendChild(celulaApagar);

    botaoEditar.addEventListener("click", () =>
      ajustarMovimentacaoDebito(movimentacao.id)
    );
    botaoApagar.addEventListener("click", () =>
      deletarMovimentacaoDebito(movimentacao.id)
    );

    conteudo.appendChild(linha);
  });

  const rodape = document.createElement("tr");
  rodape.appendChild(document.createElement("td"));
  rodape.appendChild(document.createElement("td"));
  const celulaTotalValor = document.createElement("td");
  celulaTotalValor.innerHTML = totalValor;
  rodape.appendChild(celulaTotalValor);
  const celulaTotalGeral = document.createElement("td");
  celulaTotalGeral.setAttribute("colspan", "2");
  celulaTotalGeral.innerHTML = `Total: ${totalValor}`;
  rodape.appendChild(celulaTotalGeral);
  conteudo.appendChild(rodape);
}

async function ajustarMovimentacaoDebito(idAjustado) {
  const id = idAjustado;
  const data = prompt("Data");
  const banco = prompt("Qual banco?");
  const valor = parseFloat(prompt("Qual o valor?"));

  const resposta = await instance.put(
    "/updateDebito",
    {
      id,
      data,
      banco,
      valor,
    },
    {
      headers: {
        authorization: sessionStorage.getItem("Token"),
      },
    }
  );
  const servidor = resposta.data;
  alert(servidor);

  listarMovimentacoesDebito();
}

async function deletarMovimentacaoDebito(idDeletado) {
  const resposta = await instance.delete(`/deleteDebito?id=${idDeletado}`, {
    headers: {
      authorization: sessionStorage.getItem("Token"),
    },
  });
  const servidor = resposta.data;
  alert(servidor);

  listarMovimentacoesDebito();
}

async function criarMovimentacaoDebito() {
  const data = prompt("Data");
  const banco = prompt("Qual banco?");
  const valor = parseFloat(prompt("Qual o valor?"));

  const resposta = await instance.post(
    "/addDebito",
    {
      data,
      banco,
      valor,
    },
    {
      headers: {
        authorization: sessionStorage.getItem("Token"),
      },
    }
  );
  const servidor = resposta.data;
  alert(servidor);
  listarMovimentacoesDebito();
}

debito();
