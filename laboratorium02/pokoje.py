#!/usr/bin/python3

import argparse

# argparse
parser = argparse.ArgumentParser(prog='Hotel', description='Run this script to add / check guests in room')
parser.add_argument('file', help='Specify text file where the "database" is')

args = parser.parse_args()
FILE = args.file
###############################################################
# print error message
def syntaxError():
    print('Niepoprawny format komendy')


# funkcja do ladnego wypisania pokoi i gosci
def printRooms():
    print('''
-------------+--------+ 
Numer pokoju | Goście |
-------------+--------+''')

    '''for k,v in ROOMS.items():
        print(k, end='')
        for i in v:
            if '1' not in i:
                print(' '*13, i)
            else:
                print(' '*12, i)
        print()'''


if __name__ == '__main__':
    while True:
        # pod inputa
        try:
            x=input('> ')
        except EOFError:
            break
    
        # pokazujemy pokoje
        if x == 'rooms':
            # pobieramy plik
            with open(FILE, 'r') as f:
                data = f.readlines()
            
            print('''
-------------+--------+--------+
Numer pokoju | Goście | Termin |
-------------+--------+--------+
''', end='')
            for ind, tekst in enumerate(data):
                # index 0 u mnie to ROOM, tego nie chcemy printowac
                if ind == 0: continue
                
                elif 'TERMIN' in tekst:
                    break
                else:
                    print(tekst, end='')
        
        #TODO book room
        # probojemy rezerwowac pokoj
        elif 'book' in x:
            tab = x.split()
        
            if len(tab) == 2:
                pass

            else:
                syntaxError()

        # pokazujemy kto i kiedy ma rezerwacje
        elif 'show' in x:
            tab = x.split()
            if len(tab) == 2:
                tabImiona = tab[1].split(',')
                with open(FILE, 'r') as f:
                    tab = f.readlines()
                    print(tab)
                    idx = tab.index('TERMIN\n')
                    tab = tab[idx+1::]
                
                for i in tabImiona:
                    idx = tab.index(i+'\n')
                    print(i)
                    print('''
---------------------+--------------+ 
Termin               | Numer pokoju |
---------------------+--------------+
''')
                    idx+=1
                    while '_' not in tab[idx]:
                        print(tab[idx], end='')
                        idx+=1

            else:
                syntaxError()
            
        else:
            print('Nieznana komenda')

    i=1
    '''while i < len(TAB):
        # jesli user chce wyswietlic stan pokoi
        if TAB[i] == '--stan_pokoi':
            printRooms()
            i+=1
        
        # w innym przypadku pobieramy imie i nr pokoju
        else:
            name = TAB[i]
            nr = int(TAB[i+1])
            
            # sprawdzamy czy nr jest ok
            if 1 <= nr <= 3:
                for ind in range(len(ROOMS[str(nr)])):

                    # tu zmienic, jesli zmieni sie dlugosc stringa, glupie ale dzialajace sprawdzenie, stanu pokoju
                    if len(ROOMS[str(nr)][ind]) == 3:
                        ROOMS[str(nr)][ind] += name
                        break'''
