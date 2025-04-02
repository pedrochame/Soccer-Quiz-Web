import sqlite3
from model import Question

import os
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Obtém o caminho do script
DB_PATH = os.path.join(BASE_DIR, "../banco.db")  # Caminho absoluto

class QuestionDAO:
    def __init__(self):
        pass

    def getQuestions(self):
        conexao = sqlite3.connect(DB_PATH)
        registros = conexao.cursor().execute("select * from questions").fetchall()
        questions = []
        for r in registros: 
            questions.append(Question(r[2],r[3],r[4],r[5],r[6]).toJSON())
        conexao.close()
        return questions