import os

def bruteforcetime(mdp):
    min = 0;
    maj = 0;
    num = 0;
    spe = 0;
    pos = 0;
    for i in range(len(mdp)):
        if mdp[i] >= "a" and mdp[i] <= "z":
            min = 1;
        if mdp[i] >= "A" and mdp[i] <= "Z":
            maj = 1;
        if mdp[i] >= "0" and mdp[i] <= "9":
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
        pos += 16;

    temps = pos**len(mdp) / 1_000_000;

    return temps;


PATH = "C:\\Users\\natha\\OneDrive\\Bureau\\COURS\\L2_INFO\\Dev_APP\\TPassword\\TPassword\\TPasswordApp"

def dicotest(mdp):
    with open(os.path.join(PATH,"10-million-password-list-top-1000000.txt"),'r') as fichier:
        for ligne in fichier:
            if mdp == ligne.rstrip("\n"):
                return True;
        fichier.close()
        return False;

