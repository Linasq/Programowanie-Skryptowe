#!/usr/bin/python3

import sys


MOVES={'f':'Zwierzak idzie do przodu', 'b':'Zwierzak idzie do tyłu', 'l':'Zwierzak skręca w lewo', 'r':'Zwierzak skręca w prawo'}


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
        if i in 'fblr':
            tab.append(move_descriptions[i])
    return tab


if __name__ == '__main__':
    print('Start')
    # display(sys.argv, False) # samo wywolanie funckji display
    display(run(sys.argv, MOVES), False) #polaczenie run i display
    print('Stop')
