#!/usr/bin/python3

import sys
from operations import *

def printAll(tekst):

    print(first_character(tekst))
    print(first_two_characters(tekst))
    print(all_characters_except_first_two(tekst))
    print(penultimate_character(tekst))

    # prawdopodobnie jest blad w przykladzie, poniewaz dla "SP" oraz "S" powinno zwrocic "", poniewaz ciag jest za krótki
    print(last_three_characters(tekst))

    print(all_characters_in_even_positions(tekst))
    print(merge_characters_and_duplicate(tekst))

if __name__ == "__main__":
    tekst=sys.argv[1]
    printAll(tekst)
