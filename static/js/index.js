
import {  } from "./fonction.js";
import { Color } from "./color.js";
import { Popup } from "./pop.js";


const message = [
    'tres bon choix cette couleur apporte la joie',
    'pas mal cette couleur',
    'cette couleur iras bien dans votre site',
    'belle initiatise',
    'aimais vous vraiment cette couleur ?',
    '...'
]

const form = document.getElementById('ch-color')
form.addEventListener('submit',e => e.preventDefault())

const color = new Color(form)
color.insert([0,23,1,0])

// const popParent = 
// const pop = new Popup()