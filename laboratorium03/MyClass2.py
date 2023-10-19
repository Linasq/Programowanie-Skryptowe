#!/usr/bin/python
"""
Plik: MyClass2.py
Autor: Stanisław Polak
Data utworzenia: 13-10-2023
Data modyfikacji: 19-10-2023
Wersja: 1.0.1
Opis: Klasa do ćwiczenia 3 zawierająca tylko metody specjalne.
"""
import sys
from helper import methodBody
class MyClass2:
    def __new__(cls):
        print(
            "\tWywołano metodę \033[4mstatyczną\033[0m   \033[7m{method_name:^16}\033[0m klasy \033[1m{cls}\033[0m".format(
                method_name=sys._getframe().f_code.co_name + "()",
                cls=__class__.__name__,
            )
        )
        obj = object.__new__(cls)
        print(" " * 36, end="")
        print(
            "\t    Utworzono obiekt \033[{color}m{id}\033[0m".format(
                color="48;5;{}".format(id(obj) % 255), id=id(obj)
            )
        )
        return obj
    def __init__(self):
        print(methodBody(id(self), sys._getframe().f_code.co_name))
    def __del__(self):
        print(methodBody(id(self), sys._getframe().f_code.co_name))
        print(" " * 37, end="")
        print(
            "\t     Usunięto obiekt \033[{color}m{id}\033[0m".format(
                color="48;5;{}".format(id(self) % 255), id=id(self)
            )
        )
    def __str__(self):
        return methodBody(id(self), sys._getframe().f_code.co_name)
    def __repr__(self):
        return methodBody(id(self), sys._getframe().f_code.co_name)
print("Załadowano zawartość pliku '{name}'".format(name=__file__))
