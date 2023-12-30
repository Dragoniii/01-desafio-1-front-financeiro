"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const instance = axios_1.default.create({
    baseURL: "http://localhost:3000",
});
if (localStorage.getItem("ID Usuario") !== null) {
    window.location.assign("http://127.0.0.1:5500/home.html");
}
function logar(event) {
    return __awaiter(this, void 0, void 0, function* () {
        event.preventDefault();
        const formElement = event.target;
        const email = formElement.email.value;
        const senha = formElement.senha.value;
        const mensagem = document.getElementById("mensagem");
        try {
            const resposta = yield instance.post("/usuarios/login", {
                email,
                senha,
            });
            const usuarioid = resposta.data.usuarioId;
            localStorage.setItem("ID Usuario", usuarioid);
            window.location.assign("http://127.0.0.1:5500/home.html");
        }
        catch (error) {
            if (mensagem) {
                mensagem.innerHTML = "Credenciais inválidas";
            }
            console.log(error);
        }
    });
}
