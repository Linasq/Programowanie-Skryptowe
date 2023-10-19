#!/usr/bin/python

class Vector2d:
    __x = 0
    __y = 0

    def __init__(self, x, y):
        self.__x = x
        self.__y = y

    def get_x(self):
        return self.__x

    def get_y(self):
        return self.__y

    def precedes(self, other_Vector2d):
        if isinstance(other_Vector2d, Vector2d):
            if self.__x <= other_Vector2d.__x and self.__y <= other_Vector2d.__y: return True
            else: return False

    def follows(self, other_Vector2d):
        if isinstance(other_Vector2d, Vector2d):
            if self.__x >= other_Vector2d.__x and self.__y >= other_Vector2d.__y: return True
            else: return False

    def add(self, other_Vector2d):
        if isinstance(other_Vector2d, Vector2d):
            newObj = Vector2d(self.__x + other_Vector2d.__x, self.__y + other_Vector2d.__y)
            
            return newObj

    def subtract(self, other_Vector2d):
        if isinstance(other_Vector2d, Vector2d):
            newObj = Vector2d(self.__x - other_Vector2d.__x, self.__y - other_Vector2d.__y)
            
            return newObj

    def upperRight(self, other_Vector2d):
        if isinstance(other_Vector2d, Vector2d):
            max_x = self.__x if self.__x > other_Vector2d.__x else other_Vector2d.__x
            max_y = self.__y if self.__y > other_Vector2d.__y else other_Vector2d.__y

            newObj = Vector2d(max_x, max_y)
            return newObj

    def lowerLeft(self, other_Vector2d):
        if isinstance(other_Vector2d, Vector2d):
            min_x = self.__x if self.__x < other_Vector2d.__x else other_Vector2d.__x
            min_y = self.__y if self.__y < other_Vector2d.__y else other_Vector2d.__y

            newObj = Vector2d(min_x, min_y)
            return newObj

    def opposite(self):
        return Vector2d(self.__x * (-1), self.__y * (-1))

    def __eq__(self, other_Vector2d) -> bool:
        if isinstance(other_Vector2d, Vector2d):
            return self.__x == other_Vector2d.__x and self.__y == other_Vector2d.__y
        return False

    def __str__(self) -> str:
        return f'({self.__x},{self.__y})'
