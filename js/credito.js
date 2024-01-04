const instance = axios.create({
  baseURL: "http://localhost:3000/credito",
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
    const resposta = await instance.get("/");
    const texto = resposta.data;
    const mensagem = document.getElementById("mensagem");
    mensagem.innerHTML = texto;
  } catch (error) {
    console.log(error);
  }
}

async function listarMovimentacoesCredito() {
  const resposta = await instance.get("/creditoList");
  const lista = resposta.data;
  const conteudo = document.getElementById("conteudo");

  conteudo.innerHTML = " "

  lista.forEach((movimentacao) => {
    const linha = document.createElement("tr");

    const celulaData = document.createElement("td");
    celulaData.innerHTML = movimentacao.data;

    const celulaBanco = document.createElement("td");
    celulaBanco.innerHTML = movimentacao.banco;

    const celulaParcelado = document.createElement("td");
    celulaParcelado.innerHTML = movimentacao.parcelado;

    const celulaVista = document.createElement("td");
    celulaVista.innerHTML = movimentacao.vista;


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
    linha.appendChild(celulaParcelado);
    linha.appendChild(celulaVista);

    linha.appendChild(celulaEditar)
    linha.appendChild(celulaApagar)

    botaoEditar.addEventListener('click', () => ajustarMovimentacaoCredito(movimentacao.id))
    botaoApagar.addEventListener('click', () => deletarMovimentacaoCredito(movimentacao.id))

    conteudo.appendChild(linha);
  });
}

function ajustarMovimentacaoCredito(idAjustado) {
  idAjustado
}

function deletarMovimentacaoCredito(idDeletado) {
  idDeletado
}

async function criarMovimentacaoCredito() {
  const data = prompt("Data")
  const banco = prompt("Qual banco?")
  const parcelado = parseFloat(prompt("Qual o parcelado?"))
  const vista = parseFloat(prompt("Qual o valor à vista?"))

  const resposta = await instance.post('/addCredito', {
    data, banco, parcelado, vista
  },{
    headers: {
      'authorization': sessionStorage.getItem("Token")
    }
  })
}

credito();