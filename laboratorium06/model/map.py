from interface import IMoveValidator, IWorldMap
from model.animal_new import Animal
from model.core import Vector2d, MoveDirection
from view import MapVisualizer

class PositionAlreadyOccupiedError(Exception):
    def __init__(self, vector: Vector2d) -> None:
        self.vector = vector

    def __str__(self) -> str:
        return f'Position {self.vector} is already occupied'


class WorldMap(IMoveValidator, IWorldMap):
    def __init__(self) -> None:
        self.animal: dict[Vector2d, Animal] = {}

    def canMoveTo(self, position: Vector2d) -> bool:
        if self.isOccupied(position): return False
        return True

    def place(self, animal: Animal) -> bool | None:
        try:
            if self.canMoveTo(animal.position):
                self.animal[animal.position] = animal
                return True
            raise PositionAlreadyOccupiedError(animal.position)
        except PositionAlreadyOccupiedError as e:
            print(e)

    def move(self, animal: Animal, direction: MoveDirection) -> None:
        if animal.position in self.animal.keys():
            last_pos = animal.position
            animal.move(direction, self)
            self.animal.pop(last_pos)
            self.animal[animal.position] = animal

    def isOccupied(self, position: Vector2d) -> bool:
        if position in self.animal.keys(): return True
        return False

    def objectAt(self, position: Vector2d) -> Animal | None:
        if position in self.animal.keys():
            return self.animal[position]

    

class RectangularMap(WorldMap):
    def __init__(self, x: int, y: int) -> None:
        self.animal: dict[Vector2d, Animal] = {}
        self.x = x
        self.y = y

    def canMoveTo(self, position: Vector2d) -> bool:
        if position.follows(Vector2d(0,0)) and position.precedes(Vector2d(self.x, self.y)): 
            if self.isOccupied(position): return False
            return True

        return False
    
    def __str__(self) -> str:
        obj = MapVisualizer(self)
        return obj.draw(Vector2d(0,0), Vector2d(self.x, self.y))
    

class InfiniteMap(WorldMap):
    def __str__(self) -> str:
        obj = MapVisualizer(self)
        upperRight = Vector2d(-100, -100)
        lowerLeft = Vector2d(100, 100)
        for animal in self.animal.values():
            upperRight = upperRight.upperRight(animal.position)
            lowerLeft = lowerLeft.lowerLeft(animal.position)
        return obj.draw(lowerLeft, upperRight)

