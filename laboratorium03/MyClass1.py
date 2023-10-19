#!/usr/bin/python
"""
Plik: MyClass1.py
Autor: Stanisław Polak
Data utworzenia: 13-10-2023
Data modyfikacji: 13-10-2023
Wersja: 1.0
Opis: Klasa do ćwiczenia 3 — nie zawiera metod specjalnych.
"""

import sys
from helper import methodBody


class MyClass1:
    def instanceMethod(self):
        print(methodBody(id(self), sys._getframe().f_code.co_name))
    @classmethod
    def classMethod(cls):
        print(
            "\tWywołano metodę \033[4mklasową\033[0m     \033[7m{method_name:^16}\033[0m klasy \033[1m{cls}\033[0m".format(
                method_name=sys._getframe().f_code.co_name + "()", cls=cls.__name__
            )
        )
    @staticmethod
    def staticMethod():
        print(
            "\tWywołano metodę \033[4mstatyczną\033[0m   \033[7m{method_name:^16}\033[0m klasy \033[1m{cls}\033[0m".format(
                method_name=sys._getframe().f_code.co_name + "()", cls=__class__.__name__
            )
        )


print("Załadowano zawartość pliku '{name}'".format(name=__file__))
