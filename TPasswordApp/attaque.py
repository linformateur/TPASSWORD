import os 
import random

def bruteforcetime(mdp):
    min = 0;
    maj = 0;
    num = 0;
    spe = 0;
    pos = 0;
    for i in range(len(mdp)):
        if mdp[i] >= "a" and mdp[i] <= "z":
            min = 1;
        elif mdp[i] >= "A" and mdp[i] <= "Z":
            maj = 1;
        elif mdp[i] >= "0" and mdp[i] <= "9":
            num = 1;
        else:
            spe = 1;

    if min == 1:
        pos += 26;
    if maj == 1:
        pos += 26;
    if num == 1:
        pos += 10;
    if spe == 1:
        pos += 33;

    complexity = pos**len(mdp)
    
    if complexity < 1_000 : 
        return 0.001
    else :
        return complexity / 62_000_000 ; 

def convert_time(s) : 
    min = 0
    h = 0 
    j = 0 
    mois = 0
    a = 0 

    if s >= 60 : 
        min = s // 60
        s = s % 60  
        if min >= 60 : 
            h = min // 60
            min  = min % 60 
            if h >= 24 : 
                j = h // 24 
                h = h % 24 
                if j >= 30 : 
                    mois = j // 30 
                    j = j % 30
                    if mois >= 12 : 
                        a = mois// 12 
                        mois = mois % 12
    
    return (s, min, h, j, mois, a)

def dicotest(mdp):
    with open("10-million-password-list-top-1000000.txt",'r') as fichier:
        for ligne in fichier:
            if mdp == ligne.rstrip("\n"):
                return True;
        fichier.close()
        return False;
    
def maker(mot):
    
    maj = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    minus = "abcdefghijklmnopqrstuvwxyz"
    number = "0123456789"
    spe = "!@#&=*+-?:<>"
    
    if(len(mot) < 8) : 
        moy = len(mot) // 2 
        for i in range(0,12 - moy):
            if i % 2 == 0 : 
                mot = minus[random.randint(0,25)] + mot
            else : 
                mot = maj[random.randint(0,25)] + mot

        for i in range(moy,len(mot)):
            if i % 2 == 0 : 
                mot = mot + spe[random.randint(0,len(spe)-1)] 
            else : 
                mot = mot + number[random.randint(0,9)] 
    else : 
        mot = mot + minus[random.randint(0,25)]
        mot = mot + number[random.randint(0,9)]
        mot = mot + maj[random.randint(0,25)]
        mot = mot + spe[random.randint(0,len(spe)-1)]
    
    return mot