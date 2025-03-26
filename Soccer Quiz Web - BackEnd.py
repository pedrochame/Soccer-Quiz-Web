from flask import Flask
from controller import QuestionController
from flask_cors import CORS

questionController = QuestionController()

app = Flask(__name__)
CORS(app)  # Isso libera a API para qualquer origem

# Rota que retorna todas as questões do banco
@app.route("/questions",methods=["GET"])
def questions():
    return questionController.getQuestions()
    
# O código será executado se o script for rodado diretamente, e não se for importado como módulo
if __name__ == "__main__": app.run()