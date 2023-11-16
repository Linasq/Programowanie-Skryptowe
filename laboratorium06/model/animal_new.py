from core import MoveDirection, Vector2d, MapDirection
from interface import IMoveValidator

class Animal:
    def __init__(self, position: Vector2d, orientation = MapDirection.NORTH) -> None:
        self.position = position
        self.orientation = orientation

    def __str__(self) -> str:
        return f'{self.orientation}'

    def __repr__(self) -> str:
        return str(self)

    def isAt(self, position: Vector2d) -> bool:
        if self.position.get_x == position.get_x and self.position.get_y == position.get_y: return True
        else: return False

    def move(self, direction: MoveDirection, validator: IMoveValidator) -> None:
        # slownik zawierajacy kierunki jako klucze i akcje jako wartosci
        direction_actions = {
                MoveDirection.RIGHT.name: lambda: self.orientation.next(),
                MoveDirection.LEFT.name: lambda: self.orientation.previous(),
                MoveDirection.FORWARD.name: lambda: self.position.add(self.orientation.toUnitVector()),
                MoveDirection.BACKWARD.name: lambda: self.position.subtract(self.orientation.toUnitVector())
        }

        # dostajemy odpowiednia akcje
        action = direction_actions.get(direction.name)

        if action:
            # odpalamy dana funkcje
            target = action()

            # jesli idziemy do przodu lub do tylu
            if direction.name in [MoveDirection.BACKWARD.name, MoveDirection.FORWARD.name]:
                if validator.canMoveTo(target):
                    self.position = target

            # jesli sie obracamy
            else:
                self.orientation = target
