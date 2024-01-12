const instance = axios.create({
  baseURL: "https://planilha-financeira.onrender.com/",
});

if (sessionStorage.getItem("Token") === null) {
  window.location.assign("https://dragoniii.github.io/01-desafio-1-front-financeiro/");
}

function sair() {
  sessionStorage.removeItem("Token");
  window.location.assign("https://dragoniii.github.io/01-desafio-1-front-financeiro/");
}

function voltar() {
  window.history.back();
}

async function vale() {
  try {
    const resposta = await instance.get("/vale");
    const texto = resposta.data;
    const mensagem = document.getElementById("mensagem");
    mensagem.innerHTML = texto;
  } catch (error) {
    console.log(error);
  }
}

async function listarMovimentacoesVale() {
  const resposta = await instance.get("/vale/valeList", {
    headers: {
      authorization: sessionStorage.getItem("Token"),
    },
  });
  const lista = resposta.data;
  const conteudo = document.getElementById("conteudo");

  const cabecalho = document.createElement("tr");
  ["Data", "Vale", "Valor", "Editar", "Apagar"].forEach((titulo) => {
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

    const celulaVale = document.createElement("td");
    celulaVale.innerHTML = movimentacao.vale;
    linha.appendChild(celulaVale);

    const celulaValor = document.createElement("td");
    celulaValor.innerHTML = (movimentacao.valor).toFixed(2);
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
      ajustarMovimentacaoVale(movimentacao.id)
    );

    botaoApagar.addEventListener("click", () => {
      if (confirm(`Tem certeza que deseja apagar esta movimentação do vale ${movimentacao.vale}?`)) {
        deletarMovimentacaoVale(movimentacao.id);
      }
    });

    conteudo.appendChild(linha);
  });

  const rodape = document.createElement("tr");
  rodape.appendChild(document.createElement("td"));
  rodape.appendChild(document.createElement("td"));
  const celulaTotalValor = document.createElement("td");
  celulaTotalValor.innerHTML = totalValor.toFixed(2);
  rodape.appendChild(celulaTotalValor);
  const celulaTotalGeral = document.createElement("td");
  celulaTotalGeral.setAttribute("colspan", "2");
  celulaTotalGeral.innerHTML = `Total : ${totalValor.toFixed(2)}`;
  rodape.appendChild(celulaTotalGeral);
  conteudo.appendChild(rodape);
}

async function ajustarMovimentacaoVale(idAjustado) {
  const id = idAjustado;
  const data = prompt("Data");
  const vale = prompt("Qual o vale?");
  const valor = parseFloat(prompt("Qual o valor?"));

  const resposta = await instance.put(
    "/vale/updateVale",
    {
      id,
      data,
      vale,
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

  listarMovimentacoesVale();
}

async function deletarMovimentacaoVale(idDeletado) {
  const resposta = await instance.delete(`/vale/deleteVale?id=${idDeletado}`, {
    headers: {
      authorization: sessionStorage.getItem("Token"),
    },
  });
  const servidor = resposta.data;
  alert(servidor);

  listarMovimentacoesVale();
}

async function criarMovimentacaoVale() {
  const data = prompt("Data");
  const vale = prompt("Vale alimentação ou refeição?");
  const valor = parseFloat(prompt("Qual o valor?"));

  const resposta = await instance.post(
    "/vale/addVale",
    {
      data,
      vale,
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
  listarMovimentacoesVale();
}

vale();
