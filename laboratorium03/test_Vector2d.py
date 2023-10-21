#!/usr/bin/python

from Vector2d import Vector2d

OBJECT = Vector2d(2,1)
OBJECT2 = Vector2d(-1, 3)
OBJECT3 = Vector2d(10,10)

def test_getters():
    assert OBJECT.get_x == 2
    assert OBJECT.get_y == 1
    assert OBJECT2.get_x == -1
    assert OBJECT2.get_y == 3

def test_precedes():
    assert OBJECT.precedes(OBJECT2) == False
    assert OBJECT2.precedes(OBJECT3) == True

def test_follows():
    assert OBJECT.follows(OBJECT2) == False
    assert OBJECT3.follows(OBJECT) == True

def test_add():
    testOBJ =  OBJECT.add(OBJECT3)
    objASSERT = Vector2d(12,11)
    assert testOBJ.__eq__(objASSERT)

def test_sub():
    testOBJ = OBJECT3.subtract(OBJECT2)
    objASSERT = Vector2d(11,7)
    assert testOBJ.__eq__(objASSERT)

def test_upperRight():
    testOBJ = OBJECT2.upperRight(OBJECT)
    objASSERT = Vector2d(2,3)
    assert testOBJ.__eq__(objASSERT)

def test_lowerLeft():
    testOBJ = OBJECT.lowerLeft(OBJECT2)
    objASSERT = Vector2d(-1,1)
    assert testOBJ.__eq__(objASSERT)

def test_opposite():
    testOBJ = OBJECT2.opposite()
    objASSERT = Vector2d(1,-3)
    assert testOBJ.__eq__(objASSERT)
