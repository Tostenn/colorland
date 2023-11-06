
import {  } from "./fonction.js";
import { Color } from "./color.js";

/**
 * cettte classe va generer des color ok
 * apppliquer la color a l'élément    ok
 * renvoir les color actuel           ok
 * metter a jours les champs          ok
 * appplique les modification -------
 * des champs sue l'element color     ok
 */


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