const mensagem = document.getElementById("mensagem");

const instance = axios.create({
  baseURL: "http://localhost:3000",
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
    alert(token)

    localStorage.setItem("Token", token);

    window.location.assign("http://127.0.0.1:5500/home.html")

  } catch (error) {
    mensagem.setAttribute("style", "color: red; font-size:25px;");
    mensagem.innerHTML = "Credenciais inválidas";
    console.log(error);
  }
}