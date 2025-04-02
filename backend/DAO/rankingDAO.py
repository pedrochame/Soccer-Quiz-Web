import sqlite3
from model import Ranking

from pathlib import Path
# Define o caminho do arquivo baseado na localização do script
base_dir = Path(__file__).parent.parent  # Pega o diretório do script atual
CAMINHO_BANCO = (base_dir / "banco.db").resolve()

class RankingDAO:
    def __init__(self):
        pass

    def getRanking(self):
        conexao = sqlite3.connect(CAMINHO_BANCO)
        registros = conexao.cursor().execute("select * from ranking order by score desc").fetchall()
        rankings = []
        for r in registros:
            print(r)
            rankings.append(Ranking(r[1],r[2],r[3]).toJSON())
        conexao.close()
        return rankings
    
    def createRanking(self, name, score):
        try:
            conexao = sqlite3.connect(CAMINHO_BANCO)
            conexao.cursor().execute("insert into ranking(name,score) values(?,?)",(name,score))       
            conexao.commit()
            conexao.close()
            return True
        except:
            return False