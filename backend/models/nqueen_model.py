import random


def gerar_estado_inicial(n):
    estado = []

    for _ in range(n):
        linha = random.randint(0, n - 1)
        estado.append(linha)

    return estado


def calcular_custo(estado):
    conflitos = 0
    n = len(estado)

    for coluna_atual in range(n):
        for outra_coluna in range(coluna_atual + 1, n):
            mesma_linha = estado[coluna_atual] == estado[outra_coluna]

            mesma_diagonal = abs(
                estado[coluna_atual] - estado[outra_coluna]
            ) == abs(coluna_atual - outra_coluna)

            if mesma_linha or mesma_diagonal:
                conflitos += 1

    return conflitos


def gerar_vizinho(estado):
    vizinho = estado.copy()
    n = len(vizinho)

    coluna = random.randint(0, n - 1)
    nova_linha = random.randint(0, n - 1)

    while nova_linha == vizinho[coluna]:
        nova_linha = random.randint(0, n - 1)

    vizinho[coluna] = nova_linha

    return vizinho