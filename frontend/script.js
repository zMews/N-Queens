const botao = document.getElementById("btnResolver");

botao.addEventListener("click", async function () {
    const n = document.getElementById("valorN").value;
    const resultado = document.getElementById("resultado");

    resultado.textContent = "Resolvendo...";

    const resposta = await fetch(`/resolver?n=${n}`);
    const data = await resposta.json();

    resultado.textContent = JSON.stringify(data, null, 4);
});