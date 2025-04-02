import sqlite3
from model import Ranking

import os
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # Obtém o caminho do script
DB_PATH = os.path.join(BASE_DIR, "../banco.db")  # Caminho absoluto

class RankingDAO:
    def __init__(self):
        pass

    def getRanking(self):
        conexao = sqlite3.connect(DB_PATH)
        registros = conexao.cursor().execute("select * from ranking order by score desc").fetchall()
        rankings = []
        for r in registros:
            print(r)
            rankings.append(Ranking(r[1],r[2],r[3]).toJSON())
        conexao.close()
        return rankings
    
    def createRanking(self, name, score):
        try:
            conexao = sqlite3.connect(DB_PATH)
            conexao.cursor().execute("insert into ranking(name,score) values(?,?)",(name,score))       
            conexao.commit()
            conexao.close()
            return True
        except:
            return False