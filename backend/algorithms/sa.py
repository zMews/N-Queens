import math
import random

def simulated_annealing(
    n,
    gerar_estado_inicial,
    gerar_vizinho,
    calcular_custo,
    temperatura_inicial=1000,
    alpha=0.99,
    temperatura_min=0.01,
    iteracao_max=100
):
    estado_atual = gerar_estado_inicial(n)
    custo_atual = calcular_custo(estado_atual)

    melhor_solucao = estado_atual.copy()
    melhor_custo = custo_atual

    temperatura = temperatura_inicial
    iteracoes = 0

    while temperatura > temperatura_min and custo_atual > 0:
        for _ in range(iteracao_max):
            estado_vizinho = gerar_vizinho(estado_atual)
            custo_vizinho = calcular_custo(estado_vizinho)

            delta_e = custo_vizinho - custo_atual

            if delta_e < 0:
                estado_atual = estado_vizinho
                custo_atual = custo_vizinho
            else:
                probabilidade = math.exp(-delta_e / temperatura)
                r = random.random()

                if r < probabilidade:
                    estado_atual = estado_vizinho
                    custo_atual = custo_vizinho

            if custo_atual < melhor_custo:
                melhor_solucao = estado_atual.copy()
                melhor_custo = custo_atual

            iteracoes += 1

        temperatura *= alpha

    return melhor_solucao, melhor_custo, iteracoes