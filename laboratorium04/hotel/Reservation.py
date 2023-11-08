from Guest import Guest
from Room import Room
import datetime as dt

class Reservation:
    def __init__(self, guest: Guest, room: Room, check_inDate: dt.date, check_outDate: dt.date) -> None:
        self.guest = guest
        self.room = room
        self.check_inDate = check_inDate
        self.check_outDate = check_outDate
