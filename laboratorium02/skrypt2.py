#!/usr/bin/python3

import argparse
parser = argparse.ArgumentParser(prog='skrypt2', description='Use GREP or CUT in python')
parser.add_argument('action', help='Choose cut or grep "word" option', type=str, nargs='+')
parser.add_argument('-i', '--ignore', required=False, help='ignore case distinctions in patterns and input data, used with grep', action='store_true')
parser.add_argument('-w', '--word', required=False, help='select only those lines containing matches that form whole word, used with grep', action='store_true')
parser.add_argument('-d', '--delimiter', required=False, help='specify delimiter instead of TAB, used with cut')
parser.add_argument('-f', '--fields', required=False, help='select only these fields, used with cut', action='extend')

args=parser.parse_args()

if args.action[0] == 'cut':
    if args.ignore or args.word or len(args.action) >= 2:
        print("Bad optional argument, see help")
        exit()
        
    import cut
    tab = cut.cut(args.delimiter, args.fields)
    for i in tab:
        print(i)

elif args.action[0] == 'grep':
    if args.delimiter or args.fields:
        print("Bad optional argument, see help")

    import grep
    tab = grep.grep(args.action[1], args.ignore, args.word)
    for i in tab:
        print(i)

else:
    print("Syntax: ./skrypt2.py {grep, cut} [optional arguments, see help]")
