import { Color } from "./color.js";
import { Popup } from "./pop.js";
// import { Api } from "./api.js";
// import fec from "./main.js";


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
color.insert([26,135,84,40])

const popParent = document.querySelector('.ppoopp')
const copyButton = form.querySelector('.copier')
const pop = new Popup(popParent,copyButton,color)
// pop.newpop([100,30,100,1])
// pop.newpop([100,30,200,5.80011111])


// fec('http://localhost:8080/?color=color',{mode:'cors'})
//     // .then(l => l.json())
//         .then(l => console.log(l))
//     .catch(l => console.log(l))