#!/usr/bin/python3

# return first character
def first_character(tekst):
    return tekst[0]

# return first 2 chars
def first_two_characters(tekst):
    return tekst[:2] if len(tekst) >= 2 else ""

# return all chars except first two
def all_characters_except_first_two(tekst):
    return tekst[2:] if len(tekst) >= 2 else ""

# return second from the back char
def penultimate_character(tekst):
    return tekst[-2] if len(tekst) >= 2 else ""

# return last 3 chars
def last_three_characters(tekst):
    return tekst[-3:] if len(tekst) >= 3 else ""

# return chars in even position
def all_characters_in_even_positions(tekst):
    return tekst[::2]

# return first + second from the back times len of tekst
def merge_characters_and_duplicate(tekst):
    return f"{first_character(tekst)}{penultimate_character(tekst)}"*len(tekst) if len(tekst) >= 2 else ""
