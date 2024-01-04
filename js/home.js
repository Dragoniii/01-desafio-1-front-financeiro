const instance = axios.create({
  baseURL: "http://localhost:3000",
});

if (sessionStorage.getItem("Token") === null) {
  window.location.assign("http://127.0.0.1:5500/");
}

function paginaCredito() {
  window.location.assign("http://127.0.0.1:5500/credito.html");
}

function paginaDebito() {
  window.location.assign("http://127.0.0.1:5500/debito.html");
}

function paginaDinheiro() {
  window.location.assign("http://127.0.0.1:5500/dinheiro.html");
}

function paginaVale() {
  window.location.assign("http://127.0.0.1:5500/vale.html");
}

function sair() {
  sessionStorage.removeItem("Token");
  window.location.assign("http://127.0.0.1:5500/");
}