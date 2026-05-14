from backend.algorithms.sa import simulated_annealing

from backend.models.nqueen_model import (
    gerar_estado_inicial,
    gerar_vizinho,
    calcular_custo
)


def executar_nqueen(n=8):
    melhor_solucao, melhor_custo, iteracoes = simulated_annealing(
        n=n,
        gerar_estado_inicial=gerar_estado_inicial,
        gerar_vizinho=gerar_vizinho,
        calcular_custo=calcular_custo
    )

    resultado = {
        "n": n,
        "melhor_solucao": melhor_solucao,
        "melhor_custo": melhor_custo,
        "iteracoes": iteracoes
    }

    return resultado