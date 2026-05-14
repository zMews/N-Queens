import json
import os

from backend.algorithms.simulated_annealing import simulated_annealing
from backend.models.nqueen_model import (
    gerar_estado_inicial,
    gerar_vizinho,
    calcular_custo
)


def executar_nqueen(n):
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

    caminho_base = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
    caminho_json = os.path.join(caminho_base, "frontend", "result.json")

    with open(caminho_json, "w", encoding="utf-8") as arquivo:
        json.dump(resultado, arquivo, indent=4, ensure_ascii=False)

    return resultado