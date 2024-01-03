const instance = axios.create({
  baseURL: "http://localhost:3000/dinheiro",
});

if (localStorage.getItem("Token") === null) {
  window.location.assign("http://127.0.0.1:5500/");
}

