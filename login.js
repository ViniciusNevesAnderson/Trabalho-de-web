const users = {
    adm: "adm123",
    funcionario: "func123"
};

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const senha = document.getElementById("senha").value;

    if (users[usuario] === senha) {
        if (usuario === "adm" && senha === "adm123") {
            sessionStorage.setItem("role", "adm");
            window.location.href = "tarifa.html";
        } else if (usuario === "funcionario" && senha === "func123") {
            sessionStorage.setItem("role", "funcionario");
            window.location.href = "tarifa.html";
        }
    } else {
        alert("Erro, usuário ou senha incorretos!");
    }
});
