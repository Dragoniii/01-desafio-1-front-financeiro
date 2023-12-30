import axios from 'axios';

const instance = axios.create({
    baseURL: "http://localhost:3000",
});

if (localStorage.getItem("ID Usuario") !== null) {
    window.location.assign("http://127.0.0.1:5500/home.html");
}

async function logar(event: Event) {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement;
    const email = formElement.email.value;
    const senha = formElement.senha.value;

    const mensagem = document.getElementById("mensagem");

    try {
        const resposta = await instance.post("/usuarios/login", {
            email,
            senha,
        });

        const usuarioid = resposta.data.usuarioId;

        localStorage.setItem("ID Usuario", usuarioid);

        window.location.assign("http://127.0.0.1:5500/home.html");
    } catch (error) {
        if (mensagem) {
            mensagem.innerHTML = "Credenciais inválidas";
        }
        console.log(error);
    }
}
