let intervaloAnimacao = null;
let ultimoResultado = null;

const botaoResolver = document.getElementById("btnResolver");
const botaoSkip = document.getElementById("btnSkip");
const botaoReset = document.getElementById("btnReset");

botaoResolver.addEventListener("click", async function () {
    const n = document.getElementById("valorN").value;
    const info = document.getElementById("info");
    const resultado = document.getElementById("resultado");
    const tabuleiro = document.getElementById("tabuleiro");

    if (intervaloAnimacao) {
        clearInterval(intervaloAnimacao);
    }

    botaoResolver.disabled = true;
    botaoResolver.textContent = "Resolvendo...";

    info.innerHTML = "";
    resultado.textContent = "Resolvendo...";
    tabuleiro.innerHTML = "";

    try {
        const resposta = await fetch(`/resolver?n=${n}`);
        const data = await resposta.json();

        if (!resposta.ok) {
            resultado.textContent = data.erro;
            return;
        }

        ultimoResultado = data;

        resultado.textContent = formatarResultado(data);

        animarHistorico(data);
    } finally {
        botaoResolver.disabled = false;
        botaoResolver.textContent = "Resolver";
    }
});

botaoSkip.addEventListener("click", function () {
    if (!ultimoResultado) {
        return;
    }

    if (intervaloAnimacao) {
        clearInterval(intervaloAnimacao);
    }

    mostrarInfoFinal(ultimoResultado);
    montarTabuleiro(
        ultimoResultado.n,
        ultimoResultado.melhor_solucao
    );
});

botaoReset.addEventListener("click", function () {
    if (intervaloAnimacao) {
        clearInterval(intervaloAnimacao);
    }

    ultimoResultado = null;

    document.getElementById("valorN").value = 8;
    document.getElementById("info").innerHTML = "";
    document.getElementById("tabuleiro").innerHTML = "";
    document.getElementById("resultado").textContent = "";
});

function animarHistorico(data) {
    const historico = data.historico;

    if (!historico || historico.length === 0) {
        mostrarInfoFinal(data);
        montarTabuleiro(data.n, data.melhor_solucao);
        return;
    }

    let indice = 0;

    intervaloAnimacao = setInterval(function () {
        const passo = historico[indice];

        mostrarInfoPasso(data.n, passo);
        montarTabuleiro(data.n, passo.estado);

        indice++;

        if (indice >= historico.length) {
            clearInterval(intervaloAnimacao);
            mostrarInfoFinal(data);
            montarTabuleiro(data.n, data.melhor_solucao);
        }
    }, 150);
}


function mostrarInfoPasso(n, passo) {
    const info = document.getElementById("info");

    info.innerHTML = `
        <p><strong>N:</strong> ${n}</p>
        <p><strong>Iteração:</strong> ${passo.iteracao}</p>
        <p><strong>Custo atual:</strong> ${passo.custo}</p>
        <p><strong>Temperatura:</strong> ${passo.temperatura}</p>
    `;
}


function mostrarInfoFinal(data) {
    const info = document.getElementById("info");

    info.innerHTML = `
        <p><strong>N:</strong> ${data.n}</p>
        <p><strong>Melhor custo:</strong> ${data.melhor_custo}</p>
        <p><strong>Total de iterações:</strong> ${data.iteracoes}</p>
        <p><strong>Tempo de execução:</strong> ${data.tempo_execucao}s</p>
        <p><strong>Melhor solução:</strong> [${data.melhor_solucao.join(", ")}]</p>
    `;
}


function montarTabuleiro(n, solucao) {
    const tabuleiro = document.getElementById("tabuleiro");
    tabuleiro.innerHTML = "";

    const tamanhoCasa = n <= 16 ? 45 : 25;
    const conflitos = obterColunasComConflito(solucao);

    tabuleiro.style.gridTemplateColumns = `repeat(${n}, ${tamanhoCasa}px)`;

    for (let linha = 0; linha < n; linha++) {
        for (let coluna = 0; coluna < n; coluna++) {
            const casa = document.createElement("div");
            casa.classList.add("casa");

            casa.style.width = `${tamanhoCasa}px`;
            casa.style.height = `${tamanhoCasa}px`;
            casa.style.fontSize = `${tamanhoCasa * 0.7}px`;

            if ((linha + coluna) % 2 === 0) {
                casa.classList.add("clara");
            } else {
                casa.classList.add("escura");
            }

            if (solucao[coluna] === linha) {
                casa.textContent = "♛";
                casa.classList.add("rainha");

                if (conflitos.has(coluna)) {
                    casa.classList.add("conflito");
                }
            }

            tabuleiro.appendChild(casa);
        }
    }
}


function obterColunasComConflito(solucao) {
    const conflitos = new Set();
    const n = solucao.length;

    for (let colunaAtual = 0; colunaAtual < n; colunaAtual++) {
        for (let outraColuna = colunaAtual + 1; outraColuna < n; outraColuna++) {
            const mesmaLinha = solucao[colunaAtual] === solucao[outraColuna];

            const mesmaDiagonal =
                Math.abs(solucao[colunaAtual] - solucao[outraColuna]) ===
                Math.abs(colunaAtual - outraColuna);

            if (mesmaLinha || mesmaDiagonal) {
                conflitos.add(colunaAtual);
                conflitos.add(outraColuna);
            }
        }
    }

    return conflitos;
}

function formatarResultado(data) {
    let texto = "";

    texto += `N: ${data.n}\n`;
    texto += `Melhor custo: ${data.melhor_custo}\n`;
    texto += `Iterações: ${data.iteracoes}\n`;
    texto += `Tempo de execução: ${data.tempo_execucao}s\n`;
    texto += `Melhor solução: [${data.melhor_solucao.join(", ")}]\n\n`;

    texto += "<------------------------------------------->\n";
    texto += "Histórico:\n";
    texto += "<------------------------------------------->\n\n";

    data.historico.forEach(function (passo) {
        texto += `Estado: [${passo.estado.join(", ")}]\n`;
        texto += `Iteração: ${passo.iteracao}\n`;
        texto += `Custo: ${passo.custo}\n`;
        texto += `Temp: ${passo.temperatura}\n`;
        texto += "<------------------------------------------->\n";
        texto += "<------------------------------------------->\n";
    });

    return texto;
}