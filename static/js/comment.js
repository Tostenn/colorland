
// mecanime des bouton  ok
//    donner avis       ok
//    fermer            ok
// valider les donner
// assurer que les comment on éte bien envoyer
// afficher les commentaier

import { Forms } from "./formulaire.js";

/**
 * gestion des commaitaire
 */
export class Comment{
    /**
     * 
     * @param {HTMLElement} parent
     */
    CLASS_CSS = 'active'
    constructor(parent){
        this.parent = parent
        this.butAvis = this.parent.querySelector('.comment')
        
        // ouvrir la section commentaire
        this.omb = this.parent.querySelector('.omb')
        this.butAvis.onclick = ()=>this.butAvisToggle()
        
        this.butAvisToggle()

        // fermer la section commentaire
        this.fermer = this.parent.querySelector('.fermer')
        this.fermer.onclick = ()=>this.butAvisToggle()

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
    }

    validationForm(){
        console.log(this.form.verifiSubmit())
    }
}
