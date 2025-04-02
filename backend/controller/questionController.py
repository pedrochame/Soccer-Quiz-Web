from DAO import QuestionDAO

class QuestionController():
    def __init__(self):
        self.repo = QuestionDAO()

    def getQuestions(self):
        return self.repo.getQuestions()