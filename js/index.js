const mensagem = document.getElementById("mensagem");

const instance = axios.create({
  baseURL: "https://planilha-financeira.onrender.com/",
});

async function logar(event) {
  event.preventDefault();

  const usuario = event.srcElement.user.value;
  const senha = event.srcElement.senha.value;

  try {
    const resposta = await instance.post("/login/doLogin", {
      usuario,
      senha,
    });
    const token = resposta.data;

    sessionStorage.setItem("Token", token);

    window.location.assign("https://dragoniii.github.io/01-desafio-1-front-financeiro/home.html");
  } catch (error) {
    alert ("Credenciais inválidas");
    console.log(error);
  }
}
