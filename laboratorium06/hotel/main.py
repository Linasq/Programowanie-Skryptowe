#!/usr/bin/python

from types import NoneType
import pandas as pd
from typing import Final
import datetime as dt
import argparse

from Hotel import Hotel as h
from Guest import Guest as g

# argument parsing
parser = argparse.ArgumentParser(description='Witaj w hotelu Marmur')
parser.add_argument('-f', '--file', help='Path to file.csv', required=True)
parser.add_argument('-u', '--user', help='User that manages data', required=True)
parser.add_argument('-b', '--book', help='Specify person to book (0-5) Default is *, which means all people from file will be booked', required=False, dest='ID', action='extend')
parser.add_argument('-S', '--search-by-name', help='Search by name and surname', required=False, nargs=2, action='extend', dest='NAME')
parser.add_argument('-s', '--search-by-date', help='Search reservations that are in given range', required=False, nargs=2, action='extend', dest='DATE_RANGE')
args = parser.parse_args()

# global variables
HOTEL = h({})
USERS={'Admin':'BOG', 'Kuba':'Admin', 'Jan':'User', 'Damian':'User'}

USER = args.user
GROUP = USERS.get(USER)


# error class
class AccessError(Exception):
    def __init__(self, user) -> None:
        self.user = user

    def __str__(self) -> str:
        return f'Access denied. User {self.user} is not an admin'


# decorator
def user(nazwa):
    def wrap(func):
        def wrapper(*args, **kwargs):
            if nazwa == 'Admin' or USERS.get(nazwa) == 'Admin': return func(*args, **kwargs)
            raise AccessError(nazwa)
        return wrapper
    return wrap 


# import csv file
FILE = args.file
DATA = pd.read_csv(FILE, delimiter=';')

# create list of guests
names = DATA['imie']
surnames = DATA['nazwisko']
list_of_guests = [g(n,s) for n,s in zip(names[names.duplicated()], surnames[surnames.duplicated()])]
list_of_guests_duplicated = [i for i in list_of_guests for _ in range(2)]

list_of_rooms: Final = HOTEL.rooms

# print state before doing anything
print('Lista pokoi przed rezerwacja: ', list_of_rooms, '\n')
print('Goscie: ', list_of_guests, '\n')

# book guests
@user(USER)
def book_guest(guest: g, room, date_start, date_end):
    guest.book(HOTEL, room, date_start, date_end)

x = [] if type(args.ID) is NoneType else [int(args.ID[i]) for i in range (0,len(args.ID),2)]
match x:
    case []:
        # przepraszam wszystkich co to czytaja
        # napiszcie na priv, to wytlumacze
        # to jest magia
        list(map(lambda x,y: book_guest(x,list_of_rooms[DATA.at[y, 'pokoj']], dt.datetime.strptime(DATA.at[y, 'data_poczatkowa'], '%Y-%m-%d').date(), dt.datetime.strptime(DATA.at[y, 'data_koncowa'], '%Y-%m-%d').date()), list_of_guests_duplicated, list(range(6))))

    case _:
        # naprawde przepraszam
        list(map(lambda x,y: book_guest(x,list_of_rooms[DATA.at[y, 'pokoj']], dt.datetime.strptime(DATA.at[y, 'data_poczatkowa'], '%Y-%m-%d').date(), dt.datetime.strptime(DATA.at[y, 'data_koncowa'], '%Y-%m-%d').date()), [g for g,i in zip(list_of_guests_duplicated, [True if i in x else False for i in range(6)]) if i], x))


print('Lista pokoi po rezerwacji: ', list_of_rooms)

'''
print('\nRezerwacje poszczegolnych gosci:')
print(list_of_guests[0])
print(list_of_guests[1])
print(list_of_guests[2])

print('\nRezerwacje poszczegolnych pokoi')
print(list_of_rooms[0])
print(list_of_rooms[1])
print(list_of_rooms[2])
print(list_of_rooms[3])
print(list_of_rooms[4])
'''

print(f'{"#"* 10} Dodatkowe informacje {"#"*10}')
if args.NAME:
    HOTEL.print_reservations_name(args.NAME[0].capitalize(), args.NAME[1].capitalize())

if args.DATE_RANGE:
    HOTEL.print_reservations_date(dt.datetime.strptime(args.DATE_RANGE[0], '%Y-%m-%d').date(), dt.datetime.strptime(args.DATE_RANGE[1], '%Y-%m-%d').date())
