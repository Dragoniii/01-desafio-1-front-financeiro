const instance = axios.create({
  baseURL: "http://localhost:3000/dinheiro",
});

if (sessionStorage.getItem("Token") === null) {
  window.location.assign("http://127.0.0.1:5500/");
}

function sair() {
  sessionStorage.removeItem("Token")
  window.location.assign("http://127.0.0.1:5500/");
}

function voltar() {
  window.history.back();
}

async function dinheiro() {
  try {
    const resposta = await instance.get("/");
    const texto = resposta.data;
    const mensagem = document.getElementById("mensagem");
    mensagem.innerHTML = texto;
  } catch (error) {
    console.log(error);
  }
}

async function listarMovimentacoesDinheiro() {
  const resposta = await instance.get("/dinheiroList");
  const lista = resposta.data;
  const conteudo = document.getElementById("conteudo");

  conteudo.innerHTML = " "

  lista.forEach((movimentacao) => {
    const linha = document.createElement("tr");

    const celulaData = document.createElement("td");
    celulaData.innerHTML = movimentacao.data;

    const celulaMotivo = document.createElement("td");
    celulaMotivo.innerHTML = movimentacao.motivo;

    const celulaValor = document.createElement("td");
    celulaValor.innerHTML = movimentacao.valor

    const celulaEditar = document.createElement('td')
    const botaoEditar = document.createElement('button')
    celulaEditar.appendChild(botaoEditar)
    botaoEditar.innerHTML = 'Editar'

    const celulaApagar = document.createElement('td')
    const botaoApagar = document.createElement('button')
    celulaApagar.appendChild(botaoApagar)
    botaoApagar.innerHTML = 'Apagar'

    linha.appendChild(celulaData);
    linha.appendChild(celulaMotivo);
    linha.appendChild(celulaValor);

    linha.appendChild(celulaEditar)
    linha.appendChild(celulaApagar)


    botaoEditar.addEventListener('click', () => ajustarMovimentacaoDinheiro(movimentacao.id))
    botaoApagar.addEventListener('click', () => ajustarMovimentacaoDinheiro (movimentacao.id))

    conteudo.appendChild(linha);
  });
}

function ajustarMovimentacaoDinheiro(idAjustado) {
  idAjustado
}


function deletarMovimentacaoDinheiro(idDeletado) {
  idDeletado
}

async function criarMovimentacaoDinheiro() {
  const data = prompt("Data")
  const motivo = prompt("Qual o motivo?")
  const valor = parseInt(prompt("Qual o valor?"))

  const resposta = await instance.post('/addDinheiro', {
    data, motivo, valor
  },{
    headers: {
      'authorization': sessionStorage.getItem("Token")
    }
  })
}


dinheiro();