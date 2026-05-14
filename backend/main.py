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
    n = int(request.args.get("n", 8))
    resultado = executar_nqueen(n=n)
    return jsonify(resultado)


if __name__ == "__main__":
    app.run(debug=True)