"""
Autor: Stanisław Polak
Data utworzenia: 22-10-2023
Data modyfikacji: 22-10-2023
Wersja: 1.0
Opis: Testy jednostkowe klasy "Simulation".
"""

import pytest
from model.core import Vector2d, MoveDirection
from controller import Simulation, OptionsParser


@pytest.fixture
def simulation_for_two_animals():
    args = "f b r l f f r r f f f f f f f f".split(" ")
    directions: list[MoveDirection] = OptionsParser.toList(args)
    positions: list[Vector2d] = [Vector2d(2, 2), Vector2d(3, 4)]
    yield Simulation(directions, positions)


@pytest.fixture
def simulation_for_three_animals():
    args = "f b r l f f r r f f f f f f f".split(" ")
    directions: list[MoveDirection] = OptionsParser.toList(args)
    positions: list[Vector2d] = [Vector2d(2, 2), Vector2d(3, 4), Vector2d(0, 4)]
    yield Simulation(directions, positions)


def test_Simulation_run_for_two_animals(simulation_for_two_animals: Simulation):
    simulation_for_two_animals.run()
    assert str(simulation_for_two_animals.animals) == "[(3,0) ↓, (2,4) ↑]"


def test_Simulation_run_for_three_animals(simulation_for_three_animals: Simulation):
    simulation_for_three_animals.run()
    assert str(simulation_for_three_animals.animals) == "[(2,4) ↑, (4,4) →, (4,4) →]"
