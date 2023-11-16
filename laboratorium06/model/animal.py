from core import MoveDirection, Vector2d, MapDirection

class Animal:
    def __init__(self, position: Vector2d, orientation = MapDirection.NORTH) -> None:
        self.position = position
        self.orientation = orientation

    def __str__(self) -> str:
        return f'{self.position} {self.orientation}'

    def __repr__(self) -> str:
        return str(self)

    def isAt(self, position: Vector2d) -> bool:
        if self.position.get_x == position.get_x and self.position.get_y == position.get_y: return True
        else: return False

    def move(self, direction: MoveDirection) -> None:
        if direction.name == MoveDirection.RIGHT.name:
            self.orientation = self.orientation.next()
        
        elif direction.name == MoveDirection.LEFT.name:
            self.orientation = self.orientation.previous()
        
        if direction.name == MoveDirection.FORWARD.name or direction.name == MoveDirection.BACKWARD.name:
            if direction.name == MoveDirection.FORWARD.name:
                target: Vector2d = self.position.add(self.orientation.toUnitVector())
            else:
                target = self.position.subtract(self.orientation.toUnitVector())

            if target.precedes(Vector2d(4,4)) and target.follows(Vector2d(0,0)):
                self.position = target
