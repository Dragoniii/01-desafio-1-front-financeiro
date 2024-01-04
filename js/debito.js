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
  const resposta = await instance.get("/debitoList");
  const lista = resposta.data;
  const conteudo = document.getElementById("conteudo");

  conteudo.innerHTML = " "

  lista.forEach((movimentacao) => {
    const linha = document.createElement("tr");

    const celulaData = document.createElement("td");
    celulaData.innerHTML = movimentacao.data;

    const celulaBanco = document.createElement("td");
    celulaBanco.innerHTML = movimentacao.banco;

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
    linha.appendChild(celulaBanco);
    linha.appendChild(celulaValor);

    linha.appendChild(celulaEditar)
    linha.appendChild(celulaApagar)


    botaoEditar.addEventListener('click', () => ajustarMovimentacaoDebito(movimentacao.id))
    botaoApagar.addEventListener('click', () => ajustarMovimentacaoDebito (movimentacao.id))

    conteudo.appendChild(linha);
  });
}

function ajustarMovimentacaoDebito(idAjustado) {
  idAjustado
}


function deletarMovimentacaoDebito(idDeletado) {
  idDeletado
}

async function criarMovimentacaoDebito() {
  const data = prompt("Data")
  const banco = prompt("Qual banco?")
  const valor = parseFloat(prompt("Qual o valor?"))

  const resposta = await instance.post('/addDebito', {
    data, banco, valor
  },{
    headers: {
      'authorization': sessionStorage.getItem("Token")
    }
  })
}


debito();