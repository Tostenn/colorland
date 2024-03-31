
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
import { Carosel } from "./carosel.js";
import { CaroselTouch } from "./carosel.js";



/**
 * gestion des commaitaire
 */
export class Comment extends Api{
    CLASS_CSS = 'active'
    /**
     * 
     * @param {HTMLElement} parentForm
     * @param {HTMLElement} parentShow
     * @param {Color} color
     * @param {Notif} notif
     */
    constructor(parentForm,parentShow,color,notif){
        super()
        this.parentForm = parentForm
        this.parentShow = parentShow
        this.notif = notif
        this.color = color
        this.butAvis = this.parentForm.querySelector('.comment')
        
        // recuperatipon de template commentaire
        this.template = this.parentShow.querySelector('template#sctShow')

        // actualiser la color ducommantaire
        this.colorCmt = this.parentForm.querySelector('.clor')
        
        // ouvrir la section commentaire
        this.omb = this.parentForm.querySelector('.omb')
        this.butAvis.onclick = ()=>this.butAvisToggle()
        
        // fermer la section commentaire
        this.fermer = this.parentForm.querySelector('.fermer')
        this.fermer.onclick = ()=>this.butAvisToggle()
        // this.butAvisToggle()

        // validation des données
        this.form = this.parentForm.querySelector('form')

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
        this.showCmt()
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

    /**
     * récupere les commentaire et les affichice
     */
    showCmt(){
        
        super.getCmtAll()
        .then( comments => {
            const diapo = document.createElement('div')
            diapo.setAttribute('class','diapo')
            for (const comment of comments) {
                const article = this.template.content.cloneNode(true)

                // header
                article.querySelector('.pp').style.backgroundColor = comment.nom
                article.querySelector('.info .name').innerHTML = comment.username
                article.querySelector('.info .date').innerHTML = comment.date_c + ' ' +comment.heure_c

                // body
                article.querySelector('.body pre').innerHTML = comment.cmmt

                // footer
                this.writevalue(article.querySelector('.footer'),comment.nom)
                this.copyColor(article.querySelector('.footer'))
                article.querySelector('.cpt span').innerHTML = comment.compter
                diapo.appendChild(article)
            }
            this.parentShow.querySelector('.el').appendChild(diapo)
            // ajout du commentaire
            const carosel = new Carosel(diapo,{
                visible:1,
                defile:1,
                margin:20,
                reponse:true,
                time:3.5,
                auto:true
            })
            // new CaroselTouch(carosel)
        })


        // .catch(() => this.notif.new(
        //     'une erreur c\'est produit lors de l\'envoie du commentaire !\
        //     <br> <strong> veuillez résseyer dans quelque instant </strong> !!',
        //     '',
        //     7
        // ))
    }
     /**
     * mise en forme des valeur de la couleur 
     * @param {HTMLElement} container 
     * @param {string} rgbx [r, g, b, op]
    */
    writevalue(container,rgbx = false){
        container.querySelector('.rgb-complet').innerHTML = rgbx
        rgbx = rgbx.replace('rgba','').replace('(','').replace(')','').split(',')
        const rgbContent = Array.from(container.querySelectorAll('.rgb-content span'))
        for (let i = 0; i < rgbContent.length; i++) {
            rgbContent[i].innerHTML = rgbx[i]            
        }
    }
     /**
     * compte le nombre de fois qu'une couleur a été copier
     * @param {HTMLElement} container 
     * @param {string} color
     */
    apicount(container,color){
        const countcolor = container.querySelector('.compter span')
        super.setColor(color)
            .then( () => {
                super.getColor(color)
                    .then( l => {
                            // countcolor.innerHTML = l?.compter
                    }).catch(() => this.notif.new(
                        'une erreur c\'est produit côté serveur !\
                        <br> <strong> veuillez résseyer dans quelque instant </strong> !!',
                        '',
                        7
                    ))
            }).catch(l => console.log(l))
    }
       /**
     * copier de la popup
     * @param {HTMLElement} container 
     */
       copyColor(container){
        const copi = container.querySelector('.icon')
        copi.onclick = ()=>{
            const colorRgb = container.querySelector('.rgb-complet').innerHTML
            navigator.clipboard.writeText(colorRgb)
            this.apicount(container,colorRgb)
            // const copieSucces = container.querySelector('.copier-succes')
            // copieSucces.style.animationName = 'copier-s'
            copi.style.backgroundColor = colorRgb
        }
    }
}
