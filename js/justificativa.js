// const instance = axios.create({
//   baseURL: "http://localhost:3000",
// });

// if (sessionStorage.getItem("Token") === null) {
//   window.location.assign("http://127.0.0.1:5500/");
// }

// function sair() {
//   sessionStorage.removeItem("Token");
//   window.location.assign("http://127.0.0.1:5500/");
// }

// function voltar() {
//   window.history.back();
// }

// async function vale() {
//   try {
//     const resposta = await instance.get("/vale");
//     const texto = resposta.data;
//     const mensagem = document.getElementById("mensagem");
//     mensagem.innerHTML = texto;
//   } catch (error) {
//     console.log(error);
//   }
// }

async function listarJustificativas(fonteDoRecurso) {
  const resposta = await instance.get("/justificativa/justificativaList", {
    headers: {
      authorization: sessionStorage.getItem("Token"),
    },
  });

  const lista = resposta.data;
  const justificativa = document.getElementById("justificativa");

  const cabecalho = document.createElement("tr");
  ["Diagnostico", "Resolução", "Editar", "Apagar"].forEach((titulo) => {
    const celulaCabecalho = document.createElement("th");
    celulaCabecalho.innerHTML = titulo;
    cabecalho.appendChild(celulaCabecalho);
  });
  justificativa.innerHTML = "";
  justificativa.appendChild(cabecalho);

  lista.forEach((explicacao) => {
    if (fonteDoRecurso == explicacao.fonte) {
      const linha = document.createElement("tr");

      const celulaDiagnostico = document.createElement("td");
      celulaDiagnostico.innerHTML = explicacao.diagnostico;
      linha.appendChild(celulaDiagnostico);

      const celulaResolucao = document.createElement("td");
      celulaResolucao.innerHTML = explicacao.resolucao;
      linha.appendChild(celulaResolucao);

      const celulaEditar = document.createElement("td");
      const botaoEditar = document.createElement("button");
      botaoEditar.innerHTML = "Editar";
      celulaEditar.appendChild(botaoEditar);
      linha.appendChild(celulaEditar);

      const celulaApagar = document.createElement("td");
      const botaoApagar = document.createElement("button");
      botaoApagar.innerHTML = "Apagar";
      celulaApagar.appendChild(botaoApagar);
      linha.appendChild(celulaApagar);

      botaoApagar.classList.add("btn2");
      botaoEditar.classList.add("btn2");  

      botaoEditar.addEventListener("click", () =>
        ajustarJustificativa(explicacao.id, explicacao.fonte)
      );

      botaoApagar.addEventListener("click", () => {
        if (confirm(`Tem certeza que deseja apagar este diagnóstico?`)) {
          deletarJustificativa(explicacao.id, explicacao.fonte);
        }
      });

      justificativa.appendChild(linha);
    }
  });
}

async function ajustarJustificativa(idAjustado, fonteAjustado) {
  const id = idAjustado;
  const fonte = fonteAjustado;
  const diagnostico = prompt("Qual o diagnóstico");
  const resolucao = prompt("Qual a resolução?");

  const resposta = await instance.put(
    "/justificativa/updateJustificativa",
    {
      id,
      fonte,
      diagnostico,
      resolucao,
    },
    {
      headers: {
        authorization: sessionStorage.getItem("Token"),
      },
    }
  );
  const servidor = resposta.data;
  alert(servidor);

  listarJustificativas(fonteAjustado);
}

async function deletarJustificativa(idDeletado, fonteAjustado) {
  const resposta = await instance.delete(
    `/justificativa/deleteJustificativaByQuery?id=${idDeletado}`,
    {
      headers: {
        authorization: sessionStorage.getItem("Token"),
      },
    }
  );
  const servidor = resposta.data;
  alert(servidor);

  listarJustificativas(fonteAjustado);
}

async function criarJustificativa(fonteRecurso) {
  const fonte = fonteRecurso;
  const diagnostico = prompt("Qual o diagnóstico");
  const resolucao = prompt("Qual a resolução?");

  const resposta = await instance.post(
    "/justificativa/addJustificativa",
    {
      fonte,
      diagnostico,
      resolucao,
    },
    {
      headers: {
        authorization: sessionStorage.getItem("Token"),
      },
    }
  );
  const servidor = resposta.data;
  alert(servidor);
  listarJustificativas(fonteRecurso);
}
