
// mecanime des bouton
//    donner avis
//    fermer
// valider les donner
// assurer que les comment on éte bien envoyer
// afficher les commentaier

export class Comment{
    /**
     * 
     * @param {HTMLElement} parente
     */
    CLASS_CSS = 'active'
    constructor(parente){
        this.parent = parente
        this.butAvis = this.parent.querySelector('.comment')

        // ouvrir la section commentaire
        this.omb = this.parent.querySelector('.omb')
        this.butAvis.onclick = ()=>this.butAvisActive()

        // fermer la section commentaire
        this.fermer = this.parent.querySelector('.fermer')
        this.fermer.onclick = ()=>this.butAvisActive()
    }

    butAvisActive(){
        this.omb.classList.toggle(this.CLASS_CSS)
    }

}