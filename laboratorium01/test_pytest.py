#!/usr/bin/python3

import skrypt01



MOVES={'f':'Zwierzak idzie do przodu', 'b':'Zwierzak idzie do tyłu', 'l':'Zwierzak skręca w lewo', 'r':'Zwierzak skręca w prawo'}


def test_display_works():
    assert skrypt01.display('1', False) == 0

def test_run_list_only_moves():
    assert skrypt01.run(['f', 'b', 'l', 'r', 'cos', 'q', '@', 'k'], MOVES) == [MOVES['f'], MOVES['b'], MOVES['l'], MOVES['r']] 


