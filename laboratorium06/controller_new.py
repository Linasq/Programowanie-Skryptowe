import time
from model.core import Vector2d, MoveDirection
from model.animal_new import Animal
from model.interface import IWorldMap

class OptionsParser:
    @staticmethod
    def toList(tab):

        # oczyszczamy tablice z zlych parametrow, a nastepnie zamieniamy to na MoveDirection
        return [MoveDirection.FORWARD if i == 'f' else MoveDirection.BACKWARD if i == 'b' else MoveDirection.RIGHT if i == 'r' else MoveDirection.LEFT for i in filter(lambda x: x in 'fblr', tab)]


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
