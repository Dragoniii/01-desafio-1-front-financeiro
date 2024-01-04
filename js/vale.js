const instance = axios.create({
  baseURL: "http://localhost:3000/vale",
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

async function vale() {
  try {
    const resposta = await instance.get("/");
    const texto = resposta.data;
    const mensagem = document.getElementById("mensagem");
    mensagem.innerHTML = texto;
  } catch (error) {
    console.log(error);
  }
}

async function listarMovimentacoesVale() {
  const resposta = await instance.get("/valeList");
  const lista = resposta.data;
  const conteudo = document.getElementById("conteudo");

  conteudo.innerHTML = " "

  lista.forEach((movimentacao) => {
    const linha = document.createElement("tr");

    const celulaData = document.createElement("td");
    celulaData.innerHTML = movimentacao.data;

    const celulaVale = document.createElement("td");
    celulaVale.innerHTML = movimentacao.vale;

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
    linha.appendChild(celulaVale);
    linha.appendChild(celulaValor);

    linha.appendChild(celulaEditar)
    linha.appendChild(celulaApagar)


    botaoEditar.addEventListener('click', () => ajustarMovimentacaoVale(movimentacao.id))
    botaoApagar.addEventListener('click', () => deletarMovimentacaoVale (movimentacao.id))

    conteudo.appendChild(linha);
  });
}

function ajustarMovimentacaoVale(idAjustado) {
  idAjustado
}


function deletarMovimentacaoVale(idDeletado) {
  idDeletado
}

async function criarMovimentacaoVale() {
  const data = prompt("Data")
  const vale = prompt("Vale alimentação ou refeição?")
  const valor = parseFloat(prompt("Qual o valor?"))

  const resposta = await instance.post('/addVale', {
    data, vale, valor
  },{
    headers: {
      'authorization': sessionStorage.getItem("Token")
    }
  })
}

vale();
