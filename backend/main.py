from backend.controllers.nqueen_controller import executar_nqueen


def main():
    n = int(input("Digite o valor de N: "))

    resultado = executar_nqueen(n=n)

    print("Resultado gerado com sucesso!")
    print("N:", resultado["n"])
    print("Melhor solução:", resultado["melhor_solucao"])
    print("Melhor custo:", resultado["melhor_custo"])
    print("Iterações:", resultado["iteracoes"])


if __name__ == "__main__":
    main()