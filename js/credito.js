const instance = axios.create({
  baseURL: "http://localhost:3000",
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

async function credito() {
  try {
    const resposta = await instance.get("/credito");
    const texto = resposta.data;
    const mensagem = document.getElementById("mensagem");
    mensagem.innerHTML = texto;
  } catch (error) {
    console.log(error);
  }
}

async function listarMovimentacoesCredito() {
  const resposta = await instance.get("/credito/creditoList", {
    headers: {
      authorization: sessionStorage.getItem("Token"),
    },
  });
  const lista = resposta.data;
  const conteudo = document.getElementById("conteudo");

  const cabecalho = document.createElement("tr");
  const titulos = ["Mês", "Banco", "Parcelado", "À Vista", "Editar", "Apagar"];
  titulos.forEach((titulo) => {
    const celulaCabecalho = document.createElement("th");
    celulaCabecalho.innerHTML = titulo;
    cabecalho.appendChild(celulaCabecalho);
  });

  conteudo.innerHTML = "";
  conteudo.appendChild(cabecalho);

  let totalParcelado = 0;
  let totalVista = 0;

  lista.forEach((movimentacao) => {
    const linha = document.createElement("tr");

    const celulaData = document.createElement("td");
    celulaData.innerHTML = movimentacao.data;
    linha.appendChild(celulaData);

    const celulaBanco = document.createElement("td");
    celulaBanco.innerHTML = movimentacao.banco;
    linha.appendChild(celulaBanco);

    const celulaParcelado = document.createElement("td");
    celulaParcelado.innerHTML = (movimentacao.parcelado).toFixed(2);
    linha.appendChild(celulaParcelado);
    totalParcelado += parseFloat(movimentacao.parcelado);

    const celulaVista = document.createElement("td");
    celulaVista.innerHTML = (movimentacao.vista).toFixed(2);
    linha.appendChild(celulaVista);
    totalVista += parseFloat(movimentacao.vista);

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

    botaoApagar.classList.add("btn2");
    botaoEditar.classList.add("btn2");
    
    botaoEditar.addEventListener("click", () =>
      ajustarMovimentacaoCredito(movimentacao.id)
    );
    botaoApagar.addEventListener("click", () => {
      if (confirm("Tem certeza que deseja apagar esta movimentação de crédito?")) {
        deletarMovimentacaoCredito(movimentacao.id);
      }
    });
        
    conteudo.appendChild(linha);
  });

  const rodape = document.createElement("tr");

  rodape.appendChild(document.createElement("td"));
  rodape.appendChild(document.createElement("td"));

  const celulaTotalParcelado = document.createElement("td");
  celulaTotalParcelado.innerHTML = (totalParcelado).toFixed(2);
  rodape.appendChild(celulaTotalParcelado);

  const celulaTotalVista = document.createElement("td");
  celulaTotalVista.innerHTML = (totalVista).toFixed(2);
  rodape.appendChild(celulaTotalVista);

  const celulaTotalGeral = document.createElement("td");
  celulaTotalGeral.setAttribute("colspan", "2");
  celulaTotalGeral.innerHTML = `Total: ${(totalParcelado + totalVista).toFixed(2)}`;
  rodape.appendChild(celulaTotalGeral);

  conteudo.appendChild(rodape);
}

//120.8
//769.21

async function ajustarMovimentacaoCredito(idAjustado) {
  const id = idAjustado;
  const data = prompt("Qual o mês?");
  const banco = prompt("Qual banco?");
  const parcelado = parseFloat(prompt("Qual o parcelado?"));
  const vista = parseFloat(prompt("Qual o valor à vista?"));

  const resposta = await instance.put(
    "/credito/updateCredito",
    {
      id,
      data,
      banco,
      parcelado,
      vista,
    },
    {
      headers: {
        authorization: sessionStorage.getItem("Token"),
      },
    }
  );
  const servidor = resposta.data;
  alert(servidor);

  listarMovimentacoesCredito();
}

async function deletarMovimentacaoCredito(idDeletado) {
  const resposta = await instance.delete(`/credito/deleteCredito?id=${idDeletado}`, {
    headers: {
      authorization: sessionStorage.getItem("Token"),
    },
  });
  const servidor = resposta.data;
  alert(servidor);

  listarMovimentacoesCredito();
}

async function criarMovimentacaoCredito() {
  const data = prompt("Qual o mês?");
  const banco = prompt("Qual banco?");
  const parcelado = parseFloat(prompt("Qual o parcelado?"));
  const vista = parseFloat(prompt("Qual o valor à vista?"));

  const resposta = await instance.post(
    "/credito/addCredito",
    {
      data,
      banco,
      parcelado,
      vista,
    },
    {
      headers: {
        authorization: sessionStorage.getItem("Token"),
      },
    }
  );
  const servidor = resposta.data;
  alert(servidor);

  listarMovimentacoesCredito();
}

credito();
