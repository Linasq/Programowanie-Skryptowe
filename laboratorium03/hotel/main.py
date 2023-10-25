#!/usr/bin/python

from Guest import Guest as g
from Room import Room as r
import datetime as dt

list_of_guests = [g("Jan Kowalski"), g("Anna Kowalska"), g("Joanna Bielecka")]
list_of_rooms = [r('1', 150), r('2', 200), r('3', 250)]

print('Lista pokoi przed rezerwacja: ', list_of_rooms, '\n')
print('Goscie: ', list_of_guests, '\n')

room1 = list_of_rooms[0]
room2 = list_of_rooms[1]
room3 = list_of_rooms[2]

jan_guest = list_of_guests[0]
jan_guest.book(list_of_rooms[0], dt.date(2023,11,11), dt.date(2023,11,12))
jan_guest.book(list_of_rooms[2], dt.date(2024, 1, 1), dt.date(2024, 1, 3))

ann_guest = list_of_guests[1]
ann_guest.book(list_of_rooms[2], dt.date(2023, 12, 31), dt.date(2024, 1, 2))
ann_guest.book(list_of_rooms[0], dt.date(2024,1,1), dt.date(2024,1,10))
print()

print('Lista pokoi po rezerwacji: ', list_of_rooms)

print(list_of_guests[0])
print(list_of_guests[1])
print(list_of_guests[2])

print(list_of_rooms[0])
print(list_of_rooms[1])
print(list_of_rooms[2])
