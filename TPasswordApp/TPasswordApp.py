from flask import Flask, render_template, request, redirect, url_for 
from attaque import bruteforcetime, convert_time, dicotest, maker

app = Flask(__name__)

@app.route("/")
def welcome():
    return render_template("acceuil.html")

@app.route("/tester", methods = ["GET","POST"])
def tester():
        if request.method == "POST" : 
            
            mdp = str(request.form.get('mdp'))

            (seconde, minute, heure, jour, mois, annee) = convert_time(bruteforcetime(mdp)) 
            
            if(dicotest(mdp)) :
                return render_template("tpassword.html",msg = "DICO")

            return render_template("tpassword.html",s = seconde, min = minute, h = heure,  j = jour, m = mois, a = annee)

        else : 
             return render_template("tpassword.html")

@app.route("/maker")
def mdp_maker():
    return render_template("generateur.html")  

@app.route("/FAQ")
def faq():
    return render_template("FAQ.html")

        


if __name__ == '__main__':
    app.run(debug=True)

