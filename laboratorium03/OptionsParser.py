from MoveDirection import MoveDirection 

class OptionsParser():
    @staticmethod
    def toList(tab):
        returnTab = []
        for i in tab:
            if i == 'f':
                returnTab.append(MoveDirection['FORWARD'].value)
            elif i == 'b':
                returnTab.append(MoveDirection['BACKWARD'].value)
            elif i == 'l':
                returnTab.append(MoveDirection['LEFT'].value)
            elif i == 'r':
                returnTab.append(MoveDirection['RIGHT'].value)
        return returnTab
