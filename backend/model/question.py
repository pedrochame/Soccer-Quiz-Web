class Question():
    def __init__(self, question, ans, alt1, alt2, alt3):
        self.question = question
        self.ans = ans
        self.alt1 = alt1
        self.alt2 = alt2
        self.alt3 = alt3
    
    def toJSON(self):
        return {
            "question" : self.question,
            "ans"      : self.ans,
            "alt1"     : self.alt1,
            "alt2"     : self.alt2,
            "alt3"     : self.alt3
        }