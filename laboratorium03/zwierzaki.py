#!/usr/bin/python3

import sys
from OptionsParser import OptionsParser


MOVES={0:'Zwierzak idzie do przodu', 1:'Zwierzak idzie do tyłu', 2:'Zwierzak skręca w lewo', 3:'Zwierzak skręca w prawo'}


def display(args, show_index):
    for i,val in enumerate(args):
        if show_index:
            print(f'args[{i}] = {val}')
        else:
            print(val)
    return 0


def run(moves, move_descriptions):
    tab=[]
    for i in moves:
        if i in move_descriptions.keys():
            tab.append(move_descriptions[i])
    return tab


if __name__ == '__main__':
    print('Start')
    moveTabObj = OptionsParser()
    moveTab = moveTabObj.toList(sys.argv)
    # display(sys.argv, False) # samo wywolanie funckji display
    # display(run(sys.argv, MOVES), False) #polaczenie run i display
    display(run(moveTab, MOVES), True)
    print('Stop')
