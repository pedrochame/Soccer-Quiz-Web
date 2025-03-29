from flask import Flask, request,jsonify
from controller import QuestionController, RankingController
from flask_cors import CORS

questionController = QuestionController()
rankingController = RankingController()

app = Flask(__name__)
CORS(app)  # Isso libera a API para qualquer origem

# Rota que retorna todas as questões do banco
@app.route("/questoes",methods=["GET"])
def questions():
    return questionController.getQuestions()

# Rota que retorna todos os registros do banco
@app.route("/registros",methods=["GET"])
def ranking():
    resposta,status = rankingController.getRanking()
    return jsonify(resposta),status

# Rota que cria um registro de jogo
@app.route("/registros",methods=["POST"])
def createRanking():
    resposta,status = rankingController.createRanking(request.json)
    return jsonify(resposta),status
    
# O código será executado se o script for rodado diretamente, e não se for importado como módulo
if __name__ == "__main__": app.run(debug="True")