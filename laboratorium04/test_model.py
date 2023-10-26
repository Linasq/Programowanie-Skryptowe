"""
Autor: Stanisław Polak
Data utworzenia: 22-10-2023
Data modyfikacji: 22-10-2023
Wersja: 1.0
Opis: Testy jednostkowe enuma "MapDirection".
"""

from model import MapDirection, Vector2d


def test_MapDirection_print(capsys):
    print(MapDirection.NORTH)
    print(MapDirection.EAST)
    print(MapDirection.SOUTH)
    print(MapDirection.WEST)
    captured = capsys.readouterr()
    assert captured.out == "↑\n→\n↓\n←\n"


def test_MapDirection_next():
    assert MapDirection.NORTH.next() == MapDirection.EAST
    assert MapDirection.EAST.next() == MapDirection.SOUTH
    assert MapDirection.SOUTH.next() == MapDirection.WEST
    assert MapDirection.WEST.next() == MapDirection.NORTH


def test_MapDirection_previous():
    assert MapDirection.NORTH.previous() == MapDirection.WEST
    assert MapDirection.WEST.previous() == MapDirection.SOUTH
    assert MapDirection.SOUTH.previous() == MapDirection.EAST
    assert MapDirection.EAST.previous() == MapDirection.NORTH


def test_MapDirection_toUnitVector():
    assert MapDirection.NORTH.toUnitVector() == Vector2d(0, 1)
    assert MapDirection.EAST.toUnitVector() == Vector2d(1, 0)
    assert MapDirection.SOUTH.toUnitVector() == Vector2d(0, -1)
    assert MapDirection.WEST.toUnitVector() == Vector2d(-1, 0)
