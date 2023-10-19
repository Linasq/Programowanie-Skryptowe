#!/usr/bin/python

from OptionsParser import OptionsParser

OBJECT = OptionsParser()

def test_emptyTab():
    assert OBJECT.toList([]) == []

def test_cleanInput():
    assert OBJECT.toList(['f', 'b', 'l', 'r']) == [0,1,2,3]

def test_functionality():
    assert OBJECT.toList(['f', 'a', '!', ' ', 'b']) == [0,1]
