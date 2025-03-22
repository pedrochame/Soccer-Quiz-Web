from flask import Flask
from controller import QuestionController

questionController = QuestionController()

app = Flask("API Soccer Quiz Web")

# Rota que retorna todas as questões do banco
@app.route("/questions")
def questions():
    response = questionController.getQuestions()
    codResponse = 200
    if response == None: codResponse = 400
    return response,codResponse

# O código será executado se o script for rodado diretamente, e não se for importado como módulo
if __name__ == "__main__": app.run()