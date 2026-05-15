import time

from backend.algorithms.sa import simulated_annealing

from backend.models.nqueen_model import (
    gerar_estado_inicial,
    gerar_vizinho,
    calcular_custo
)


def executar_nqueen(
    n=8,
    temperatura_inicial=1000,
    alpha=0.99,
    temperatura_min=0.01,
    iteracao_max=100
):
    inicio = time.time()

    melhor_solucao, melhor_custo, iteracoes, historico, alpha, temperatura_final = simulated_annealing(
        n=n,
        gerar_estado_inicial=gerar_estado_inicial,
        gerar_vizinho=gerar_vizinho,
        calcular_custo=calcular_custo,
        temperatura_inicial=temperatura_inicial,
        alpha=alpha,
        temperatura_min=temperatura_min,
        iteracao_max=iteracao_max
    )

    fim = time.time()
    tempo_execucao = fim - inicio

    resultado = {
        "n": n,
        "temperatura_inicial": temperatura_inicial,
        "alpha": alpha,
        "temperatura_min": temperatura_min,
        "iteracao_max": iteracao_max,
        "melhor_solucao": melhor_solucao,
        "melhor_custo": melhor_custo,
        "iteracoes": iteracoes,
        "tempo_execucao": round(tempo_execucao, 4),
        "temperatura_final": round(temperatura_final, 4),
        "historico": historico
    }

    return resultado