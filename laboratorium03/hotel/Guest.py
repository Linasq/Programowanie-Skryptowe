from Room import Room as r

class Guest:
    info = {}

    def __init__(self, name: str) -> None:
        self.name = name

        # kazdy nowy uzytkownik tworzy swoja liste, by w niej przechowywac info o sobie
        Guest.info[self.name] = []

    def book(self, room, dateStart, dateEnd):
        # room musi byc obiektem klasy Room, inaczej nie przejdzie
        if not isinstance(room, r):
            raise TypeError(f'room is {type(room)}, expected Room instance')

        # dodawanie goscia dzieje sie juz w klasie room
        numbers = r.get_rooms_info(room) 
        r.add_to_room(room, self.name, dateStart, dateEnd)

        if dateEnd > dateStart and numbers[1] > numbers[0]:
            # w celu latwiejszego dostepu do info o gosciu
            # w naszym slowniku mamy: calkowita cena, nr pokoju i daty
            number = room.get_number
            price  = room.get_price
            no_of_days = f'{dateEnd - dateStart}'[:2].strip()
            no_of_days = int(no_of_days)

            total_price = price * no_of_days
            Guest.info[self.name].append(f'{number} {total_price} {dateStart} {dateEnd}')

    def __str__(self) -> str:
        print(self.name)
        for i in Guest.info[self.name]:
            tab = i.split()
            print(f'Pokoj nr: {tab[0]}\t{tab[2]}\t{tab[3]}\nDo zaplaty:\t{tab[1]} zlotych')
        return ''

    def __repr__(self) -> str:
        return f'{self.name}'
