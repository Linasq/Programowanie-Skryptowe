class Room:
    # slownik, ktory pokazuje ile jest miejsca w pokoju
    no_in_room = {'1':[0,1], '2':[0,3], '3':[0,2]}
    guests = {'1':[], '2':[], '3':[]}

    def __init__(self, number: str, price: int) -> None:
        self.number = number
        self.price = price

    # funkcja sprawdza, czy daty git i czy jest miejsce w pokoju
    # nastepnie dodaje prostego stringa do listy gosci
    def add_to_room(self, guest_name, dateStart, dateEnd):
        if Room.no_in_room[self.number][0] < Room.no_in_room[self.number][1] and dateStart < dateEnd:
            Room.no_in_room[self.number][0] += 1
            Room.guests[self.number].append(f'{guest_name}\t{dateStart}\t{dateEnd}')
        else:
            print('Brak wolnych miejsc w podanym terminie')

    
    ###############################properties
    def get_rooms_info(self):
        return list(Room.no_in_room[self.number])

    @property
    def get_number(self):
        return self.number

    @property
    def get_price(self):
        return self.price
    ########################################


    def __repr__(self) -> str:
        return (f'nr: {self.number} Aktualna liczba osob: {Room.no_in_room[self.number][0]}')

    def __str__(self) -> str:
        print(f'Numer: {self.number}')
        print(f'Cena: {self.price}')
        print(f'Maksymalna liczba osob: {Room.no_in_room[self.number][1]}')

        if self.no_in_room[self.number][0] > 0:
            print(f'Aktualna liczba osob: {Room.no_in_room[self.number][0]}')
            
            for i in self.guests[self.number]:
                print(f'\t{i}')
                
        else:
            print('Aktualna liczba osob: 0')

        return ""
