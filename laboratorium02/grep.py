#!/usr/bin/python3

import re

def grep(tekst, ignoreCase=False, word=False):
    # pobieramy wszystkie linijki na ktorych mamy uzyc grepa
    x = input()
    s = []
    while x != "":
        s.append(x)
        try:
            x = input()
        except EOFError:
            break

    matchTab = []

    if word:
        if ignoreCase:
            # grep -w -i
            tekst = tekst.lower()
            regex = re.compile(r"\b"+tekst+r"\b")
            sIgnored = [i.lower() for i in s]
            for i,j in zip(s,sIgnored):
                if regex.findall(j):
                    matchTab.append(i)

        else:
            # grep -w
            regex = re.compile(r"\b"+tekst+r"\b")
            for i in s:
                if regex.findall(i):
                    matchTab.append(i)

    else:
        if ignoreCase:
            # grep -i
            tekst = tekst.lower()
            sIgnored = [i.lower() for i in s]
            for i,j in zip(s, sIgnored):
                if tekst in j:
                    matchTab.append(i)
        else:
            # zwykly grep
            for i in s:
                if tekst in i:
                    matchTab.append(i)

    return matchTab

if __name__ == "__main__":
    tab = grep("test", ignoreCase=True, word=True)
    for i in tab:
        print(i)

