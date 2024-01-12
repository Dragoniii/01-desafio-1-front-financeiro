const instance = axios.create({
  baseURL: "https://planilha-financeira.onrender.com/",
});

if (sessionStorage.getItem("Token") === null) {
  window.location.assign("https://dragoniii.github.io/01-desafio-1-front-financeiro/");
}

function paginaCredito() {
  window.location.assign("https://dragoniii.github.io/01-desafio-1-front-financeiro/credito.html");
}

function paginaDebito() {
  window.location.assign("https://dragoniii.github.io/01-desafio-1-front-financeiro/debito.html");
}

function paginaDinheiro() {
  window.location.assign("https://dragoniii.github.io/01-desafio-1-front-financeiro/dinheiro.html");
}

function paginaVale() {
  window.location.assign("https://dragoniii.github.io/01-desafio-1-front-financeiro/vale.html");
}

function sair() {
  sessionStorage.removeItem("Token");
  window.location.assign("https://dragoniii.github.io/01-desafio-1-front-financeiro/");
}