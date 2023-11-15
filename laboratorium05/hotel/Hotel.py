from Guest import Guest
from Room import Room
from Reservation import Reservation

from datetime import date

class Hotel:
    rooms: list[Room] = [Room('1', 250), Room('2', 300), Room('3', 350), Room('4', 100), Room('5', 175)]


    def __init__(self, guests: dict[Guest, list[Reservation]]) -> None:
        self.guests = guests


    def find_reservations(self, guest_name, guest_surname) -> bool:
        for r in self.guests.keys():
            if r.name == guest_name and r.surname == guest_surname: return True

        return False

    
    def get_guest(self, guest_name, guest_surname):
        for r in self.guests.keys():
            if r.name == guest_name and r.surname == guest_surname:
                return r
        return Guest('','')


    def print_reservations_name(self, guest_name, guest_surname):
        print(f'Gosc: {guest_name} {guest_surname}')
        for k,v in self.guests.items():
            if k.name == guest_name and k.surname == guest_surname:
                for i in v:
                    print(f'Termin: {i.check_inDate} -- {i.check_outDate}\nPokoj: {i.room.get_number}\n')


    def print_reservations_date(self, date_start: date, date_end: date):
        for k,v in self.guests.items():
            for i in v:
                if date_start < i.check_inDate < date_end:
                    print(f'Gosc: {k.name} {k.surname}\nPokoj: {i.room.get_number}\nData rezerwacji: {i.check_inDate} -- {i.check_outDate}')

                    no_of_days = f'{i.check_outDate - i.check_inDate}'[:2].strip()
                    no_of_days = int(no_of_days)
                    total_price = no_of_days * i.room.get_price
                    print(f'Laczna cena: {total_price}')
                print()

    # funkcja sprawdza, czy daty git i czy jest miejsce w pokoju
    # nastepnie dodaje prostego stringa do listy gosci
    def add_to_room(self, room, guest_name, guest_surname, dateStart, dateEnd):
        from Guest import Guest as g
        if Room.no_in_room[room.number][0] < Room.no_in_room[room.number][1] and dateStart < dateEnd:
            if self.find_reservations(guest_name, guest_surname):
                gObj = self.get_guest(guest_name, guest_surname)
                self.guests[gObj].append(Reservation(room, dateStart, dateEnd))
            else:
                gObj = g(guest_name, guest_surname)
                self.guests[gObj] = [Reservation(room, dateStart, dateEnd)]
            Room.no_in_room[room.number][0] += 1
            Room.guests[room.number].append(f'{guest_name} {guest_surname}\t{dateStart}\t{dateEnd}')
        else:
            print('Brak wolnych miejsc w podanym terminie')

