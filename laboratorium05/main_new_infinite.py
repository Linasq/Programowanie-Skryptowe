#!/usr/bin/env python3

import sys
from model.core import Vector2d, MoveDirection
from controller_new import Simulation, OptionsParser
from model.map import InfiniteMap   

directions: list[MoveDirection] = OptionsParser.toList(sys.argv[1:])
positions: list[Vector2d] = [Vector2d(2, 2), Vector2d(3, 4)]
# Poprzednio
# simulation: Simulation = Simulation(directions, positions)
# Obecnie
simulation: Simulation = Simulation(directions, positions, InfiniteMap())
simulation.run()
