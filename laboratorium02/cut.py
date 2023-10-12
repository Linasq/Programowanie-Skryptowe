#!/usr/bin/python3

def cut(delim='\t', field=[]):
    # pobieranie kolejnych linii uzytkownika
    s = []
    x = input()
    while x != "":
        s.append(x)
        try:
            x = input()
        except EOFError:
            break

    field = [int(i)-1 for i in field]
    s = [i.split(delim) for i in s]
    
    matchTab = []
    for i in range(len(s)):
        for ind, matched in enumerate(s[i]):
            if ind in field:
                matchTab.append(matched)

    return matchTab

if __name__ == "__main__":
    tab = cut(':', [1])
    for i in tab:
        print(i)
