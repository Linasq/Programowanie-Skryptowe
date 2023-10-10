#!/usr/bin/python3

import skrypt01


def test_display_works():
    assert skrypt01.display('1', False) == 0

def test_run_list_only_moves():
    assert skrypt01.run(['f', 'b', 'l', 'r', 'cos', 'q', '@', 'k'],skrypt01.MOVES) == [skrypt01.MOVES['f'], skrypt01.MOVES['b'], skrypt01.MOVES['l'], skrypt01.MOVES['r']] 


