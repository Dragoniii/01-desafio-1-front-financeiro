// const instance = axios.create({
//   baseURL: "http://localhost:3000/credito",
// });

// if (localStorage.getItem("Token") === null) {
//   window.location.assign("http://127.0.0.1:5500/");
// }

// async function credito () {


//   try {
//     const resposta = await instance.get("/", {
//     });
//     const token = resposta.data.mensagem;
//     const mensagem = document.getElementById("mensagem")
//     mensagem.innerHTML = token

//   } catch (error) {
//     mensagem.setAttribute("style", "color: red; font-size:25px;");
//     mensagem.innerHTML = "Credenciais inválidas";
//     console.log(error);
//   }
// }

// credito () 

const instance = axios.create({
  baseURL: "http://localhost:3000/credito",
});

if (localStorage.getItem("Token") === null) {
  window.location.assign("http://127.0.0.1:5500/");
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

credito();
