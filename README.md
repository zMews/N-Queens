# N-Rainhas com Simulated Annealing

Projeto desenvolvido utilizando o algoritmo Simulated Annealing para resolver o Problema das N-Rainhas.

## Objetivo

O objetivo do problema é posicionar N rainhas em um tabuleiro NxN sem que nenhuma rainha ataque outra na mesma linha, coluna ou diagonal.

## Tecnologias utilizadas

- Python
- Flask
- JavaScript
- HTML
- CSS

## Estrutura do projeto

```text
backend/
  algorithms/
    sa.py
  controllers/
    nqueen_controller.py
  models/
    nqueen_model.py
  main.py

frontend/
  index.html
  script.js
  style.css
```

#Como executar

Instale as dependências:
```
pip install flask flask-cors
```
Execute:
```
python -m backend.main
```
e abra o navegador em:
```
http://127.0.0.1:5000/
```
