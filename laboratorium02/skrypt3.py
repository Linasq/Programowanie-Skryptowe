#!/usr/bin/python3

import cut, grep, operations
import argparse, textwrap

def wrongUsageMessage():
    print('Wrong usage, see help')
    exit()

parser = argparse.ArgumentParser(prog='skrypt3', formatter_class=argparse.RawDescriptionHelpFormatter, description=textwrap.dedent('''\
        This script can run different functions. Those are provided below:
        +------------------+--------------------+--------------------------------------+
        |     FUNCTION     | ------------------ |                HELP                  |
        +------------------+--------------------+--------------------------------------+
            cut                                 remove section from each line of files
            grep                                print lines that match patterns

            all                                 print result of all of the functions below

            first_character                     return first character of a word
            first_two_characters                return first two characters
            all_characters_except_first_two     return all chars except first two
            penultimate_character               return character second from the back
            last_three_characters               return last three characters
            all_characters_in_even_positions    return chars in even position
            merge_characters_and_duplicate      return first+penultimate * len of input
            '''))

parser.add_argument('function', help='Choose what functions will be executed.', nargs='+')
parser.add_argument('-i', '--ignore', required=False, help='ignore case distinctions in patterns and input data, used with grep', action='store_true')
parser.add_argument('-w', '--word', required=False, help='select only those lines containing matches that form whole word, used with grep', action='store_true')
parser.add_argument('-d', '--delimiter', required=False, help='specify delimiter instead of TAB, used with cut')
parser.add_argument('-f', '--fields', required=False, help='select only these fields, used with cut', action='extend')

args=parser.parse_args()

if args.function[0] == 'cut':
    if args.ignore or args.word or len(args.function) >= 2:
        print("Bad optional argument, see help")
        wrongUsageMessage()

    tab = cut.cut(args.delimiter, args.fields)
    for i in tab:
        print(i)

elif args.function[0] == 'grep':
    if args.delimiter or args.fields:
        print("Bad optional argument, see help")
        wrongUsageMessage()

    tab = grep.grep(args.function[1], args.ignore, args.word)
    for i in tab:
        print(i)

elif args.function[0] == 'first_character':
    if args.ignore or args.word or args.delimiter or args.fields:
        print('This function does not take any additional argument')
        wrongUsageMessage()

    print(operations.first_character(args.function[1]))

elif args.function[0] == 'first_two_characters':
    if args.ignore or args.word or args.delimiter or args.fields:
        print('This function does not take any additional argument')
        wrongUsageMessage()

    print(operations.first_two_characters(args.function[1]))

elif args.function[0] == 'all_characters_except_first_two':
    if args.ignore or args.word or args.delimiter or args.fields:
        print('This function does not take any additional argument')
        wrongUsageMessage()

    print(operations.all_characters_except_first_two(args.function[1]))

elif args.function[0] == 'penultimate_character':
    if args.ignore or args.word or args.delimiter or args.fields:
        print('This function does not take any additional argument')
        wrongUsageMessage()

    print(operations.penultimate_character(args.function[1]))

elif args.function[0] == 'last_three_characters':
    if args.ignore or args.word or args.delimiter or args.fields:
        print('This function does not take any additional argument')
        wrongUsageMessage()

    print(operations.last_three_characters(args.function[1]))

elif args.function[0] == 'all_characters_in_even_positions':
    if args.ignore or args.word or args.delimiter or args.fields:
        print('This function does not take any additional argument')
        wrongUsageMessage()

    print(operations.all_characters_in_even_positions(args.function[1]))

elif args.function[0] == 'merge_characters_and_duplicate':
    if args.ignore or args.word or args.delimiter or args.fields:
        print('This function does not take any additional argument')
        wrongUsageMessage()

    print(operations.merge_characters_and_duplicate(args.function[1]))


elif args.function[0] == 'all':
    if args.ignore or args.word or args.delimiter or args.fields:
        print('This function does not take any additional argument')
        wrongUsageMessage()

    import skrypt1
    skrypt1.printAll(args.function[1])
else:
    wrongUsageMessage()
