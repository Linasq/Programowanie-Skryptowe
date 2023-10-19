#!/usr/bin/python3

import sys
import json


# funkcja do ladnego wypisania pokoi i gosci
def printRooms(rooms):
    print('''
-------------+--------+--------+
Numer pokoju | Goście | Termin |
-------------+--------+--------+''')

    for k,v in rooms.items():
        print(k, end='')
        for i in v:
            if '1' not in i[0]:
                print(' '*13, i)
            else:
                print(' '*12, i)
        print()


# funckja do ladnego wypisania gosci i ich rezerwacji
def printReservartions(guests):
   for key in guests.keys():
       print(key, end='')
       print('''
---------------------+--------------+ 
Termin               | Numer pokoju |
---------------------+--------------+
''', end='')
       for value in guests[key]:
           print(value)
        
       print()


# funkcja, robiona na szybko w celu wyczyszczenia danych w pliku json
def clearJSON(file):
    with open(file, 'w') as f:
        json.dump({"1":["1. "], "2":["1. ", "2. ", "3. "], "3":["1. ", "2. "]}, f)


if __name__ == '__main__':
    FILE = sys.argv[1]
    
    #czyscimy plik json przy kazdym uruchomieniu
    clearJSON(FILE)

    x = 'Zaczynamy zabawe'
    while x != '':
        # w zmiennej rooms przechowujemy dane z jsona
        with open(FILE, 'r') as f:
            ROOMS = json.load(f)

        #pobieramy kolejne linie od usera
        try:
            x = input('>')
        except EOFError:
            print()
            exit()
        
        # printowanie stanu pokojow
        if x == 'rooms':
            printRooms(ROOMS)

        # printowanie rezerwacji gosci
        elif x[0:4] == 'show':
            # tablica gosci
            trueGuests = []
            for v in ROOMS.values():
                for vv in v:
                    if len(vv) > 3:
                        guest = vv.split()[1]
                        guest = guest.strip()
                        if guest not in trueGuests: trueGuests.append(guest)

            # oczyszczanie inputu
            tabOfGuests = x[4::]
            tabOfGuests = tabOfGuests.split(',')
            tabOfGuests = [i.strip() for i in tabOfGuests if i != '']
            tabOfGuests = [i for i in tabOfGuests if i in trueGuests]
           
            
            # odpalamy petle, gdy mamy chociaz jednego goscia
            if len(tabOfGuests) != 0:
                dictTemp = {}
                for guest in tabOfGuests:
                    dictTemp[guest] = []
                
                # sprawdzamy jego wszystkie rezerwacje i dodajemy do slownika
                for key,v in ROOMS.items():
                    for vv in v:
                        temp = vv.split()

                        if len(temp) > 1:
                            if temp[1] in dictTemp.keys():
                                dictTemp[temp[1]].append(f'{temp[2]}\t{key}')

                printReservartions(dictTemp) 

        
            else:
                print('Brak rezerwacji')

        # rezerwowanie pokojow
        elif x[0:4] == 'book':
            if '|' not in x:
                print('Niepoprawny format komendy')
                break
            whatReservations=x[4::].split()
            dictTemp = {}

            for item in whatReservations:
                # dzielimy stringa na goscia i jego rezerwacje
                guest, reservations = item.split('|')
                guest = guest.strip()
                validator = any(i.isdigit() for i in guest)
                if validator:
                    print('Niepoprawny format komendy')
                    break

                # moze byc wiele rezerwacji
                reservations = reservations.split(':')

                # ta linijka sluzy do wydobycia nr pokoju
                noRoom = [i.split('(')[1].split(')')[0] for i in reservations]

                # ta sluzy do wydobycia daty
                whenDate = [i.split('(')[0] for i in reservations]
                ctr = 0
                for number in noRoom:
                    if int(number) <= 3:
                        for ind,value in enumerate(ROOMS[number]):
                            if len(value) <= 3:
                                ROOMS[number][ind] = f'{value}{guest}\t{whenDate[ctr]}'
                                ctr+=1
                                break
                    else:
                        print(f'Pokoj nr {number} nie istnieje')
                        break

            with open(FILE, 'w') as f:
                json.dump(ROOMS, f)

        else:
            print('Nieznana komenda')
