#!/usr/bin/python

from typing import Self
from enum import Enum

def log(func):
    def wrapper(*args, **kwargs):
        print(f'Nazwa kwalifikowana: {func.__qualname__}')
        args_str = ' '.join(map(str, args))
        print(f'Argumenty: {args_str}')
        return func(*args, **kwargs)
    return wrapper

def log_to(file):
    def log(func):
        def wrapper(*args, **kwargs):
            args_str = ' '.join(map(str, args))
            with open(file, 'a') as f:
                f.writelines(f'{func.__qualname__}\t| {args_str}\n')
            return func(*args, **kwargs)
        return wrapper
    return log

class Vector2d:
    def __init__(self, x, y):
        self.__x = x
        self.__y = y
    
    @property
    @log_to('dziennik')
    def get_x(self):
        return self.__x
    
    @property
    @log
    def get_y(self):
        return self.__y
    
    def precedes(self, other_Vector2d):
        if self.__x <= other_Vector2d.__x and self.__y <= other_Vector2d.__y: return True
        else: return False

    def follows(self, other_Vector2d):
        if self.__x >= other_Vector2d.__x and self.__y >= other_Vector2d.__y: return True
        else: return False

    @log_to(file='dziennik')
    def add(self, other_Vector2d):
        newObj = Vector2d(self.__x + other_Vector2d.__x, self.__y + other_Vector2d.__y)
            
        return newObj

    @log
    def subtract(self, other_Vector2d):
        newObj = Vector2d(self.__x - other_Vector2d.__x, self.__y - other_Vector2d.__y)
            
        return newObj

    def upperRight(self, other_Vector2d):
        max_x = self.__x if self.__x > other_Vector2d.__x else other_Vector2d.__x
        max_y = self.__y if self.__y > other_Vector2d.__y else other_Vector2d.__y

        newObj = Vector2d(max_x, max_y)
        return newObj

    def lowerLeft(self, other_Vector2d):
        min_x = self.__x if self.__x < other_Vector2d.__x else other_Vector2d.__x
        min_y = self.__y if self.__y < other_Vector2d.__y else other_Vector2d.__y

        newObj = Vector2d(min_x, min_y)
        return newObj

    def opposite(self):
        return Vector2d(self.__x * (-1), self.__y * (-1))

    # Polak kazal rozwiazac problem, to tez to zostalo rozwiazane w jak najglupszy sposob, nie kopiujcie tego 1:1
    # pozdrawiam
    def __hash__(self) -> int:
        return self.__x
    
    def __eq__(self, other_Vector2d) -> bool:
        return self.__x == other_Vector2d.__x and self.__y == other_Vector2d.__y

    def __str__(self) -> str:
        return f'({self.__x},{self.__y})'


class MapDirection(Enum):
    NORTH = 0
    EAST = 1
    SOUTH = 2 
    WEST = 3

    def next(self) -> Self:
        if self.value == 0:
            return MapDirection.EAST
        elif self.value == 1:
            return MapDirection.SOUTH
        elif self.value == 2:
            return MapDirection.WEST
        elif self.value == 3:
            return MapDirection.NORTH
        return self

    def previous(self) -> Self:
        if self.value == 2:
            return MapDirection.EAST
        elif self.value == 3:
            return MapDirection.SOUTH
        elif self.value == 0:
            return MapDirection.WEST
        elif self.value == 1:
            return MapDirection.NORTH
        return self

    def toUnitVector(self) -> Vector2d:
        if self.value == 0:
            return Vector2d(0,1)
        elif self.value == 1:
            return Vector2d(1,0)
        elif self.value == 2:
            return Vector2d(0,-1)
        elif self.value == 3:
            return Vector2d(-1,0)
        return Vector2d(0,0)


    def __str__(self) -> str:
        if self.value == 0:
            return '↑'
        elif self.value == 1:
            return '→'
        elif self.value == 2:
            return '↓'
        elif self.value == 3:
            return '←'
        return self.value


class MoveDirection(Enum):
    FORWARD = 'f'
    BACKWARD = 'b'
    LEFT = 'l'
    RIGHT = 'r'
