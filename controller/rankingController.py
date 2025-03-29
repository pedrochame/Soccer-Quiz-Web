from DAO import RankingDAO

class RankingController():
    def __init__(self):
        self.repo = RankingDAO()

    def getRanking(self):
        return self.repo.getRanking(),200
    
    def createRanking(self, dados):

        mensagem,status = "",0

        if set(dados.keys()) != set(["name","score"]): 
            mensagem,status = "Os campos devem ser Name e Score.",400
        else:
            name,score = dados["name"],dados["score"]
            if name == "":
                mensagem,status = "Name deve ser preenchido.",400
            else:
                if self.repo.createRanking(name,score):
                    mensagem,status = "Registro criado com sucesso", 201
                else:
                    mensagem,status = "Erro ao criar registro", 500
                    
        return {"Mensagem": mensagem},status