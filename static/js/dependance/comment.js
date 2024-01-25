
// mecanime des bouton  ok
//    donner avis       ok
//    fermer            ok
// valider les donner
// assurer que les comment on éte bien envoyer
// afficher les commentaier

import { Forms } from "./formulaire.js";
import { Color } from "./color.js";
import { Api } from "./api.js";
import { Notif } from "./notif.js";

/**
 * gestion des commaitaire
 */
export class Comment extends Api{
    /**
     * 
     * @param {HTMLElement} parent
     * @param {Color} color
     * @param {Notif} notif
     */
    CLASS_CSS = 'active'
    constructor(parent,color,notif){
        super()
        this.parent = parent
        this.notif = notif
        this.color = color
        this.butAvis = this.parent.querySelector('.comment')
        
        // actualiser la color ducommantaire
        this.colorCmt = this.parent.querySelector('.clor')
        
        // ouvrir la section commentaire
        this.omb = this.parent.querySelector('.omb')
        this.butAvis.onclick = ()=>this.butAvisToggle()
        
        // fermer la section commentaire
        this.fermer = this.parent.querySelector('.fermer')
        this.fermer.onclick = ()=>this.butAvisToggle()
        this.butAvisToggle()

        // validation des données
        this.form = this.parent.querySelector('form')

        // desactive l'envoie du formulaire
        this.form.addEventListener('submit',e => e.preventDefault())

        // récuper le button d'envoie
        this.butFormAvis = this.form.querySelector('button')

        this.butFormAvis.onclick = () => this.validationForm()

        // validation des données par la class Forms
        const option = {
            btn : false,
            msgPersoName : {
                username:"entrer votre nom d'utilisateur",
                cmmt:"ecrivez ce dont vous avait ressenté lors de \
                la découverte de cette nouvelle couleur"
            },
        }
        this.form = new Forms(this.form,option)
    }

    butAvisToggle(){
        this.omb.classList.toggle(this.CLASS_CSS)
        this.colorCmt.style.backgroundColor = this.color.formateRGB()
        // this.colorCmt.innerHTML = this.color.formateRGB()
    }

    validationForm(){
        const dataUser = this.form.verifiSubmit(true)
        if (dataUser){
            dataUser['nom'] = this.color.formateRGB()
            console.log(dataUser)
            super.pushCmt(dataUser)
                .then(() => this.notif.new('commentaire bien envoyer :)','cl-v'))
                .catch(() => this.notif.new(
                    'une erreur c\'est produit lors de l\'envoie du commentaire !\
                    <br> <strong> veuillez résseyer dans quelque instant </strong> !!',
                    '',
                    7
                ))
        }

    }
}
