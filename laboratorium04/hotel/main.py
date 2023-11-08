#!/usr/bin/python

from typing import Final

from Hotel import Hotel as h
from Guest import Guest as g

import datetime as dt

HOTEL = h([])
list_of_guests = [g('Jan', 'Kowalski', '01120302021'), g('Anna', 'Kowalska', '99121215372'), g('Joanna', 'Nowak', '12313212312')]
list_of_rooms: Final = HOTEL.rooms

print('Lista pokoi przed rezerwacja: ', list_of_rooms, '\n')
print('Goscie: ', list_of_guests, '\n')

room1 = list_of_rooms[0]
room2 = list_of_rooms[1]
room3 = list_of_rooms[2]

jan_guest = list_of_guests[0]
jan_guest.book(HOTEL,list_of_rooms[0], dt.date(2023,11,11), dt.date(2023,11,12))
jan_guest.book(HOTEL,list_of_rooms[2], dt.date(2024, 1, 1), dt.date(2024, 1, 3))

ann_guest = list_of_guests[1]
ann_guest.book(HOTEL,list_of_rooms[2], dt.date(2023, 12, 31), dt.date(2024, 1, 2))
ann_guest.book(HOTEL,list_of_rooms[0], dt.date(2024,1,1), dt.date(2024,1,10))

jo_guest = list_of_guests[2]
jo_guest.book(HOTEL, list_of_rooms[4], dt.date(2023,2,12), dt.date(2023,2,22))
jo_guest.book(HOTEL, list_of_rooms[3], dt.date(2024, 12, 12), dt.date(2024, 12, 20))


print('Lista pokoi po rezerwacji: ', list_of_rooms)

print(list_of_guests[0])
print(list_of_guests[1])
print(list_of_guests[2])

print(list_of_rooms[0])
print(list_of_rooms[1])
print(list_of_rooms[2])
print(list_of_rooms[3])
print(list_of_rooms[4])


print('\n\nNowe rzeczy:\n')

print('Szukanie po nr PESEL:\n')
HOTEL.print_reservations_pesel('01120302021')

print()

print('Szukanie po dacie:\n')
HOTEL.print_reservations_date(dt.date(2023, 1, 1), dt.date(2023,12,31))
