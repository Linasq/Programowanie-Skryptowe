#!/usr/bin/python

import sys
from model import Vector2d, MoveDirection
from controller import Simulation, OptionsParser

directions: list[MoveDirection] = OptionsParser.toList(sys.argv[1:]) 
positions: list[Vector2d] = [Vector2d(2,2), Vector2d(3,4)] # Pozycje początkowe dla zwierząt, odpowiednio, (2,2) oraz (3,4) 
simulation: Simulation = Simulation(directions, positions)
simulation.run()     
