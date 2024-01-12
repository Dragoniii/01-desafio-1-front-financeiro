const instance = axios.create({
  baseURL: "https://planilha-financeira.onrender.com/",
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

async function dinheiro() {
  try {
    const resposta = await instance.get("/dinheiro");
    const texto = resposta.data;
    const mensagem = document.getElementById("mensagem");
    mensagem.innerHTML = texto;
  } catch (error) {
    console.log(error);
  }
}

async function listarMovimentacoesDinheiro() {
  const resposta = await instance.get("/dinheiro/dinheiroList", {
    headers: {
      authorization: sessionStorage.getItem("Token"),
    },
  });
  const lista = resposta.data;
  const conteudo = document.getElementById("conteudo");

  const cabecalho = document.createElement("tr");
  ["Data", "Motivo", "Valor", "Editar", "Apagar"].forEach((titulo) => {
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

    const celulaMotivo = document.createElement("td");
    celulaMotivo.innerHTML = movimentacao.motivo;
    linha.appendChild(celulaMotivo);

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

    botaoApagar.classList.add("btn2");
    botaoEditar.classList.add("btn2");  

    botaoEditar.addEventListener("click", () =>
      ajustarMovimentacaoDinheiro(movimentacao.id)
    );

    botaoApagar.addEventListener("click", () => {
      if (confirm("Tem certeza que deseja apagar esta movimentação em dinheiro?")) {
        deletarMovimentacaoDinheiro(movimentacao.id);
      }
    });

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

async function ajustarMovimentacaoDinheiro(idAjustado) {
  const id = idAjustado;
  const data = prompt("Data");
  const motivo = prompt("Qual o motivo?");
  const valor = parseFloat(prompt("Qual o valor?"));

  const resposta = await instance.put(
    "/dinheiro/updateDinheiro",
    {
      id,
      data,
      motivo,
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

  listarMovimentacoesDinheiro();
}

async function deletarMovimentacaoDinheiro(idDeletado) {
  const resposta = await instance.delete(`/dinheiro/deleteDinheiro?id=${idDeletado}`, {
    headers: {
      authorization: sessionStorage.getItem("Token"),
    },
  });
  const servidor = resposta.data;
  alert(servidor);

  listarMovimentacoesDinheiro();
}

async function criarMovimentacaoDinheiro() {
  const data = prompt("Data");
  const motivo = prompt("Qual o motivo?");
  const valor = parseInt(prompt("Qual o valor?"));

  const resposta = await instance.post(
    "/dinheiro/addDinheiro",
    {
      data,
      motivo,
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
  listarMovimentacoesDinheiro();
}

dinheiro();
