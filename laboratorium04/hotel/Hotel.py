from Room import Room
from Reservation import Reservation

from datetime import date

class Hotel:
    rooms: list[Room] = [Room('1', 250), Room('2', 300), Room('3', 350), Room('4', 100), Room('5', 175)]

    def __init__(self, res: list[Reservation]) -> None:
        self.reservations = res

    def find_reservations(self, guest_pesel) -> bool:
        for r in self.reservations:
            if r.guest.pesel == guest_pesel: return True

        return False
    
    def get_guest(self, guest_pesel):
        from Guest import Guest
        for r in self.reservations:
            if r.guest.pesel == guest_pesel:
                return r.guest
        return Guest('','','')

    def print_reservations_pesel(self, guest_pesel):
        print(f'Nr PESEL: {guest_pesel}')
        for r in self.reservations:
            if r.guest.pesel == guest_pesel:
                print(f'Termin: {r.check_inDate} -- {r.check_outDate}\nPokoj: {r.room.get_number}\n')


    def print_reservations_date(self, date_start: date, date_end: date):
        for r in self.reservations:
            if date_start < r.check_inDate < date_end:
                print(f'Gosc: {r.guest.name} {r.guest.surname}\nPokoj: {r.room.get_number}\nData rezerwacji: {r.check_inDate} -- {r.check_outDate}')

                no_of_days = f'{r.check_outDate - r.check_inDate}'[:2].strip()
                no_of_days = int(no_of_days)
                total_price = no_of_days * r.room.get_price
                print(f'Laczna cena: {total_price}')
            print()

    # funkcja sprawdza, czy daty git i czy jest miejsce w pokoju
    # nastepnie dodaje prostego stringa do listy gosci
    def add_to_room(self, room, guest_name, guest_surname, guest_pesel, dateStart, dateEnd):
        from Guest import Guest as g
        if Room.no_in_room[room.number][0] < Room.no_in_room[room.number][1] and dateStart < dateEnd:
            if self.find_reservations(guest_pesel):
                gObj = self.get_guest(guest_pesel)
            else:
                gObj = g(guest_name, guest_surname, guest_pesel)
            self.reservations.append(Reservation(gObj, room, dateStart, dateEnd))
            Room.no_in_room[room.number][0] += 1
            Room.guests[room.number].append(f'{guest_pesel}\t{guest_name} {guest_surname}\t{dateStart}\t{dateEnd}')
        else:
            print('Brak wolnych miejsc w podanym terminie')

