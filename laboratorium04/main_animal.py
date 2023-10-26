#!/usr/bin/python

from model import Animal, Vector2d, MapDirection

zwierze = Animal(Vector2d(2,2))

print(zwierze)
print(zwierze.isAt(Vector2d(2,2)))
