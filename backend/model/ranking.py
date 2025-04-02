class Ranking():
    def __init__(self, name, score, date):
        self.name = name
        self.score = score
        self.date = date

    def toJSON(self):
        return {
            "name"  : self.name,
            "score" : self.score,
            "date" : self.date,
        }