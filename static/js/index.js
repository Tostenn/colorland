import { Color } from "./dependance/color.js";
import { Popup } from "./dependance/pop.js";
import { Comment } from "./dependance/comment.js";
// import { Api } from "./dependance/api.js";
// import fec from "./dependance/main.js";
import { Notif } from "./dependance/notif.js";


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
color.insert([260,25,284,40])

const popParent = document.querySelector('.ppoopp')
const copyButton = form.querySelector('.copier')
const pop = new Popup(popParent,copyButton,color)
// pop.newpop([100,30,100,1])
// pop.newpop([100,30,200,5.80011111])

const sectionAlert = document.querySelector('.alert')
const notif = new Notif(sectionAlert)
// notif.new('sdsds 00                      00d','cl-v')
// fec('http://localhost:8080/?get-color-all=true')
//     // .then(l => l.json())
//     // .then(l => l.text())
//     .then(l => console.log(l))
//     .catch(l => console.log(l))
const sectionAvis = document.querySelector('.avis')
const cmt = new Comment(sectionAvis,color,notif)