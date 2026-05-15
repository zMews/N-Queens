from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
import os

from backend.controllers.nqueen_controller import executar_nqueen


BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FRONTEND_DIR = os.path.join(BASE_DIR, "frontend")

app = Flask(__name__, static_folder=FRONTEND_DIR, static_url_path="")
CORS(app)


@app.route("/")
def home():
    return send_from_directory(FRONTEND_DIR, "index.html")


@app.route("/resolver", methods=["GET"])
def resolver():
    try:
        n = int(request.args.get("n", 8))
        temperatura_inicial = float(request.args.get("temperatura_inicial", 1000))
        alpha = float(request.args.get("alpha", 0.99))
        temperatura_min = float(request.args.get("temperatura_min", 0.01))
        iteracao_max = int(request.args.get("iteracao_max", 100))
    except ValueError:
        return jsonify({"erro": "Parâmetros inválidos."}), 400

    if n < 4:
        return jsonify({"erro": "N deve ser maior ou igual a 4."}), 400

    if alpha <= 0 or alpha >= 1:
        return jsonify({"erro": "Alpha deve estar entre 0 e 1."}), 400

    if temperatura_inicial <= 0:
        return jsonify({"erro": "Temperatura inicial deve ser maior que 0."}), 400

    if temperatura_min <= 0:
        return jsonify({"erro": "Temperatura mínima deve ser maior que 0."}), 400

    if iteracao_max <= 0:
        return jsonify({"erro": "Iterações máximas deve ser maior que 0."}), 400

    resultado = executar_nqueen(
        n=n,
        temperatura_inicial=temperatura_inicial,
        alpha=alpha,
        temperatura_min=temperatura_min,
        iteracao_max=iteracao_max
    )

    return jsonify(resultado)


if __name__ == "__main__":
    app.run(debug=True)