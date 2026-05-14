from algorithms.sa import simulated_annealing
from functions.nqueen import (
    gerar_estado_inicial,
    gerar_vizinho,
    calcular_custo
)


def main():
    n = 8

    melhor_solucao, melhor_custo, iteracoes = simulated_annealing(
        n=n,
        gerar_estado_inicial=gerar_estado_inicial,
        gerar_vizinho=gerar_vizinho,
        calcular_custo=calcular_custo
    )

    print("Melhor solução:", melhor_solucao)
    print("Melhor custo:", melhor_custo)
    print("Iterações:", iteracoes)


if __name__ == "__main__":
    main()