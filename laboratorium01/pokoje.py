#!/usr/bin/python3

import sys
import json


def printRooms():
    print('''
-------------+--------+ 
Numer pokoju | Goście |
-------------+--------+''')

    for k,v in ROOMS.items():
        print(k, end='')
        for i in v:
            if '1' not in i:
                print(' '*13, i)
            else:
                print(' '*12, i)
        print()


def clearJSON():
    with open("rooms.json", 'w') as f:
        json.dump({"1":["1. "], "2":["1. ", "2. ", "3. "], "3":["1. ", "2. "]}, f)


if __name__ == '__main__':

    TAB = sys.argv


    with open('rooms.json', 'r') as f:
        ROOMS = json.load(f)
    
    i=1

    while i < len(TAB):
        if TAB[i] == '--stan_pokoi':
            printRooms()
            i+=1

        else:
            name = TAB[i]
            nr = int(TAB[i+1])

            if 1 <= nr <= 3:
                for ind in range(len(ROOMS[str(nr)])):

                    # tu zmienic, jesli zmieni sie dlugosc stringa
                    if len(ROOMS[str(nr)][ind]) == 3:
                        ROOMS[str(nr)][ind] += name
                        break
                    
            i+=2

    with open('rooms.json', 'w') as f:
        json.dump(ROOMS, f)
