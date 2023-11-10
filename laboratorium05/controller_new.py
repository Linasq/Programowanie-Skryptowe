import time
from model.core import Vector2d, MoveDirection
from model.animal_new import Animal
from model.interface import IWorldMap

class OptionsParser:
    @staticmethod
    def toList(tab):
        returnTab = []
        for i in tab:
            if i == 'f':
                returnTab.append(MoveDirection.FORWARD)
            elif i == 'b':
                returnTab.append(MoveDirection.BACKWARD)
            elif i == 'l':
                returnTab.append(MoveDirection.LEFT)
            elif i == 'r':
                returnTab.append(MoveDirection.RIGHT)
        return returnTab


class Simulation:
    def __init__(self, directions: list[MoveDirection], positions: list[Vector2d], iwmap: IWorldMap) -> None:
        self.directions = directions
        self.positions = positions
        self.animals: list[Animal] = []
        self.iwmap = iwmap

        for vector in self.positions:
            if self.iwmap.place(Animal(vector)):
                self.animals.append(Animal(vector))

    def run(self) -> None:
        for i in range(len(self.directions)):
            print(self.iwmap)
            time.sleep(1)
            
            n = i % len(self.animals)
            self.iwmap.move(self.animals[n],self.directions[i])
