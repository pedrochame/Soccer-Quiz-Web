import sqlite3
from model import Question

from pathlib import Path
# Define o caminho do arquivo baseado na localização do script
base_dir = Path(__file__).parent.parent  # Pega o diretório do script atual
CAMINHO_BANCO = (base_dir / "banco.db").resolve()

class QuestionDAO:
    def __init__(self):
        pass

    def getQuestions(self):
        conexao = sqlite3.connect(CAMINHO_BANCO)
        registros = conexao.cursor().execute("select * from questions").fetchall()
        questions = []
        for r in registros: 
            questions.append(Question(r[2],r[3],r[4],r[5],r[6]).toJSON())
        conexao.close()
        return questions