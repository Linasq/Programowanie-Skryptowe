from model.core import Vector2d, MoveDirection
from model.animal import Animal


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
    def __init__(self, directions: list[MoveDirection], positions: list[Vector2d]) -> None:
        self.directions = directions
        self.positions = positions
        self.animals: list[Animal] = []

        for vector in self.positions:
            self.animals.append(Animal(vector))

    def run(self) -> None:
        for i in range(len(self.directions)):
            n = i % len(self.animals)
            self.animals[n].move(self.directions[i])
            print(f'Zwierze {n}: {self.animals[n].position} {self.animals[n].orientation}')
