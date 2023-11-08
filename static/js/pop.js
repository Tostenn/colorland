import {  } from "./fonction.js";
import { Color } from "./color.js";



/**
 * lorsqu'on click sur copy on affiche une pop  ok
 * il faut récuperer le nombre de pop
 * formater les color                           ok
 * fermer la pop
 * reduis les ancienne pop
 * nombre de pop visible esr de 3
 */
export class Popup{
    /**
     * ggestion des popup
     * @param {HTMLElement} parent 
     * @param {HTMLElement} copyButton 
     * @param {Color} color 
     */
    constructor(parent,copyButton,color){
        this.parent = parent
        this.copyButton = copyButton
        this.color = color

        // on récupére le templates
        this.template = this.parent.querySelector('template')
        
        // click sur le boutoon copier
        this.copyButton.onclick = () => this.newpop()
        
    }

    newpop(){
        
        // cloner le template
        const container =  document.createElement('div')
        container.append(this.template.content.cloneNode(true))

        // mise a jour de la color
        this.updateColor(container.querySelector('.pop-color'))
        
        // inseret le valeur
        this.writevalue(container.querySelectorAll('.rgb-content span'))

        // fermer la popup
        this.closePop(container)
        
        // inseret l'élément
        this.parent.insertBefore(container,this.parent.firstElementChild)
    }
    /**
     * 
     * @param {Array} rgbContent 
    */
    writevalue(rgbContent){
        let i = 0
        rgbContent = Array.from(rgbContent)
        for (const key in this.color.rgb) {
            const el = rgbContent.filter(
                el => el.getAttribute('class').includes(key)
            )
            if (el.length){
                el[0].innerHTML = this.color.rgb[key]
                key == 'op' ? el[0].style.opacity = this.color.rgb[key] : null
            }
        }
    }
    /**
     * 
     * @param {HTMLElement} container 
     */
    closePop(container){
        const fermer = container.querySelector('#fermer-pop')
        console.log(fermer);
        fermer.onclick = ()=>{
            container.style.transition = 'all linear .5s'
            container.style.transform = 'translate(100%)'
            container.style.opacity = '0'
            setTimeout(() =>container.remove(), 600);
        }
    }

    /**
     * 
     * @param {HTMLElement} viewColor 
     */
    updateColor(viewColor){
        viewColor.style.backgroundColor = this.color.formateRGB()
    }
}
