#!/usr/bin/python3

import sys


# funkcja do ladnego wypisania pokoi i gosci
def printRooms(rooms):
    print('''
-------------+--------+--------+
Numer pokoju | Goście | Termin |
-------------+--------+--------+''')

    for k,v in rooms.items():
        print(k, end='')
        for i in v:
            i = i.strip()
            tabi = i.split()
            if '1' not in i[0]:
                if len(tabi) == 1:
                    print(' '*13, i)
                else:    
                    print(' '*13, f'{tabi[0]} {tabi[1]}\t{tabi[2]}')
            else:
                if len(tabi) == 1:
                    print(' '*12, i)
                else:
                    print(' '*12, f'{tabi[0]} {tabi[1]}\t{tabi[2]}')
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


# funkcja przeksztalca tablice 2d w liste, ktorej kluczem jest pierwszy argument zagniezdzonej listy
def tab_to_dict(tab):
    dict_r = {'1':[], '2':[], '3':[]}
    for i in tab:
        if ['\n'] == i:
            break
        dict_r[i[0]].append(' '.join(i[1::]))

    return dict_r

# funckja majaca na celu zamienic slownik w tablice stringow, gotowa do wpisania do pliku
def dict_to_list(dict_r):
    tab_temp = []
    for k,v in dict_r.items():
        for vv in v:
            values_dict = vv.split(' ')
            temp = f'{k}#'
            temp += '#'.join(values_dict)
            tab_temp.append(temp)

    return tab_temp

def fill_rooms():
    return {'1':['1.'], '2':['1.', '2.', '3.'], '3':['1.', '2.']}


if __name__ == '__main__':
    FILE = sys.argv[1]
    
    # komenda sluzaca do wyczyszczenia syfu z poprzedniego uruchomienia programu
    # docelowo powinna byc na koncu
    open(FILE,'w').close()

    x = 'Zaczynamy zabawe'
    while x != '':
        with open(FILE, 'r') as f:
            ROOMS_tab = f.readlines()
        ROOMS_tab = [i.split('#') for i in ROOMS_tab]
        
        # by nie niszczyc calego programu jest dodana funkcja, ktora powinna nam dodac troche linijek, ale dzieki temu zachowamy strukture
        ROOMS = tab_to_dict(ROOMS_tab)
        if ROOMS == {'1':[], '2':[], '3':[]}:
            ROOMS = fill_rooms()

        #pobieramy kolejne linie od usera
        try:
            x = input('>')
        except EOFError:
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
                            if len(value) <= 8:
                                value = value.strip()
                                ROOMS[number][ind] = f'{value} {guest} {whenDate[ctr]}'
                                ctr+=1
                                break
                    else:
                        print(f'Pokoj nr {number} nie istnieje')
                        break
                
            ROOMS_to_dump = dict_to_list(ROOMS)

            with open(FILE, 'w') as f:
                for line in ROOMS_to_dump:
                    f.write(f'{line}\n')
        else:
            print('Nieznana komenda')
