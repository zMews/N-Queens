let intervaloAnimacao = null;
let ultimoResultado = null;

const botaoResolver = document.getElementById("btnResolver");
const botaoSkip = document.getElementById("btnSkip");

botaoResolver.addEventListener("click", async function () {
    const n = document.getElementById("valorN").value;
    const info = document.getElementById("info");
    const resultado = document.getElementById("resultado");
    const tabuleiro = document.getElementById("tabuleiro");

    if (intervaloAnimacao) {
        clearInterval(intervaloAnimacao);
    }

    info.innerHTML = "";
    resultado.textContent = "Resolvendo...";
    tabuleiro.innerHTML = "";

    const resposta = await fetch(`/resolver?n=${n}`);
    const data = await resposta.json();
    
    if (!resposta.ok) {
        resultado.textContent = data.erro;
        return;
    }
    
    ultimoResultado = data;
    
    resultado.textContent = JSON.stringify(data, null, 4);
    
    animarHistorico(data);
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